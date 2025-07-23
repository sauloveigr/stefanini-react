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

## Como Começar

### Pré-requisitos

-   Node.js (v18 ou superior)
-   Docker e Docker Compose
-   Yarn ou npm

### Executando a Aplicação

1. **Iniciar Banco de Dados PostgreSQL:**

    ```bash
    # Certifique-se de estar no diretório raiz (/stefanini)
    cd stefanini

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

    **Aguarde até ver:**

    ```
    🚀 Application is running on: http://localhost:3001
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

    **Aguarde até ver:**

    ```
    VITE v7.0.5  ready in 2251 ms
    ➜  Local:   http://localhost:5173/
    ```

4. **Acessar a Aplicação:**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3001
    - Verificação de saúde: http://localhost:3001/health

### Endpoints da API

O backend fornece os seguintes endpoints REST:

-   `GET /users` - Obter todos os usuários
-   `GET /users/:id` - Obter um usuário específico
-   `POST /users` - Criar um novo usuário
-   `PATCH /users/:id` - Atualizar um usuário existente
-   `DELETE /users/:id` - Deletar um usuário

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

## Estrutura do Projeto

```
├── frontend/                 # Frontend React (porta 5173)
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Funções utilitárias
│   └── package.json
├── backend/                 # Backend NestJS (porta 3001)
│   ├── src/
│   │   ├── user/           # Módulo de usuário
│   │   └── prisma/         # Schema do banco de dados
│   └── package.json
└── docker-compose.yml      # Configuração PostgreSQL (porta 5432)
```

## Resumo

-   ✅ **PostgreSQL**: Rodando no Docker na porta 5432
-   ✅ **Backend**: Rodando localmente na porta 3001
-   ✅ **Frontend**: Rodando localmente na porta 5173
-   ✅ **Aplicação**: Acessível em `http://localhost:5173`
