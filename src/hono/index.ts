import { ProjectStrategy, Schema } from '../interfaces';
import HonoSarahProject from './Sarah';

function expressFactory(structure: string) {
  switch (structure) {
    case 'sarah':
      return new HonoSarahProject();
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
