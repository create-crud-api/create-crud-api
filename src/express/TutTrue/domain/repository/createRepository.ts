import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../../../interfaces';

export default function createModels(
  projectName: string,
  schema: Schema,
): void {
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(projectDir, `/src/domain/repository/${k}Repository.ts`),
      `interface I${key}Repository {
  create(data: any): Promise<any>;
  get(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  list(): Promise<any>;
}

export default I${key}Repository;
`,
    );
  });
}
