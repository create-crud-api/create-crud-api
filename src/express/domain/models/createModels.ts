import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../../interfaces';

export default function createRepository(
  projectName: string,
  schema: Schema,
): void {
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const mapTypes: { [key: string]: string } = { string: 'string', int: 'number' };
    const fields = Object.keys(schema[key])
      .map((field) => {
        return `${field}: ${mapTypes[schema[key][field]]};`;
      })
      .join('\n  ');

    fs.writeFileSync(
      path.join(projectDir, `/src/domain/model/I${key}.ts`),
      `interface I${key} {
  ${fields}
}

export default I${key};

`,
    );
  });
}
