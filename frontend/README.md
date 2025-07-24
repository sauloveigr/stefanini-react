# Frontend - Sistema de Gerenciamento de Usuários

Este é o frontend do sistema de gerenciamento de usuários, construído com React, TypeScript e Vite.

## Tecnologias Utilizadas

-   **React 19**: Biblioteca para construção de interfaces
-   **TypeScript**: Linguagem de programação tipada
-   **Vite**: Ferramenta de build rápida
-   **Tailwind CSS**: Framework CSS utilitário
-   **Axios**: Cliente HTTP para comunicação com API
-   **React Hook Form**: Biblioteca para formulários
-   **Headless UI**: Componentes acessíveis

## Instalação

```bash
# Instalar dependências
yarn install
```

## Executando a Aplicação

```bash
# Modo desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview do build
yarn preview
```

## Configuração

### Variáveis de Ambiente

Crie o arquivo `.env` baseado no `.env.example`:

```env
# URL da API do backend
VITE_API_URL=http://localhost:3001
```

### Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── UserCard/       # Card de usuário
│   │   ├── UserForm/       # Formulário de usuário
│   │   └── UserList/       # Lista de usuários
│   ├── features/           # Funcionalidades
│   │   └── user/          # Funcionalidade de usuário
│   ├── hooks/             # Hooks personalizados
│   │   └── useUsers.ts    # Hook para gerenciar usuários
│   ├── types/             # Tipos TypeScript
│   │   └── user.ts        # Tipos de usuário
│   ├── utils/             # Funções utilitárias
│   └── App.tsx            # Componente principal
├── public/                # Arquivos estáticos
└── package.json
```

## Funcionalidades

### Gerenciamento de Usuários

-   ✅ **Criar Usuário**: Formulário para adicionar novos usuários
-   ✅ **Listar Usuários**: Exibição de todos os usuários cadastrados
-   ✅ **Editar Usuário**: Atualização de dados de usuários existentes
-   ✅ **Deletar Usuário**: Remoção de usuários do sistema
-   ✅ **Busca e Filtro**: Funcionalidade de busca por nome
-   ✅ **Validação**: Validação de formulários em tempo real

### Interface do Usuário

-   ✅ **Design Responsivo**: Adaptável a diferentes tamanhos de tela
-   ✅ **Notificações Toast**: Feedback visual para ações do usuário
-   ✅ **Loading States**: Indicadores de carregamento
-   ✅ **Tratamento de Erros**: Mensagens de erro amigáveis
-   ✅ **Acessibilidade**: Componentes acessíveis

### Integração com Backend

-   ✅ **Comunicação HTTP**: Via Axios com o backend NestJS
-   ✅ **Sincronização**: Dados atualizados em tempo real
-   ✅ **Tratamento de Erros**: Tratamento adequado de erros da API
-   ✅ **Validação**: Validação de dados antes do envio

## Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview do build
yarn preview

# Linting
yarn lint

# Type checking
yarn type-check
```

### Configuração do ESLint

Para desenvolvimento de produção, recomendamos atualizar a configuração para habilitar regras de linting com tipos:

```js
export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Outras configurações...

            // Remova tseslint.configs.recommended e substitua por:
            ...tseslint.configs.recommendedTypeChecked,
            // Alternativamente, use para regras mais rigorosas:
            ...tseslint.configs.strictTypeChecked,
            // Opcionalmente, adicione para regras estilísticas:
            ...tseslint.configs.stylisticTypeChecked,

            // Outras configurações...
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // outras opções...
        },
    },
]);
```

Você também pode instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) e [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para regras específicas do React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Outras configurações...
            // Habilitar regras de lint para React
            reactX.configs['recommended-typescript'],
            // Habilitar regras de lint para React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // outras opções...
        },
    },
]);
```

## Como Usar

1. **Inicie o Backend**: Certifique-se de que o backend está rodando em `http://localhost:3001`
2. **Configure as Variáveis**: Crie o arquivo `.env` com a URL da API
3. **Instale as Dependências**: Execute `yarn install`
4. **Inicie o Frontend**: Execute `yarn dev`
5. **Acesse a Aplicação**: Abra `http://localhost:5173` no navegador

## Portas Utilizadas

-   **Frontend**: 5173 (http://localhost:5173)
-   **Backend**: 3001 (http://localhost:3001)
-   **PostgreSQL**: 5432 (via Docker)

## Solução de Problemas

### Problemas de Conexão com Backend

-   Verifique se o backend está rodando na porta 3001
-   Confirme se a variável `VITE_API_URL` está configurada corretamente
-   Verifique se o CORS está habilitado no backend

### Problemas de Build

-   Execute `yarn install` para instalar dependências
-   Verifique se o Node.js está na versão correta (v18+)
-   Limpe o cache: `yarn cache clean`

### Problemas de TypeScript

-   Execute `yarn type-check` para verificar tipos
-   Verifique se os tipos estão corretos em `src/types/`
-   Atualize as dependências se necessário
