import fs from 'fs-extra';
import path from 'path';
import { spawn } from 'child_process';


function createMongooseModels(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '/src/infrastructure/mongoose/models/product.ts'),
    `import mongoose, { Document } from 'mongoose';
import IProduct from '../../../domain/model/IProduct';
import { BaseSchema } from '../BaseSchema';

const product = new BaseSchema({
  id: {
    type: String,
    required: true,
    unique: true,
    IDBIndex: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.model<IProduct & Document>('Product', product);
`,
  );
}

function createMongooseRepository(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(
      projectDir,
      '/src/infrastructure/mongoose/mongooseRepositories/MongooseProductRepository.ts',
    ),
    `import IProductRepository from '../../../domain/repository/productRepository';
import IProduct from '../../../domain/model/IProduct';
import { Product } from '../models/product';
import connect from '../connection';

class MongooseProductRepository implements IProductRepository {

  constructor() {
    connect(); 
  }

  async create(data: any): Promise<IProduct> {
    const product = await Product.create(data);
    return product;
  }

  async get(id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ id });
    return product;
  }

  async update(id: string, data: any): Promise<IProduct | null> {
    const product = await Product.findOneAndUpdate({ id }, data, { new: true });
    return product;
  }

  async delete(id: string): Promise<IProduct | null> {
    const product = await Product.findOneAndDelete({ id });
    return product;
  }

  async list(): Promise<IProduct[]> {
    const products = await Product.find();
    return products;
  }
}

export default MongooseProductRepository;
`,
  );
}

function createConnection(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '/src/infrastructure/mongoose/connection.ts'),
    `import mongoose from 'mongoose';

function connect() {
  
  mongoose.connect(process.env.MongoDB_URL || 'mongodb://localhost:27017/test');
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    },
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
  });
}

export default connect;
`,
  );
}

function createBaseSchema(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '/src/infrastructure/mongoose/BaseSchema.ts'),
    `import { Schema } from 'mongoose';

export class BaseSchema extends Schema {
  constructor(sche: any) {
    super(sche);
    this.set('toJSON', {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
      },
    });
  }
}
`,
  );
}


function installMongoose(projectName: string) {
  const p = spawn(
    'sh',
    [
      '-c',
      `cd ${projectName} && npm i && npm i mongoose`,
    ],
    { stdio: 'inherit' },
  );

  p.on('data', (data) => {
    console.log(data.toString());
  });

  p.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}


export default function createMongoose(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);

  fs.mkdirSync(
    path.join(projectDir, '/src/infrastructure/mongoose/mongooseRepositories'),
    { recursive: true },
  );
  fs.mkdirSync(path.join(projectDir, '/src/infrastructure/mongoose/models'), {
    recursive: true,
  });
  createBaseSchema(projectName);
  createConnection(projectName);
  createMongooseModels(projectName);
  createMongooseRepository(projectName);
  installMongoose(projectName);
}
