import createPrismaRepository from './createPrisma';
import runPrismaScripts from './runPrismaScripts';

export default function createPrisma(projectName: string): void {
  createPrismaRepository(projectName);
  runPrismaScripts(projectName);
}
