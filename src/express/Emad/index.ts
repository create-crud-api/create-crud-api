import { ProjectStrategy, Schema } from '../../interfaces';

class ExpressEmadProject implements ProjectStrategy {
  async execute(projectName: string, orm: string, schema: Schema) {
    console.log(
      `Creating Express project with ${projectName}, with schema ${schema} and orm ${orm}`,
    );

    throw new Error('Emad project not implemented');
  }
}

export default ExpressEmadProject;
