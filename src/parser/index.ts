import fs from 'fs';

export default function parseSchema(schemaPath: string) {
  return null;
  const schema: { [key: string]: any } = {};
  let curModel: string | null = null;
  fs.readFileSync(schemaPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      if (line === '' || line.startsWith('//')) return;
      if (line.includes('model')) {
        curModel = line.replace('{', '').split(' ')[1];
        schema[curModel.toUpperCase()] = {};
        return;
      }
      if (line.includes('}')) {
        curModel = null;
        return;
      }
      if (curModel === null) throw new Error('Invalid schema');
      const [key, value] = line.trim().split(':');
      schema[curModel][key.trim()] = value.trim();
    });

  return schema;
}
