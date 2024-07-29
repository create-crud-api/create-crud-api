import { ProjectStrategy, Schema } from '../interfaces';
import ExpressTutTrueProject from './TutTrue';
import ExpressEmadProject from './Emad';

function expressFactory(structure: string) {
  switch (structure) {
    case 'tuttrue':
      return new ExpressTutTrueProject();
    case 'emad':
      return new ExpressEmadProject();
    default:
      throw new Error('Unknown project structure');
  }
}

class ExpressProject implements ProjectStrategy {
  constructor(private structure: string) {}

  async execute(projectName: string, orm: string, schema: Schema) {
    console.log(
      `Creating Express project with ${projectName} and ${orm}, schema: ${schema}`,
    );
    expressFactory(this.structure).execute(projectName, orm, schema);
  }
}

export default ExpressProject;
