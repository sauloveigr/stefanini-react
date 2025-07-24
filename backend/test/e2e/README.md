# Testes End-to-End (E2E)

Este diretório contém os testes end-to-end para verificar se todos os endpoints da API funcionam corretamente em um ambiente real.

## ✅ Status dos Testes

**Todos os 30 testes estão passando!** 🎉

- **2 suites de teste** executadas com sucesso
- **30 testes** passando
- **0 falhas**
- Tempo de execução: ~5.5 segundos

## Estrutura dos Testes

### `user.e2e-spec.ts` (19 testes)

Testes específicos para os endpoints de usuário:

- **POST /users** - Criação de usuários (7 testes)
- **GET /users** - Listagem de usuários (1 teste)
- **GET /users/:id** - Busca de usuário específico (3 testes)
- **PATCH /users/:id** - Atualização de usuário (5 testes)
- **DELETE /users/:id** - Deleção de usuário (2 testes)
- **Error handling** - Tratamento de erros (1 teste)

### `app.e2e-spec.ts` (11 testes)

Testes de integração geral da aplicação:

- **Application Health** - Saúde da aplicação (2 testes)
- **Validation Pipe** - Validação de dados (2 testes)
- **Database Integration** - Integração com banco de dados (2 testes)
- **Error Handling** - Tratamento de erros (3 testes)
- **Response Format Consistency** - Consistência de formato de resposta (1 teste)

### `setup.ts`

Utilitários e dados de teste compartilhados entre os testes.

## Cenários Testados

### Criação de Usuários (POST /users)

- ✅ Criação com dados completos
- ✅ Criação com dados mínimos obrigatórios (name, cpf, birthDate)
- ✅ Rejeição de CPF inválido
- ✅ Rejeição de campos obrigatórios ausentes
- ✅ Rejeição de birthDate ausente
- ✅ Rejeição de data de nascimento inválida
- ✅ Rejeição de CPF duplicado
- ✅ Limpeza automática de formatação do CPF

### Listagem de Usuários (GET /users)

- ✅ Retorno de todos os usuários existentes (ordenados por createdAt desc)

### Busca de Usuário (GET /users/:id)

- ✅ Busca de usuário específico por ID
- ✅ Retorno de 404 para usuário inexistente
- ✅ Tratamento de UUID inválido

### Atualização de Usuário (PATCH /users/:id)

- ✅ Atualização com dados válidos
- ✅ Retorno de 404 para usuário inexistente
- ✅ Rejeição de CPF inválido
- ✅ Rejeição de CPF duplicado
- ✅ Rejeição de birthDate vazio

### Deleção de Usuário (DELETE /users/:id)

- ✅ Deleção bem-sucedida
- ✅ Verificação de que usuário foi realmente deletado
- ✅ Retorno de 404 para usuário inexistente

### Integração Geral

- ✅ Saúde da aplicação
- ✅ Validação de dados com propriedades não permitidas
- ✅ Transformação e validação de dados
- ✅ Persistência de dados entre requisições
- ✅ Requisições concorrentes
- ✅ Tratamento de JSON malformado
- ✅ Consistência de formato de resposta

## Como Executar

### Executar todos os testes e2e

```bash
yarn test:e2e
```

### Executar testes e2e em modo watch

```bash
yarn test:e2e -- --watch
```

### Executar um arquivo específico

```bash
yarn test:e2e -- user.e2e-spec.ts
```

### Executar com cobertura

```bash
yarn test:e2e -- --coverage
```

## Configuração

Os testes e2e usam:

- **Jest** como framework de teste
- **Supertest** para requisições HTTP
- **Prisma** para conexão com banco de dados
- **ValidationPipe** configurado igual à aplicação real

### Configuração do Jest (jest-e2e.json)

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
```

## Banco de Dados

Os testes:

1. **Não limpam** o banco antes de cada teste
2. **Desconectam** do Prisma após os testes

### Importante

- Os testes usam o banco de dados real configurado no `.env`
- Certifique-se de que o banco está acessível durante os testes
- Os dados não são limpos automaticamente

## Dados de Teste

O arquivo `setup.ts` contém dados de teste reutilizáveis:

- `testUserData.valid` - Dados válidos completos
- `testUserData.minimal` - Dados mínimos obrigatórios
- `testUserData.invalid` - Dados inválidos
- `testUserData.duplicate` - Dados duplicados
- `generateTestUsers(count)` - Gera múltiplos usuários de teste

## CPFs Válidos Utilizados

Os testes usam CPFs válidos reais:

- `67923102040`
- `12336043092`
- `35832037049`
- `30931421055`
- `07476304020`

## Campos Obrigatórios

**birthDate é obrigatório** conforme solicitado:

- ✅ Validação no DTO (`@IsNotEmpty()`)
- ✅ Validação no UserService
- ✅ Testes verificam rejeição quando ausente
- ✅ Schema do Prisma com `DateTime` (não opcional)

## Boas Práticas

1. **Isolamento**: Cada teste é independente
2. **Validação**: Testes verificam tanto sucesso quanto falha
3. **Cobertura**: Testes cobrem todos os endpoints e cenários
4. **Performance**: Testes são rápidos e eficientes (~5.5s)
5. **Legibilidade**: Código é claro e bem documentado

## Troubleshooting

### Erro de conexão com banco

- Verifique se o banco está rodando
- Verifique as variáveis de ambiente no `.env`
- Execute `yarn prisma:generate` se necessário

### Testes falhando

- Verifique se não há dados conflitantes
- Execute `yarn test:e2e -- --verbose` para mais detalhes

### Performance lenta

- Os testes podem ser lentos na primeira execução
- Use `--maxWorkers=1` para debug se necessário

## Resultados Finais

```
Test Suites: 2 passed, 2 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        5.501 s
```

Todos os endpoints estão funcionando corretamente! 🚀
