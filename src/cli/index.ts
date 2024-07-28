import { select, input } from '@inquirer/prompts';
import { frameworks, frameworkOrms, structureCreator } from './choices';

export default async function cliQuestions() {
  const projectName = await input({ message: 'Enter project name' });

  const framework = await select({
    message: 'Select a framework',
    choices: frameworks,
  });

  const orm: string = await select({
    message: 'Select an ORM',
    choices: frameworkOrms[framework],
  });

  const structure: string = await select({
    message: 'Select a project structure',
    choices: structureCreator[`${framework}-${orm}`],
  });

  const schemaPath = 'null';

  return {
    projectName,
    framework,
    orm,
    structure,
    schemaPath,
  };
}
