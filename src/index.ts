#!/usr/bin/env node
import { select, input } from '@inquirer/prompts';
import createProject from './projectFactory';

async function main() {
  const projectName = await input({ message: 'Enter project name' });

  const framework = await select({
    message: 'Select a framework',
    choices: [
      {
        name: 'Express',
        value: 'express',
      },
      {
        name: 'Hono',
        value: 'hono',
      },
    ],
  });

  const orm = await select({
    message: 'Select an ORM',
    choices: [
      {
        name: 'Prisma',
        value: 'prisma',
      },
    ],
  });
  await createProject(projectName, framework, orm);
}
main();
