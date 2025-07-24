# Sistema de Gerenciamento de Usuários

Um sistema full-stack de gerenciamento de usuários com frontend React e backend NestJS, conectados via axios para operações CRUD.

## Funcionalidades

-   ✅ Operações Create, Read, Update, Delete (CRUD) para usuários
-   ✅ Sincronização de dados em tempo real entre frontend e backend
-   ✅ Validação de formulários e tratamento de erros
-   ✅ Funcionalidade de busca e filtro
-   ✅ Design responsivo com Tailwind CSS
-   ✅ Notificações toast para feedback do usuário
-   ✅ Banco de dados PostgreSQL com Prisma ORM
-   ✅ Testes automatizados com Jest (Backend)
-   ✅ Documentação interativa da API com Swagger

## 🚀 Extras Implementados

-   📚 Documentação dos Endpoints com Swagger
-   🧪 Testes Automatizados com Jest

## Stack Tecnológica

### Frontend

-   React 19 com TypeScript
-   Vite para ferramentas de build
-   Tailwind CSS para estilização
-   Axios para comunicação com API
-   React Hook Form para manipulação de formulários
-   Headless UI para componentes acessíveis

### Backend

-   NestJS com TypeScript
-   Prisma ORM
-   Banco de dados PostgreSQL
-   Class-validator para validação de DTO
-   CORS habilitado para comunicação com frontend
-   Jest para testes automatizados
-   Swagger para documentação da API

## Como Começar

### Pré-requisitos

-   Node.js (v18 ou superior)
-   Docker e Docker Compose
-   Yarn ou npm

### Inicialização Rápida (Script)

Para facilitar o processo, você pode usar o script de inicialização:

```bash
# Certifique-se de estar no diretório raiz do projeto
./start-dev.sh
```

Este script irá:

-   Verificar se você está no diretório correto
-   **Criar automaticamente os arquivos .env necessários**
-   Iniciar o PostgreSQL
-   Aguardar o PostgreSQL estar pronto
-   **Executar as migrations do banco de dados automaticamente**
-   Fornecer instruções para iniciar backend e frontend

**💡 Dica:** O script agora cria automaticamente os arquivos `.env` e executa as migrations do Prisma, então a tabela `User` será criada automaticamente no banco de dados.

### Configuração Manual de Variáveis de Ambiente (Opcional)

Se preferir configurar manualmente, você pode criar os arquivos `.env`:

#### Backend (.env)

Crie o arquivo `backend/.env` com o seguinte conteúdo:

```env
# Database connection string for PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/db"
```

#### Frontend (.env)

Crie o arquivo `frontend/.env` com o seguinte conteúdo:

```env
# API URL for backend communication
VITE_API_URL=http://localhost:3001
```

**⚠️ Importante:**

-   Certifique-se de que a URL da API no frontend (`VITE_API_URL`) corresponda à porta onde o backend está rodando (3001)
-   O arquivo `.env` deve ser criado antes de executar `yarn start:dev` ou `yarn dev`
-   O backend usa `@nestjs/config` para carregar as variáveis de ambiente automaticamente

### Executando a Aplicação

1. **Iniciar Banco de Dados PostgreSQL:**

    ```bash
    # Certifique-se de estar no diretório raiz do projeto
    # ⚠️ IMPORTANTE: Certifique-se de que o Docker Desktop está rodando antes de executar este comando
    # Iniciar PostgreSQL no Docker
    docker-compose up postgres -d
    ```

2. **Iniciar Backend (Terminal 1):**

    ```bash
    # Abra uma NOVA janela de terminal
    # Navegue até o diretório backend
    cd backend/

    # Instale as dependências (se ainda não foi feito)
    yarn install

    # Inicie o backend
    yarn start:dev
    ```

    **⚠️ Importante:** Certifique-se de estar no diretório `backend/` antes de executar os comandos.

    **Aguarde até ver:**

    ```
    🚀 Application is running on: http://localhost:3001
    📚 Swagger documentation available at: http://localhost:3001/api
    ```

3. **Iniciar Frontend (Terminal 2):**

    ```bash
    # Abra OUTRA NOVA janela de terminal
    # Navegue até o diretório frontend
    cd frontend/

    # Instale as dependências (se ainda não foi feito)
    yarn install

    # Inicie o frontend
    yarn dev
    ```

    **⚠️ Importante:** Certifique-se de estar no diretório `frontend/` antes de executar os comandos.

    **Aguarde até ver:**

    ```
    VITE v7.0.5  ready in 2251 ms
    ➜  Local:   http://localhost:5173/
    ```

4. **Acessar a Aplicação:**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3001
    - Verificação de saúde: http://localhost:3001/health
    - **Documentação Swagger**: http://localhost:3001/api

### Migrations do Banco de Dados

O projeto usa Prisma ORM para gerenciar o banco de dados. As migrations são executadas automaticamente pelo script `start-dev.sh`, mas você também pode executá-las manualmente:

