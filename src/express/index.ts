import { ProjectStrategy } from '../interfaces';
import createTsconfig from './createTsConfig';
import createEsLintConfig from './createEsLintConfig';
import createPackageJson from './createPackageJson';
import createPrettierrcConfig from './createPrettierrcConfig';
import createPresentation from './presentation/createPresentation';
import createModels from './domain/repository/createRepository';
import createRepository from './domain/models/createModels';
import createApplication from './application/createApplication';
import createInfrastructure from './infrastructure/createinfrastructure';
import createDotEnv from './createDotEnv';
import createBasicStructure from './createBasicStructure';
import runPrismaScripts from './infrastructure/runPrismaScripts';

class ExpressProject implements ProjectStrategy {
  execute(projectName: string, orm: string) {
    console.log(`Creating Express project with ${projectName} and ${orm}`);
    createBasicStructure(projectName);
    createDotEnv(projectName);
    createPackageJson(projectName);
    createEsLintConfig(projectName);
    createPrettierrcConfig(projectName);
    createTsconfig(projectName);
    createPresentation(projectName);
    createModels(projectName);
    createRepository(projectName);
    createApplication(projectName);
    createInfrastructure(projectName);
    runPrismaScripts(projectName);
  }
}

export default ExpressProject;
