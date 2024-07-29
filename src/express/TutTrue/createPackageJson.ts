import fs from 'fs-extra';
import path from 'path';

export default function createPackageJson(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    `{
  "name": "${projectName.toLowerCase()}",
  "version": "1.0.0",
  "description": "A basic starter for an express.js API with Typescript",
  "main": "src/index.ts",
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start:dist": "node dist/src/index.js",
    "lint": "eslint --fix src",
    "typecheck": "tsc --noEmit"
  },
  "keywords": [],
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.10",
    "@typescript-eslint/eslint-plugin": "^7.16.1",
    "@typescript-eslint/parser": "^7.16.1",
    "eslint": "^8.57.0",
    "eslint-config-airbnb-typescript": "^18.0.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-import": "^2.29.1",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.3"
  }
}
      `,
  );
}
