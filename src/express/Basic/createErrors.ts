import fs from 'fs-extra';
import path from 'path';

export default function createErrors(projectName: string) {
  const projectDir = path.join(process.cwd(), projectName);

  fs.writeFileSync(
    path.join(projectDir, '/src/errors/APIError.ts'),
    `class APIError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export default APIError;
`,
  );
}
