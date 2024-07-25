import ExpressProject from '../express';
import HonoProject from '../hono';
import { ProjectStrategy } from '../interfaces';

class ProjectFactory {
  static createProject(type: string): ProjectStrategy {
    switch (type) {
      case 'express':
        return new ExpressProject();
      case 'hono':
        return new HonoProject();
      default:
        throw new Error('Unknown project type');
    }
  }
}
function createProject(
  projectName: string,
  framework: string,
  orm: string,
): void {
  const project = ProjectFactory.createProject(framework);
  project.execute(projectName, orm);
}

export default createProject;
