export const frameworks = [
  {
    name: 'Express',
    value: 'express',
  },
  // {
  //   name: 'Hono',
  //   value: 'hono',
  // },
];
interface FrameworkOrms {
  [key: string]: { name: string; value: string }[];
}

export const frameworkOrms: FrameworkOrms = {
  express: [
    {
      name: 'Prisma',
      value: 'prisma',
    },
    {
      name: 'Mongoose',
      value: 'mongoose',
    },
  ],
  hono: [
    {
      name: 'Prisma',
      value: 'prisma',
    },
  ],
};

export const structureCreator: { [key: string]: any } = {
  'express-prisma': [
    {
      name: 'Basic',
      value: 'basic',
      description: `.
├── prisma
│   └── schema.prisma
└── src
    ├── controllers
    │   └── XxController.ts
    ├── db
    │   └── PrismaClient.ts
    ├── errors
    │   └── APIError.ts
    ├── index.ts
    ├── middleware
    │   └── error.ts
    └── routes
        ├── index.ts
        └── XxRouter.ts

      `,
    },

    {
      name: 'TutTrue',
      value: 'tuttrue',
      description: `src
  ├── application
  │   ├── Errors
  │   └── XxUsecase.ts
  ├── domain
  │   ├── model
  │   │   └── IXx.ts
  │   └── repository
  │       └── XxRepository.ts
  ├── index.ts
  ├── infrastructure
  │   └── prisma
  │       ├── PrismaClient.ts
  │       ├── prismaRepositories
  │       │   └── PrismaXxRepository.ts
  │       └── schema.prisma
  └── presentation
      └── api
          ├── index.ts
          └── Xx
              ├── index.ts
              └── XxController.ts
  `,
    },
  ],
  'express-mongoose': [
    {
      name: 'TutTrue',
      value: 'tuttrue',
      description: `src
  ├── application
  │   ├── Errors
  │   └── XxUsecase.ts
  ├── domain
  │   ├── model
  │   │   └── IXx.ts
  │   └── repository
  │       └── XxRepository.ts
  ├── index.ts
  ├── infrastructure
  │   ├── mongoose
  │   │   ├── BaseSchema.ts
  │   │   ├── connection.ts
  │   │   ├── models
  │   │   │   └── Xx.ts
  │   │   └── mongooseRepositories
  │   │       └── MongooseXxRepository.ts
  └── presentation
      └── api
          ├── index.ts
          └── Xx
              ├── index.ts
              └── XxController.ts
  `,
    },
  ],
};
