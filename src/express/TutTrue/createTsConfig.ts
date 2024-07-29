import fs from 'fs-extra';
import path from 'path';

export default function createTsConfig(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, 'tsconfig.json'),
    `{
  "compilerOptions": {
    "outDir": "dist",
    "sourceMap": true,
    "target": "esnext",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "./*.js",
    "src/**/*.ts",
    "test/**/*.ts",
  ],
}

    `,
  );
}
