import { ProjectStrategy, Schema } from '../../interfaces';

class HonoTempProject implements ProjectStrategy {
  execute(projectName: string, orm: string, schema: Schema): void {
    console.log(
      `Creating Hono project with ${projectName} and ${orm}, schema: ${schema}`,
    );
    throw new Error('Method not implemented.');
  }
}

export default HonoTempProject;