```bash
# Navegue até o diretório backend
cd backend/

# Gerar o cliente Prisma
yarn prisma:generate

# Executar migrations existentes
yarn prisma:migrate

# Ou executar tudo de uma vez (gerar cliente + migrations)
yarn db:setup
```

**📝 Comandos úteis do Prisma:**

```bash
# Criar uma nova migration (desenvolvimento)
yarn prisma:migrate:dev

# Visualizar o banco de dados no Prisma Studio
npx prisma studio

# Resetar o banco de dados (⚠️ CUIDADO: apaga todos os dados)
npx prisma migrate reset
```

**💡 Dica:** Se você precisar criar novas migrations, use `yarn prisma:migrate:dev` durante o desenvolvimento. Para produção, use `yarn prisma:migrate`.

### Endpoints da API

O backend fornece os seguintes endpoints REST:

-   `GET /users` - Obter todos os usuários
-   `GET /users/:id` - Obter um usuário específico
-   `POST /users` - Criar um novo usuário
-   `PATCH /users/:id` - Atualizar um usuário existente
-   `DELETE /users/:id` - Deletar um usuário

## 📚 Documentação da API com Swagger

O projeto inclui documentação interativa da API usando Swagger. Após iniciar o backend, você pode acessar:

### URLs de Acesso

-   **Swagger UI**: http://localhost:3001/api
-   **OpenAPI JSON**: http://localhost:3001/api-json

### Como Testar a API no Swagger

#### 1. Acessar a Interface Swagger

1. Certifique-se de que o backend está rodando:

    ```bash
    cd backend
    yarn start:dev
    ```

2. Abra seu navegador e acesse:
    ```
    http://localhost:3001/api
    ```

#### 2. Testar Endpoints no Swagger

##### Criar Usuário (POST /users)

1. Clique em **"Users"** → **"POST /users"**
2. Clique em **"Try it out"**
3. Preencha o JSON de exemplo:
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

##### Listar Usuários (GET /users)

1. Clique em **"GET /users"**
2. Clique em **"Try it out"**
3. Clique em **"Execute"**

##### Buscar por ID (GET /users/{id})

1. Clique em **"GET /users/{id}"**
2. Clique em **"Try it out"**
3. Digite o ID do usuário (ex: `1`)
4. Clique em **"Execute"**

##### Atualizar Usuário (PATCH /users/{id})

1. Clique em **"PATCH /users/{id}"**
2. Clique em **"Try it out"**
3. Digite o ID do usuário
4. Preencha os campos que deseja atualizar
5. Clique em **"Execute"**

##### Deletar Usuário (DELETE /users/{id})

1. Clique em **"DELETE /users/{id}"**
2. Clique em **"Try it out"**
3. Digite o ID do usuário
4. Clique em **"Execute"**

#### 3. Testar via cURL (Linha de Comando)

```bash
# Teste de saúde
curl http://localhost:3001/health

# Criar usuário
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","gender":"female","email":"maria@email.com","birthDate":"1985-08-20","placeOfBirth":"Rio de Janeiro, RJ","nationality":"Brasileira","cpf":"98765432100"}'

# Listar usuários
curl http://localhost:3001/users

# Buscar por ID
curl http://localhost:3001/users/{id}

# Atualizar usuário
curl -X PATCH http://localhost:3001/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva Atualizada"}'

# Deletar usuário
curl -X DELETE http://localhost:3001/users/{id}
```

#### 4. Recursos da Documentação Swagger

-   ✅ **Interface Interativa**: Teste endpoints diretamente no navegador
-   ✅ **Exemplos de Dados**: Valores de exemplo para todos os campos
-   ✅ **Validação em Tempo Real**: Validação de formulários
-   ✅ **Respostas de Erro**: Documentação de todos os códigos de erro
-   ✅ **Esquemas de Dados**: Estrutura completa dos objetos
-   ✅ **Descrições em Português**: Documentação localizada

### Schema do Banco de Dados

O modelo User inclui:

-   `id` (UUID, chave primária)
-   `name` (obrigatório)
-   `gender` (opcional)
-   `email` (opcional, único)
-   `birthDate` (obrigatório)
-   `placeOfBirth` (opcional)
-   `nationality` (opcional)
-   `cpf` (obrigatório, único)
-   `createdAt` (gerado automaticamente)
-   `updatedAt` (gerado automaticamente)

## Desenvolvimento

### Desenvolvimento Frontend

-   O frontend usa o hook `useUsers` para todas as operações da API
-   Notificações toast fornecem feedback do usuário para todas as operações CRUD
-   Validação de formulários garante integridade dos dados
-   Tratamento de erros com mensagens amigáveis ao usuário

### Desenvolvimento Backend

-   Módulos NestJS para arquitetura limpa
-   Prisma para operações de banco de dados
-   Validação de DTO com class-validator
-   Tratamento adequado de erros e códigos de status HTTP

## Testes Automatizados

### Executando os Testes

```bash
# Navegue até o diretório backend
cd backend/

# Executar todos os testes
yarn test

# Executar testes com cobertura de código
yarn test:cov

# Executar testes em modo watch (desenvolvimento)
yarn test:watch
```

