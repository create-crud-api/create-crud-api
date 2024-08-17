import fs from 'fs-extra';
import path from 'path';
import { Schema } from '../../interfaces';

export default function createApplication(
  projectName: string,
  schema: Schema,
): void {
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(projectDir, `/src/controllers/${k}Controller.ts`),
      `import { NextFunction, Request, Response } from 'express';
import prisma from '../db/PrismaClient';
import APIError from '../errors/APIError';

const get${key}s = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ${k}s = await prisma.${k}.findMany({});
    return res.json(${k}s);
  } catch (error) {
    next(error);
  }
};

const get${key} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ${k} = await prisma.${k}.findUnique({ where: { id: id } });

    if (!${k}) throw new APIError('${key} not found', 404);

    return res.json(${k});
  } catch (error) {
    next(error);
  }
};

const create${key} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const ${k} = await prisma.${k}.create({ data });

    if (!${k}) throw new APIError('${key} not created', 500);

    return res.status(201).json(${k});
  } catch (error) {
    next(error);
  }
};

const update${key} = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const ${k} = await prisma.${k}.findUnique({ where: { id } });

    if (!${k}) throw new APIError('${key} not found', 404);

    const updated${key} = await prisma.${k}.update({
      where: { id: id },
      data,
    });

    if (!updated${key}) {
      return res.status(404).json({ message: '${key} not found' });
    }

    return res.json(updated${key});
  } catch (error) {
    next(error);
  }
};

const delete${key} = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const ${k} = await prisma.${k}.findUnique({ where: { id } });
    if (!${k}) throw new APIError('${key} not found', 404);
    await prisma.${k}.delete({ where: { id: id } });
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export default {
  get${key}s,
  get${key},
  create${key},
  update${key},
  delete${key},
};
`,
    );
  });
}
