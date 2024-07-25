import fs from 'fs-extra';
import path from 'path';

function createRouter(projectDir: string): void {
  fs.writeFileSync(
    path.join(projectDir, '/src/presentation/api/product/index.ts'),
    `import express from 'express';
    import ProductController from './productController';
    import ProductUsecase from '../../../application/ProductUsecase';
    import ProductRepository from '../../../infrastructure/prisma/PrismaProductRepository';
    
    const router = express.Router();
    const productRepository = new ProductRepository();
    const productUsecase = new ProductUsecase(productRepository);
    const productController = new ProductController(productUsecase); 
    
    router.get('/product', productController.getProducts);
    router.post('/product', productController.createProduct);
    router.get('/product/:id', productController.getProductById);
    router.put('/product/:id', productController.updateProduct);
    router.delete('/product/:id', productController.deleteProduct);
    
    export default router;
`,
  );
}

function createController(projectDir: string): void {
  fs.writeFileSync(
    path.join(projectDir, '/src/presentation/api/product/productController.ts'),
    `import { NextFunction, Request, Response } from 'express';
import PorductUseCase from '../../../application/ProductUsecase';

class ProductController {
  constructor(private readonly porductUseCase: PorductUseCase) {}

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = req.body;
      const newProduct = await this.porductUseCase.createProduct(product);
      res.status(201).json(newProduct);
    } catch (error: any) {
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.porductUseCase.getProductById(id);
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = req.body;
      const updatedProduct = await this.porductUseCase.updateProduct(
        id,
        product,
      );
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.porductUseCase.deleteProduct(id);
      res.status(204).json();
    } catch (error: any) {
      next(error);
    }
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.porductUseCase.getProducts();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  };
}
export default ProductController;

`,
  );
}

function createIndex(projectDir: string): void {
  fs.writeFileSync(
    path.join(projectDir, '/src/presentation/api/index.ts'),
    `import express from 'express';
import cors from 'cors';

import api from './product';

require('dotenv').config();

function main() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    return res.json({
      message: 'Hello World',
    });
  });

  // middle ware to catch all thrown errors
  app.use('/api/v1', api);
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  app.use((err, req, res, _next) => {
    // console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
  });

  app.listen(port, () => {
    console.log(\`Listening: http://localhost:\${port}\`);
  });
}

export default main;

`,
  );
}

export default function createPresentation(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.mkdirSync(path.join(projectDir, '/src/presentation/api/product'));
  createRouter(projectDir);
  createController(projectDir);
  createIndex(projectDir);
}
