import createPrisma from './prisma';
import createMongoose from './mongoose';

export default function createInfrastructure(
  projectName: string,
  orm: string,
): void {
  switch (orm) {
    case 'prisma':
      createPrisma(projectName);
      break;
    case 'mongoose':
      createMongoose(projectName);
      break;
    default:
      console.log('Invalid ORM');
  }
}
