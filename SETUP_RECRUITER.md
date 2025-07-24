# 🚀 Guia de Setup para Recrutadores

Este guia foi criado especificamente para recrutadores que querem testar o projeto do zero em uma nova pasta.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

-   ✅ **Node.js** (versão 18 ou superior)
-   ✅ **Docker Desktop** (rodando)
-   ✅ **Git** (para clonar o repositório)
-   ✅ **Yarn** ou **npm**

## 🔧 Setup Inicial

### 1. Clone o Repositório

```bash
# Clone o repositório em uma pasta de sua escolha
git clone <URL_DO_REPOSITORIO>
cd stefanini-react
```

### 2. Inicialização Automática (Recomendado)

Execute o script de inicialização que fará tudo automaticamente:

```bash
# ⚠️ IMPORTANTE: Certifique-se de estar na pasta raiz do projeto (stefanini-react)
# O script deve ser executado no diretório que contém os arquivos docker-compose.yml, backend/ e frontend/
./start-dev.sh
```

**O que o script faz:**

-   ✅ Cria automaticamente os arquivos `.env` necessários
-   ✅ Inicia o PostgreSQL no Docker
-   ✅ **Instala as dependências do backend automaticamente**
-   ✅ Executa as migrations do banco de dados
-   ✅ Fornece instruções para iniciar backend e frontend

### 3. Iniciar as Aplicações

Após executar o script, você verá instruções como estas:

```bash
🔧 Starting backend...
   Make sure you're in the backend directory: cd backend/
   Then run: yarn start:dev

   In another terminal, start the frontend:
   cd frontend/
   yarn dev

🎯 Application will be available at:
   Frontend: http://localhost:5173
   Backend:  http://localhost:3001
```

#### Terminal 1 - Backend:

```bash
cd backend/
yarn start:dev
```

#### Terminal 2 - Frontend:

```bash
cd frontend/
yarn dev
```

## 🌐 Acessando a Aplicação

-   **Frontend**: http://localhost:5173
-   **Backend API**: http://localhost:3001
-   **Documentação Swagger**: http://localhost:3001/api

## 🧪 Testando a Aplicação

### 1. Interface Web (Frontend)

-   Acesse http://localhost:5173
-   Teste as operações CRUD:
    -   ✅ Criar usuário
    -   ✅ Listar usuários
    -   ✅ Editar usuário
    -   ✅ Deletar usuário
    -   ✅ Buscar usuários

### 2. API REST (Backend)

-   Acesse http://localhost:3001/api
-   Teste os endpoints:
    -   `GET /users` - Listar usuários
    -   `POST /users` - Criar usuário
    -   `GET /users/{id}` - Buscar usuário
    -   `PATCH /users/{id}` - Atualizar usuário
    -   `DELETE /users/{id}` - Deletar usuário

### 3. Testes Automatizados

```bash
cd backend/
yarn test
```

## 📊 O que o Projeto Demonstra

### Frontend

-   ✅ React 19 com TypeScript
-   ✅ Vite para build
-   ✅ Tailwind CSS para estilização
-   ✅ Axios para comunicação com API
-   ✅ React Hook Form para formulários
-   ✅ Componentes reutilizáveis
-   ✅ Tratamento de erros
-   ✅ Validação de formulários

### Backend

-   ✅ NestJS com TypeScript
-   ✅ Prisma ORM
-   ✅ PostgreSQL
-   ✅ Validação com class-validator
-   ✅ Documentação Swagger
-   ✅ Testes com Jest
-   ✅ CORS configurado

### DevOps

-   ✅ Docker para PostgreSQL
-   ✅ Scripts de automação
-   ✅ Migrations automáticas
-   ✅ Configuração de ambiente

## 🛠️ Solução de Problemas

### Erro: "Command not found"

```bash
# Certifique-se de estar no diretório correto
pwd
# Deve mostrar o caminho para sua pasta do projeto (ex: /caminho/para/stefanini-react)
# Verifique se você está na pasta que contém os arquivos docker-compose.yml, backend/ e frontend/
ls
# Deve mostrar: backend/ frontend/ docker-compose.yml start-dev.sh README.md
```

### Erro: "Docker not running"

-   Abra o Docker Desktop
-   Aguarde até que o ícone fique verde
-   Execute novamente: `./start-dev.sh`

### Erro: "Port already in use"

```bash
# Verifique se as portas estão livres
netstat -ano | findstr :3001
netstat -ano | findstr :5173
netstat -ano | findstr :5432
```

### Erro: "Database connection failed"

```bash
# Reinicie o PostgreSQL
docker-compose down
docker-compose up postgres -d
```

## 📝 Dados de Exemplo

Para testar a aplicação, você pode usar estes dados:

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

## 🎯 Checklist de Verificação

-   [ ] Docker Desktop rodando
-   [ ] Script `./start-dev.sh` executado com sucesso
-   [ ] Backend rodando em http://localhost:3001
-   [ ] Frontend rodando em http://localhost:5173
-   [ ] Swagger acessível em http://localhost:3001/api
-   [ ] Operações CRUD funcionando no frontend
-   [ ] Testes passando (`yarn test` no backend)

## 📞 Suporte

Se encontrar problemas, verifique:

1. Se todos os pré-requisitos estão instalados
2. Se o Docker Desktop está rodando
3. Se as portas 3001, 5173 e 5432 estão livres
4. Os logs de erro no terminal

---

**Boa sorte com a avaliação! 🚀**
