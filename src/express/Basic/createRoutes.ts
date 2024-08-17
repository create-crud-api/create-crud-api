import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../interfaces';

function createRouterIndex(projectDir: string, schema: Schema): void {
  const schemaKeys = Object.keys(schema);

  const schemaImports = schemaKeys
    .map((key) => {
      const k = key.toLowerCase();
      return `import ${k} from './${k}Router';`;
    })
    .join('\n');

  const schemaRouters = schemaKeys
    .map((key) => {
      const k = key.toLowerCase();
      return `router.use('/${k}s', ${k});`;
    })
    .join('\n  ');

  fs.writeFileSync(
    path.join(projectDir, '/src/routes/index.ts'),
    `import express from 'express';
${schemaImports}
  
const router = express.Router();
    
${schemaRouters}

export default router;
    `,
  );
}

export default function createRouters(
  projectDir: string,
  schema: Schema,
): void {
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(projectDir, `/src/routes/${k}Router.ts`),
      `import express from 'express';
import ${k}Controller from '../controllers/${k}Controller';

const router = express.Router();

router.get('/', ${k}Controller.get${key}s);
router.post('/', ${k}Controller.create${key});
router.get('/:id', ${k}Controller.get${key});
router.put('/:id', ${k}Controller.update${key});
router.delete('/:id', ${k}Controller.delete${key});

export default router;
`,
    );
  });

  createRouterIndex(projectDir, schema);
}
