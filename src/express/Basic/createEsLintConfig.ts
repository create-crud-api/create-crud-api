import fs from 'fs-extra';
import path from 'path';

export default function createEsLintConfig(projectName: string): void {
  const projectDir = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectDir, '.eslintrc.json'),
    `{
  "root": true,
  "env": {
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": [
      "./tsconfig.json"
    ]
  },
  "extends": "airbnb-typescript/base",
  "plugins": [
    "import",
    "@typescript-eslint"
  ],
  "rules": {
    "comma-dangle": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    "camelcase": 0,
    "import/extensions": 0,
    "@typescript-eslint/no-redeclare": 0
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx"
      ]
    },
    "import/resolver": {
      "typescript": {}
    }
  }
}
    `,
  );
}
