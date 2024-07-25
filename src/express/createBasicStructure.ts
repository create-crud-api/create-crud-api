import fs from 'fs-extra';
import path from 'path';

export default function createBasicStructure(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectDir);

  // Create basic structure
  fs.mkdirSync(path.join(projectDir, 'src'));
  fs.mkdirSync(path.join(projectDir, '/src/application'));
  fs.mkdirSync(path.join(projectDir, '/src/infrastructure'));
  fs.mkdirSync(path.join(projectDir, '/src/presentation'));
  fs.mkdirSync(path.join(projectDir, '/src/presentation/api'));
  fs.mkdirSync(path.join(projectDir, '/src/domain'));
  fs.mkdirSync(path.join(projectDir, '/src/domain/model'));
  fs.mkdirSync(path.join(projectDir, '/src/domain/repository'));
  fs.writeFileSync(
    path.join(projectDir, 'src', 'index.ts'),
    `import main from './presentation/api';

main();

    `,
  );
}