### Cobertura de Testes

O projeto mantém uma cobertura de testes robusta:

-   **Statements**: 91.01% ✅
-   **Functions**: 90% ✅
-   **Lines**: 91.46% ✅
-   **Branches**: 64.91% ✅

### Testes Implementados

#### Backend (Jest + NestJS Testing)

1. **UserService** - Testes abrangentes para:

    - Criação de usuários (com e sem campos opcionais)
    - Listagem de usuários
    - Busca por ID
    - Atualização de usuários
    - Remoção de usuários
    - Validação de email
    - Tratamento de erros (CPF duplicado, usuário não encontrado, erros de banco)

2. **UserController** - Testes para:

    - Todos os endpoints CRUD
    - Tratamento de erros HTTP
    - Respostas padronizadas
    - Validação de status codes

3. **AppController** e **AppService** - Testes básicos

4. **CreateUserDto** - Testes de validação:

    - Campos obrigatórios
    - Campos opcionais
    - Validação de CPF
    - Validação de data de nascimento

5. **UserModule** - Testes de integração do módulo

### Estrutura dos Testes

```
backend/
├── src/
│   ├── user/
│   │   ├── user.service.spec.ts      # Testes do UserService
│   │   ├── user.controller.spec.ts   # Testes do UserController
│   │   ├── user.module.spec.ts       # Testes de integração
│   │   └── dto/
│   │       └── create-user.dto.spec.ts # Testes de validação
│   ├── app.controller.spec.ts         # Testes do AppController
│   └── app.service.spec.ts           # Testes do AppService
```

## Solução de Problemas

1. **Problemas de conexão com banco de dados:**

    - Certifique-se de que o Docker está rodando
    - Verifique se o container PostgreSQL está saudável: `docker-compose ps`
    - Aguarde o PostgreSQL estar pronto: `docker-compose logs postgres`

2. **Frontend não consegue conectar ao backend:**

    - Verifique se o backend está rodando na porta 3001
    - Verifique a configuração CORS no backend
    - Certifique-se de que API_BASE_URL no frontend corresponde à URL do backend

3. **Conflitos de porta:**

    - Backend roda na porta 3001
    - Frontend roda na porta 5173
    - PostgreSQL roda na porta 5432

4. **Erros de validação de formulário:**

    - Verifique se todos os campos obrigatórios estão preenchidos
    - Verifique o formato do email se fornecido
    - Certifique-se de que o CPF tem exatamente 11 dígitos

5. **Problemas com testes:**

    - Certifique-se de estar no diretório `backend/`
    - Execute `yarn install` se as dependências não estiverem instaladas
    - Verifique se o Jest está configurado corretamente no `package.json`

6. **Problemas com arquivos .env:**

    - Certifique-se de que os arquivos `.env` foram criados em ambos os diretórios (`backend/` e `frontend/`)
    - Verifique se o `DATABASE_URL` no backend está correto
    - Confirme se o `VITE_API_URL` no frontend aponta para a porta correta do backend (3001)
    - Reinicie os serviços após criar/modificar os arquivos `.env`

7. **Problemas de configuração do backend:**

    - O backend usa `@nestjs/config` para carregar variáveis de ambiente
    - Certifique-se de que o `ConfigModule` está configurado no `app.module.ts`
    - Se as variáveis não estão sendo carregadas, verifique se o arquivo `.env` está no diretório correto (`backend/.env`)
    - Execute `yarn install` para garantir que `@nestjs/config` está instalado

8. **Erro "Command not found" ao executar yarn start:dev:**
    - Certifique-se de estar no diretório correto: `cd backend/` antes de executar `yarn start:dev`
    - Certifique-se de estar no diretório correto: `cd frontend/` antes de executar `yarn dev`
    - Verifique se você está no diretório raiz (`stefanini`) quando executar `docker-compose up postgres -d`
    - Os comandos `yarn start:dev` e `yarn dev` só funcionam dentro de seus respectivos diretórios

## Estrutura do Projeto

```
├── frontend/                 # Frontend React (porta 5173)
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Funções utilitárias
│   ├── .env.example        # Template de variáveis de ambiente
│   └── package.json
├── backend/                 # Backend NestJS (porta 3001)
│   ├── src/
│   │   ├── user/           # Módulo de usuário
│   │   │   ├── *.spec.ts   # Testes automatizados
│   │   └── prisma/         # Schema do banco de dados
│   ├── .env.example        # Template de variáveis de ambiente
│   └── package.json
└── docker-compose.yml      # Configuração PostgreSQL (porta 5432)
```

## Resumo

-   ✅ **PostgreSQL**: Rodando no Docker na porta 5432
-   ✅ **Backend**: Rodando localmente na porta 3001
-   ✅ **Frontend**: Rodando localmente na porta 5173
-   ✅ **Aplicação**: Acessível em `http://localhost:5173`
-   ✅ **Testes**: Cobertura de 91%+ com Jest
