#!/usr/bin/env node

import cliQuestions from './cli';
import parseSchema from './parser';
import createProject from './projectFactory';

async function main() {
  const { projectName, framework, orm, structure, schemaPath } = await cliQuestions();
  const schema = parseSchema(schemaPath) || {
    Product: { id: 'string', name: 'string', price: 'int' },
  };

  await createProject(projectName, framework, orm, schema, structure);
}
main();
