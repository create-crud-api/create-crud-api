import { spawn } from 'child_process';

export default function runPrismaScripts(projectName: string) {
  const p = spawn(
    'sh',
    [
      '-c',
      `cd ${projectName} && npm i && npm i prisma --save-dev && npx prisma generate --schema=./src/infrastructure/prisma/schema.prisma && npx prisma db push --schema=./src/infrastructure/prisma/schema.prisma`,
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
