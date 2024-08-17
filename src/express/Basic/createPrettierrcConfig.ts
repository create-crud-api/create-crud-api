import fs from 'fs-extra';
import path from 'path';

export default function createPrettierrcConfig(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '.prettierrc'),
    `{
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all"
}
    `,
  );
}
