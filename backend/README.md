<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Backend

Esta é uma aplicação NestJS com Prisma ORM para gerenciamento de banco de dados.

## Instalação

```bash
yarn install
```

## Executando a Aplicação

```bash
# desenvolvimento
yarn start:dev

# modo produção
yarn start:prod
```

## Testes

```bash
# testes unitários
yarn test

# testes e2e
yarn test:e2e

# cobertura de testes
yarn test:cov
```

## Banco de Dados

```bash
# Gerar cliente Prisma
yarn prisma:generate

# Executar migrations
yarn prisma:migrate

# Configurar banco de dados (gerar + migrar)
yarn db:setup
```

## Documentação da API

A documentação da API está disponível através do Swagger UI quando a aplicação está rodando:

- **Swagger UI**: http://localhost:3001/api
- **OpenAPI JSON**: http://localhost:3001/api-json

A documentação inclui:

- Todos os endpoints disponíveis
- Esquemas de requisição/resposta
- Dados de exemplo
- Respostas de erro
- Interface interativa para testes

### Endpoints Disponíveis

- `GET /` - Mensagem de boas-vindas
- `GET /health` - Verificação de saúde
- `GET /users` - Obter todos os usuários
- `POST /users` - Criar novo usuário
- `GET /users/:id` - Obter usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure as seguintes variáveis:

- `DATABASE_URL` - String de conexão com o banco de dados
- `PORT` - Porta da aplicação (padrão: 3001)

## Como Testar o Swagger

### 1. Acessar a Interface Swagger

1. Inicie o servidor de desenvolvimento:

   ```bash
   cd backend
   yarn start:dev
   ```

2. Abra seu navegador e acesse:
   ```
   http://localhost:3001/api
   ```

### 2. Testar Endpoints no Swagger

#### Criar Usuário (POST /users)

1. Clique em **"Users"** → **"POST /users"**
2. Clique em **"Try it out"**
3. Preencha o JSON:
   ```json
   {
     "name": "João Silva",
     "gender": "male",
     "email": "joao.silva@email.com",
     "birthDate": "1990-05-15",
     "placeOfBirth": "São Paulo, SP",
     "nationality": "Brasileira",
     "cpf": "12345678901"
   }
   ```
4. Clique em **"Execute"**

#### Listar Usuários (GET /users)

1. Clique em **"GET /users"**
2. Clique em **"Try it out"**
3. Clique em **"Execute"**

#### Buscar por ID (GET /users/{id})

1. Clique em **"GET /users/{id}"**
2. Clique em **"Try it out"**
3. Digite o ID do usuário
4. Clique em **"Execute"**

### 3. Testar via cURL

```bash
# Teste de saúde
curl http://localhost:3001/health

# Criar usuário
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","gender":"female","email":"maria@email.com","birthDate":"1985-08-20","cpf":"98765432100"}'

# Listar usuários
curl http://localhost:3001/users

# Buscar por ID
curl http://localhost:3001/users/{id}
```

### 4. Verificar Documentação OpenAPI

```bash
curl http://localhost:3001/api-json
```

## Estrutura do Projeto

```
backend/
├── src/
│   ├── user/
│   │   ├── user.controller.ts    # Controlador de usuários
│   │   ├── user.service.ts       # Serviço de usuários
│   │   ├── user.module.ts        # Módulo de usuários
│   │   └── dto/
│   │       ├── create-user.dto.ts    # DTO para criação
│   │       └── update-user.dto.ts    # DTO para atualização
│   ├── app.controller.ts         # Controlador principal
│   ├── app.service.ts           # Serviço principal
│   ├── app.module.ts            # Módulo principal
│   └── main.ts                  # Arquivo de inicialização
├── prisma/
│   └── schema.prisma           # Schema do banco de dados
└── package.json
```

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações escaláveis
- **Prisma**: ORM moderno para TypeScript e Node.js
- **PostgreSQL**: Banco de dados relacional
- **Swagger**: Documentação interativa da API
- **Jest**: Framework de testes
- **TypeScript**: Linguagem de programação tipada
