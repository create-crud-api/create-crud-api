export interface ProjectStrategy {
  execute: (projectName: string, orm: string) => void;
}
export interface ProjectFactory {
  createProject: (framework: string) => ProjectStrategy;
}
