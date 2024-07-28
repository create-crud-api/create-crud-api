import { spawn } from 'child_process';
export default function installAndLint(projectName: string) {
  return new Promise((resolve, reject) => {
    const p = spawn(
      'sh',
      ['-c', `cd ${projectName} && npm i && npm run lint`],

      { stdio: 'inherit' },
    );

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
