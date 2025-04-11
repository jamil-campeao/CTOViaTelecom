# Projeto ViaTelecom CTO

Este projeto utiliza o Prisma com um banco de dados PostgreSQL hospedado no Neon.

## Estrutura do Projeto

```
├── prisma
│   ├── schema.prisma      # Define o esquema Prisma para o banco de dados
├── src
│   ├── index.ts           # Ponto de entrada da aplicação
│   └── db
│       └── client.ts      # Exporta a instância do cliente Prisma
├── package.json            # Arquivo de configuração do npm
├── tsconfig.json           # Arquivo de configuração do TypeScript
└── README.md               # Documentação do projeto
```

## Instruções de Configuração

1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd ./backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados PostgreSQL:**
   - Renomeie o arquivo .env.example para somente env

4. **Execute o Prisma Migrate:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie a aplicação:**
   ```bash
   npm run start
   ```

## Exemplos de Uso

- Você pode interagir com o banco de dados através do arquivo `src/index.ts`, onde pode adicionar lógica para criar, ler, atualizar ou deletar registros.