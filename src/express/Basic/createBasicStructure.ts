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
  fs.mkdirSync(path.join(projectDir, '/src/controllers'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, '/src/db'));
  fs.mkdirSync(path.join(projectDir, '/src/errors'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, '/src/middlewares'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, '/src/routes'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, '/prisma'), { recursive: true });
  fs.writeFileSync(
    path.join(projectDir, 'src', 'index.ts'),
    `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';
import error from './middlewares/error';


const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', router);

app.use(error);

app.listen(port, () => {
  console.log(\`Listening: http://localhost:\${port}\`);
});

    `,
  );
}
