import fs from 'fs-extra';
import path from 'path';
import { spawn } from 'child_process';
import { Schema } from '../../../../interfaces';

function createMongooseModels(projectName: string, schema: Schema): void {
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);

  schemaKeys.forEach((key) => {
    function constrains(feild: string) {
      if (feild === 'id')
        return `{
    type: ${schema[key][feild] === 'int' ? 'Number' : 'String'},
    required: true,
    unique: true,
    IDBIndex: true,
    ${schema[key][feild] === 'string' ? 'trim: true,' : ''}
  }`;
      if (schema[key][feild] === 'string')
        return `{
  type: String,
  required: true,
  trim: true,
  }`;
      if (schema[key][feild] === 'int')
        return `{
    type: Number,
    required: true,
  }`;
      return '';
    }
    const k = key.toLowerCase();
    const fields = Object.keys(schema[key]);
    let model = '';
    model += fields.map((field) => {
      console.log(model);
      return `${field}: ${constrains(field)}\n`;
    });
    fs.writeFileSync(
      path.join(projectDir, `/src/infrastructure/mongoose/models/${k}.ts`),
      `import mongoose, { Document } from 'mongoose';
import I${key} from '../../../domain/model/I${key}';
import { BaseSchema } from '../BaseSchema';

const ${k} = new BaseSchema({
  ${model}
});

export const ${key} = mongoose.model<I${key} & Document>('${key}', ${k});
`,
    );
  });
}

function createMongooseRepository(projectName: string, schema: Schema): void {
  const projectDir = path.join(process.cwd(), projectName);
  const schemaKeys = Object.keys(schema);
  schemaKeys.forEach((key) => {
    const k = key.toLowerCase();
    fs.writeFileSync(
      path.join(
        projectDir,
        `/src/infrastructure/mongoose/mongooseRepositories/Mongoose${key}Repository.ts`,
      ),
      `import I${key}Repository from '../../../domain/repository/${k}Repository';
import I${key} from '../../../domain/model/I${key}';
import { ${key} } from '../models/${k}';
import connect from '../connection';

class Mongoose${key}Repository implements I${key}Repository {

  constructor() {
    connect(); 
  }

  async create(data: any): Promise<I${key}> {
    const ${k} = await ${key}.create(data);
    return ${k};
  }

  async get(id: string): Promise<I${key} | null> {
    const ${k} = await ${key}.findOne({ id });
    return ${k};
  }

  async update(id: string, data: any): Promise<I${key} | null> {
    const ${k} = await ${key}.findOneAndUpdate({ id }, data, { new: true });
    return ${k};
  }

  async delete(id: string): Promise<I${key} | null> {
    const ${k} = await ${key}.findOneAndDelete({ id });
    return ${k};
  }

  async list(): Promise<I${key}[]> {
    const ${k}s = await ${key}.find();
    return ${k}s;
  }
}

export default Mongoose${key}Repository;
`,
    );
  });
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
  return new Promise((resolve, reject) => {
    const p = spawn('sh', ['-c', `cd ${projectName} && npm i mongoose`], {
      stdio: 'inherit',
    });

    p.on('data', (data) => {
      console.log(data.toString());
    });

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve('done');
    });

    p.on('error', (err) => {
      console.log(err);
      reject(err);
    });
  });
}

export default async function createMongoose(
  projectName: string,
  schema: Schema,
): Promise<void> {
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
  createMongooseModels(projectName, schema);
  createMongooseRepository(projectName, schema);
  await installMongoose(projectName);
}
