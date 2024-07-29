import fs from 'fs-extra';
import path from 'path';
import { capitalizeFirstLetter } from '../../../utils';
import { Schema } from '../../../interfaces';

function createRouter(projectDir: string, orm: string, schema: Schema): void {
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(projectDir, `/src/presentation/api/${k}/index.ts`),
      `import express from 'express';
import ${key}Controller from './${k}Controller';
import ${key}Usecase from '../../../application/${key}Usecase';
import ${key}Repository from '../../../infrastructure/${orm}/${orm}Repositories/${capitalizeFirstLetter(
  orm,
)}${key}Repository';

const router = express.Router();
const ${k}Repository = new ${key}Repository();
const ${k}Usecase = new ${key}Usecase(${k}Repository);
const ${k}Controller = new ${key}Controller(${k}Usecase); 

router.get('/', ${k}Controller.get${key}s);
router.post('/', ${k}Controller.create${key});
router.get('/:id', ${k}Controller.get${key}ById);
router.put('/:id', ${k}Controller.update${key});
router.delete('/:id', ${k}Controller.delete${key});

export default router;
`,
    );
  });
}

function createController(projectDir: string, schema: Schema): void {
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(projectDir, `/src/presentation/api/${k}/${k}Controller.ts`),
      `import { NextFunction, Request, Response } from 'express';
import ${key}UseCase from '../../../application/${key}Usecase';

class ${key}Controller {
  constructor(private readonly ${k}UseCase: ${key}UseCase) {}

  create${key} = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ${k} = req.body;
      const new${key} = await this.${k}UseCase.create${key}(${k});
      res.status(201).json(new${key});
    } catch (error: any) {
      next(error);
    }
  };

  get${key}ById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ${k} = await this.${k}UseCase.get${key}ById(id);
      res.status(200).json(${k});
    } catch (error: any) {
      next(error);
    }
  };

  update${key} = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ${k} = req.body;
      const updated${key} = await this.${k}UseCase.update${key}(
        id,
        ${k},
      );
      res.status(200).json(updated${key});
    } catch (error: any) {
      next(error);
    }
  };

  delete${key} = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.${k}UseCase.delete${key}(id);
      res.status(204).json();
    } catch (error: any) {
      next(error);
    }
  };

  get${key}s = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ${k}s = await this.${k}UseCase.get${key}s();
      res.status(200).json(${k}s);
    } catch (error: any) {
      next(error);
    }
  };
}
export default ${key}Controller;

`,
    );
  });
}

function createIndex(projectDir: string, schema: Schema): void {
  const schemaKeys = Object.keys(schema);
  const schemaImports = schemaKeys
    .map((key) => {
      const k = key.toLowerCase();
      return `import ${k} from './${k}';`;
    })
    .join('\n');

  const schemaRouters = schemaKeys
    .map((key) => {
      const k = key.toLowerCase();
      return `apiRouter.use('/${k}', ${k});`;
    })
    .join('\n  ');

  fs.writeFileSync(
    path.join(projectDir, '/src/presentation/api/index.ts'),
    `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

${schemaImports}

function main() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    return res.json({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  });

  const apiRouter = express.Router();

  ${schemaRouters}

  app.use('/api/v1', apiRouter);

  // @ts-ignore
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  app.use((err, req, res, _next) => {
    res.status(err.status).json({ message: err.message });
  });

  app.listen(port, () => {
    console.log(\`Listening: http://localhost:\${port}\`);
  });
}

export default main;

`,
  );
}

export default function createPresentation(
  projectName: string,
  orm: string,
  schema: Schema,
): void {
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    fs.mkdirSync(
      path.join(projectDir, `/src/presentation/api/${key.toLowerCase()}`),
    );
  });
  createRouter(projectDir, orm, schema);
  createController(projectDir, schema);
  createIndex(projectDir, schema);
}
