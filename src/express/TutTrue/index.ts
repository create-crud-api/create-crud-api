import { ProjectStrategy, Schema } from '../../interfaces';
import createTsconfig from './createTsConfig';
import createEsLintConfig from './createEsLintConfig';
import createPackageJson from './createPackageJson';
import createPrettierrcConfig from './createPrettierrcConfig';
import createPresentation from './presentation/createPresentation';
import createModels from './domain/repository/createRepository';
import createRepository from './domain/models/createModels';
import createApplication from './application/createApplication';
import createInfrastructure from './infrastructure/createInfrastructure';
import createDotEnv from './createDotEnv';
import createBasicStructure from './createBasicStructure';
import installAndLint from './installAndLint';

class ExpressTutTrueProject implements ProjectStrategy {
  async execute(projectName: string, orm: string, schema: Schema) {
    console.log(`Creating Express project with ${projectName} and ${orm}`);
    createBasicStructure(projectName);
    createDotEnv(projectName);
    createPackageJson(projectName);
    createEsLintConfig(projectName);
    createPrettierrcConfig(projectName);
    createTsconfig(projectName);
    createPresentation(projectName, orm, schema);
    createModels(projectName, schema);
    createRepository(projectName, schema);
    createApplication(projectName, schema);
    await createInfrastructure(projectName, orm, schema);
    installAndLint(projectName);
  }
}

export default ExpressTutTrueProject;
