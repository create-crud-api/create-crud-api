import fs from 'fs-extra';
import path from 'path';

export default function createModels(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '/src/domain/repository/productRepository.ts'),
    `interface IProductRepository {
  create(data: any): Promise<any>;
  get(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  list(): Promise<any>;
}

export default IProductRepository;
`,
  );
}
