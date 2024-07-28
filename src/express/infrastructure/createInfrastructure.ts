import createPrisma from './prisma';
import createMongoose from './mongoose';
import { Schema } from '../../interfaces';

export default async function createInfrastructure(
  projectName: string,
  orm: string,
  schema: Schema,
): Promise<void> {
  switch (orm) {
    case 'prisma':
      await createPrisma(projectName, schema);
      break;
    case 'mongoose':
      await createMongoose(projectName, schema);
      break;
    default:
      console.log('Invalid ORM');
  }
}
