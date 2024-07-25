import fs from 'fs-extra';
import path from 'path';

export default function createApplication(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '/src/application/ProductUsecase.ts'),
    `import IProduct from '../domain/model/IProduct';
import ProductRepository from '../domain/repository/productRepository';

class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: IProduct): Promise<IProduct> {
    const newProduct = await this.productRepository.create(product);

    return newProduct;
  }

  async getProductById(productId: string): Promise<IProduct> {
    const product = await this.productRepository.get(productId);
    return product;
  }

  async updateProduct(productId: string, product: IProduct): Promise<IProduct> {
    const updatedProduct = await this.productRepository.update(productId, product);

    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<void> {
    return this.productRepository.delete(productId);
  }

  async getProducts(): Promise<IProduct[]> {
    return this.productRepository.list();
  }
}

export default ProductUseCase;
`,
  );
}



