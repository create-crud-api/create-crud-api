import ExpressProject from '../express';
import HonoProject from '../hono';
import { ProjectStrategy, Schema } from '../interfaces';

class ProjectFactory {
  static createProject(type: string, structure: string): ProjectStrategy {
    switch (type) {
      case 'express':
        return new ExpressProject(structure);
      case 'hono':
        return new HonoProject(structure);
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
  structure: string,
): Promise<void> {
  const project = ProjectFactory.createProject(framework, structure);
  project.execute(projectName, orm, schema);
}

export default createProject;
