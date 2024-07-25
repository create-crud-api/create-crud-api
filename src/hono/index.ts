import { ProjectStrategy } from '../interfaces';

class HonoProject implements ProjectStrategy {
  execute(projectName: string, orm: string): void {
    console.log(`Creating Hono project with ${projectName} and ${orm}`);
    throw new Error('Method not implemented.');
  }
}

export default HonoProject;
