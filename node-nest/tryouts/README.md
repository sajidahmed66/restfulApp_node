<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. learning repo

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Nest Fundamentals:

### Modules:

module is a class that is annotated with @module decorator.
modules can import controllers , providers and also other modules.
modules help to keep complexities to a minimun and develop app with solid principles.

modules can be generated from cli with following commands

    nest g module <moduleName>

### Controllers

controllers are what handles requests and responses

### Providers

providers are where business logic reamains.

### Database:

useing postgres on a docker container ;
for orm Prisma is being used;
Peisma is a simple query builder for typeScript and node works with both sql and nosql databases

npx prisma init to initialize the database orm.

`generate client ={ provider = 'prisma-client-js' } `
and datasource is where the database type and link url is provided.

`datasource db ={ provider = "postgresql" url = env("DATABASE_URL") }`

create schema object only in prisma.schema file

do migration for making all schema models available through @prisma/client

    migration : npx prisma migrate dev

check npx prisma --help to check out the documentation for cmd verbs

### Making Prisma a module in nest.js project:

runnring : nest g module prisma will generate a module for prisma
running : nest g service prisma will generate a service for prisma.

PrismaService must extend the class PrismaClient and in the super pass data base related args

      export class PrismaService extends PrismaClient {
    constructor() {
      super({
        datasources: {
          db: {
            url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
          },
        },
      });
    }

}

Make sure that the service(injectable) is also in the exports from module decorator.

code example for PrismaModule

    @Module({
      providers: [PrismaService],
      exports: [PrismaService],
    })
    export class PrismaModule{}

We can add @Global decorator to the PrismaModule to make this Module available all through the app so we don't have to import ot everywhere we use .

### request handles

### Class-validators and Class-Transformer
