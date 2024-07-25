import fs from 'fs-extra';
import path from 'path';

export default function createRepository(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.mkdirSync(path.join(projectDir, '/src/infrastructure/prisma'));
  fs.writeFileSync(
    path.join(projectDir, '/src/infrastructure/prisma/schema.prisma'),
    `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}


model Product {
  id          String    @id
  name        String
  price       Float
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

`,
  );
  fs.writeFileSync(
    path.join(projectDir, '/src/infrastructure/prisma/PrismaClient.ts'),
    `import { PrismaClient } from '@prisma/client';

export default new PrismaClient();
`,
  );

  fs.writeFileSync(
    path.join(
      projectDir,
      '/src/infrastructure/prisma/PrismaProductRepository.ts',
    ),
    `import IProductRepository from '../../domain/repository/productRepository';
import IProduct from '../../domain/model/IProduct';
import prisma from '../prisma/PrismaClient';

class PrismaProductRepository implements IProductRepository {
  async create(data: any): Promise<any> {
    const product = await prisma.product.create({ data });
    return product;
  }

  async get(id: string): Promise<IProduct | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  }

  async update(id: string, data: any): Promise<IProduct> {
    const product = await prisma.product.update({ where: { id }, data });
    return product;
  }

  async delete(id: string): Promise<IProduct> {
    const product = await prisma.product.delete({ where: { id } });
    return product;
  }

  async list(): Promise<IProduct[]> {
    const product = await prisma.product.findMany();
    return product;
  }
}

export default PrismaProductRepository;
`,
  );
}
