import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../../interfaces';

function createAPIErrors(projectName: string) {
  const projectDir = path.join(process.cwd(), projectName);

  fs.writeFileSync(
    path.join(projectDir, '/src/application/Errors/APIError.ts'),
    `class APIError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export default APIError;
`,
  );
}

export default function createApplication(
  projectName: string,
  schema: Schema,
): void {
  createAPIErrors(projectName);
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(projectDir, `/src/application/${key}Usecase.ts`),
      `import I${key} from '../domain/model/I${key}';
import ${key}Repository from '../domain/repository/${k}Repository';
import APIError from './Errors/APIError';

class ${key}UseCase {
  constructor(private readonly ${k}Repository: ${key}Repository) {}

  async create${key}(${k}: I${key}): Promise<I${key}> {
    const ${k}Exists = await this.${k}Repository.get(${k}.id);

    if (${k}Exists) throw new APIError('${key} already exists', 400);
    if (!${k}.id) throw new APIError('${key} id is required', 400);
    
    const new${key} = await this.${k}Repository.create(${k});
    if (!new${key}) throw new APIError('${key} not created', 500);

    return new${key};
  }

  async get${key}ById(${k}Id: string): Promise<I${key}> {
    const ${k} = await this.${k}Repository.get(${k}Id);
    if (!${k}) throw new APIError('${key} not found', 404);
    return ${k};
  }

  async update${key}(${k}Id: string, ${k}: I${key}): Promise<I${key}> {
    const ${k}Exists = await this.${k}Repository.get(${k}Id);
    if (!${k}Exists) throw new APIError('${key} not found', 404);
    const updated${key} = await this.${k}Repository.update(${k}Id, ${k});
    if (!updated${key}) throw new APIError('${key} not updated', 500);

    return updated${key};
  }

  async delete${key}(${k}Id: string): Promise<void> {
    const ${k}Exists = await this.${k}Repository.get(${k}Id);
    if (!${k}Exists) throw new APIError('${key} not found', 404);
    return this.${k}Repository.delete(${k}Id);
  }

  async get${key}s(): Promise<I${key}[]> {
    return this.${k}Repository.list();
  }
}

export default ${key}UseCase;
`,
    );
  });
}
