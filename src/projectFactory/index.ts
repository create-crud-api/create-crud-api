import ExpressProject from '../express';
import HonoProject from '../hono';
import { ProjectStrategy, Schema } from '../interfaces';

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
async function createProject(
  projectName: string,
  framework: string,
  orm: string,
  schema: Schema,
): Promise<void> {
  const project = ProjectFactory.createProject(framework);
  project.execute(projectName, orm, schema);
}

export default createProject;
