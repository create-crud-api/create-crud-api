import fs from 'fs-extra';
import path from 'path';

export default function createDotEnv(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '.env'),
    `DATABASE_URL="file:./dev.db"
PORT=3000
`,
  );
}
