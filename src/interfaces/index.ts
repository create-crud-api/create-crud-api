export interface ProjectStrategy {
  execute: (projectName: string, orm: string, schema: Schema) => void;
}
export interface ProjectFactory {
  createProject: (framework: string) => ProjectStrategy;
}

export interface Schema {
  [key: string]: Record<string, string>;
}
