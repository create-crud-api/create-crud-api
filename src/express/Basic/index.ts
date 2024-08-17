import { ProjectStrategy, Schema } from '../../interfaces';
import createTsconfig from './createTsConfig';
import createEsLintConfig from './createEsLintConfig';
import createPackageJson from './createPackageJson';
import createPrettierrcConfig from './createPrettierrcConfig';
import createDotEnv from './createDotEnv';
import createBasicStructure from './createBasicStructure';
import installAndLint from './installAndLint';
import createControllers from './createControllers';
import createPrisma from './createPrisma';
import createErrors from './createErrors';
import createRouters from './createRoutes';
import createMiddlewares from './createMiddlewares';

class ExpressBasicProject implements ProjectStrategy {
  async execute(projectName: string, orm: string, schema: Schema) {
    createBasicStructure(projectName);
    createDotEnv(projectName);
    createPackageJson(projectName);
    createEsLintConfig(projectName);
    createPrettierrcConfig(projectName);
    createTsconfig(projectName);
    createControllers(projectName, schema);
    createErrors(projectName);
    createMiddlewares(projectName);
    createRouters(projectName, schema);
    await createPrisma(projectName, schema);
    installAndLint(projectName);
  }
}

export default ExpressBasicProject;
