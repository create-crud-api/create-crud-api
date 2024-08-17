import fs from 'fs-extra';
import path from 'path';

export default function createMiddlewares(projectName: string) {
  const projectDir = path.join(process.cwd(), projectName);

  fs.writeFileSync(
    path.join(projectDir, '/src/middlewares/error.ts'),
    `import { Request, Response, NextFunction } from 'express';

export default (err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message });
  _next();
};
`,
  );
}
