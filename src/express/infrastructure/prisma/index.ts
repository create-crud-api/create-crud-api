import { Schema } from '../../../interfaces';
import createPrismaRepository from './createPrisma';
import runPrismaScripts from './runPrismaScripts';

export default async function createPrisma(projectName: string, schema: Schema): Promise<void> {
  createPrismaRepository(projectName, schema);
  await runPrismaScripts(projectName);
}
