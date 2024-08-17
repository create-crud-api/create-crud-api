import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../interfaces';


function runPrismaScripts(projectName: string) {
  return new Promise((resolve, reject) => {
    const p = spawn(
      'sh',
      [
        '-c',
        `cd ${projectName} && npm i prisma --save-dev && npx prisma format && npx prisma generate && npx prisma db push`,
      ],
      { stdio: 'inherit' },
    );

    p.on('data', (data) => {
      console.log(data.toString());
    });

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve('done');
    });

    p.on('error', (err) => {
      console.log(err);
      reject(err);
    });
  });
}


function constrains(feild: string) {
  if (feild === 'id') return '@id';
  return '';
}
export default async function createPrisma(
  projectName: string,
  schema: Schema,
): Promise<void> {
  const projectDir = path.join(process.cwd(), projectName);
  const typeMaper: { [key: string]: string } = { string: 'String', int: 'Int' };
  const schemaKeys = Object.keys(schema);
  const models = schemaKeys
    .map((key) => {
      let model = `model ${key} {\n`;
      model += Object.keys(schema[key])
        .map((feild) => {
          return `${feild} ${typeMaper[schema[key][feild]]} ${constrains(
            feild,
          )}`;
        })
        .join('\n  ');
      model += '\n}';
      return model;
    })
    .join('\n  ');
  fs.writeFileSync(
    path.join(projectDir, '/prisma/schema.prisma'),
    `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}


${models}
`,
  );
  fs.writeFileSync(
    path.join(projectDir, '/src/db/PrismaClient.ts'),
    `import { PrismaClient } from '@prisma/client';

export default new PrismaClient();
`,
  );

  await runPrismaScripts(projectName);

}

