import { ProjectStrategy, Schema } from '../interfaces';
import HonoTempProject from './Temp';

function expressFactory(structure: string) {
  switch (structure) {
    case 'temp':
      return new HonoTempProject();
    default:
      throw new Error('Unknown project structure');
  }
}

class HonoProject implements ProjectStrategy {
  constructor(private structure: string) {}

  async execute(projectName: string, orm: string, schema: Schema) {
    console.log(
      `Creating Express project with ${projectName} and ${orm}, schema: ${schema}`,
    );
    expressFactory(this.structure).execute(projectName, orm, schema);
  }
}

export default HonoProject;
