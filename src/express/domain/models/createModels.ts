import fs from 'fs-extra';
import path from 'path';

export default function createRepository(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '/src/domain/model/IProduct.ts'),
    `interface IProduct {
  id: string;
  name: string;
  price: number;
}

export default IProduct;

`,
  );
}
