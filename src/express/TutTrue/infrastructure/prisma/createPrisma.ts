import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../../../interfaces';

function constrains(feild: string) {
  if (feild === 'id') return '@id';
  return '';
}
export default function createPrismaRepository(
  projectName: string,
  schema: Schema,
): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.mkdirSync(
    path.join(projectDir, '/src/infrastructure/prisma/prismaRepositories'),
    { recursive: true },
  );
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
    path.join(projectDir, '/src/infrastructure/prisma/schema.prisma'),
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
    path.join(projectDir, '/src/infrastructure/prisma/PrismaClient.ts'),
    `import { PrismaClient } from '@prisma/client';

export default new PrismaClient();
`,
  );

  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(
        projectDir,
        `/src/infrastructure/prisma/prismaRepositories/Prisma${key}Repository.ts`,
      ),
      `import I${key}Repository from '../../../domain/repository/${k}Repository';
import I${key} from '../../../domain/model/I${key}';
import prisma from '../../prisma/PrismaClient';

class Prisma${key}Repository implements I${key}Repository {
  async create(data: any): Promise<any> {
    const ${k} = await prisma.${k}.create({ data });
    return ${k};
  }

  async get(id: string): Promise<I${key} | null> {
    const ${k} = await prisma.${k}.findUnique({ where: { id } });
    return ${k};
  }

  async update(id: string, data: any): Promise<I${key}> {
    const ${k} = await prisma.${k}.update({ where: { id }, data });
    return ${k};
  }

  async delete(id: string): Promise<I${key}> {
    const ${k} = await prisma.${k}.delete({ where: { id } });
    return ${k};
  }

  async list(): Promise<I${key}[]> {
    const ${k} = await prisma.${k}.findMany();
    return ${k};
  }
}

export default Prisma${key}Repository;

`,
    );
  });
}
