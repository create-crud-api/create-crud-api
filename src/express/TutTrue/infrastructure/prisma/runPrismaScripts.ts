import { spawn } from 'child_process';

export default function runPrismaScripts(projectName: string) {
  return new Promise((resolve, reject) => {
    const p = spawn(
      'sh',
      [
        '-c',
        `cd ${projectName} && npm i prisma --save-dev && npx prisma format --schema=./src/infrastructure/prisma/schema.prisma && npx prisma generate --schema=./src/infrastructure/prisma/schema.prisma && npx prisma db push --schema=./src/infrastructure/prisma/schema.prisma`,
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
