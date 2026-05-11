# 🚀 Microsserviço: LudoApp Backend

**Data:** 7 de maio de 2026

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white)](https://github.com/psico/ludo-app-backend)
[![Node.js Badge](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)]()
[![TypeScript Badge](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)]()
[![Express Badge](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)]()
[![GraphQL Badge](https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)]()
[![Firebase Badge](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white)]()

**Propósito:** Fornece uma API GraphQL que gerencia perfis de usuários, registros de partidas de jogos de tabuleiro, sistema de experiência e progressão, rede social (amigos e seguidores) e integração com dados de jogos do BoardGameAtlas.

**Stack Principal:**
- Node.js + Express.js
- TypeScript 4.7.4
- GraphQL (graphql 15.8.0, graphql-tools 8.2.7)
- Firebase Cloud Firestore + Authentication
- Jest para testes

**Dependências Externas:**
| Dependência | Propósito |
|---|---|
| Firebase Cloud Firestore | Banco de dados NoSQL para usersInfo e matches |
| Firebase Admin SDK | Autenticação e gerenciamento de sessões |
| BoardGameAtlas API | Dados de jogos de tabuleiro (nomes, descrições, imagens) |
| Frontend LudoApp | Consumidor das queries e mutations GraphQL |

---

## 📖 1. Tutoriais (Onboarding)

### Configuração Inicial

#### Pré-requisitos:
- Node.js v14+ instalado
- Conta Firebase com Firestore habilitado
- Credenciais do Firebase (arquivo `firebaseConfig.json` e `serviceAccountKey.json`)

#### Passo 1: Preparar Credenciais Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto LudoApp
3. Vá em **Configurações do Projeto** → **Contas de Serviço**
4. Clique em **Gerar nova chave privada** → Salve como `serviceAccountKey.json` na raiz do projeto
5. Vá em **Configurações do Projeto** → **Suas Apps** → Copie a configuração web
6. Crie o arquivo `firebaseConfig.json` na raiz com:
   ```json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "ludoapp-b612.firebaseapp.com",
     "databaseURL": "https://ludoapp-b612.firebaseio.com",
     "projectId": "ludoapp-b612",
     "storageBucket": "ludoapp-b612.appspot.com",
     "messagingSenderId": "YOUR_SENDER_ID",
     "appId": "YOUR_APP_ID"
   }
   ```

#### Passo 2: Instalar Dependências

```bash
# Com npm
npm install

# Com yarn
yarn install
```

#### Passo 3: Executar em Desenvolvimento

```bash
# Servidor com auto-reload (recomendado)
npm run dev

# Com debug ativado (Node Inspector)
npm run dev:debug

# Acessar GraphQL Playground
# http://localhost:4000/graphql
```

#### Passo 4: Compilar para Produção

```bash
npm start
```

A aplicação irá compilar TypeScript para `dist/` e iniciar o servidor na porta **4000**.

---

## 🛠 2. Guias de Como Fazer (Tarefas Comuns)

### Como Rodar os Testes Unitários

```bash
# Executar suite de testes uma vez
npm test

# Modo watch (re-executa ao detectar mudanças)
npm test:watch
```

**Arquivos de teste:**
- `test/userInfo/resolvers.spec.ts` – Testes de perfil e experiência
- `test/match/resolvers.spec.ts` – Testes de criação e busca de partidas
- `test/friend/resolvers.spec.ts` – Testes de relações de amizade

**Cobertura:** Os testes geram relatório de cobertura em `coverage/typescript/`

### Como Adicionar uma Nova Query ou Mutation GraphQL

1. **Crie o schema** no arquivo `src/seumódulo/schema.ts`:
   ```typescript
   const MyModule = `
     extend type Query {
       minhaQuery(param: String!): String
     }
     extend type Mutation {
       minhaMutation(input: MyInput!): MyResult
     }
     type MyResult {
       id: ID!
       valor: String
     }
   `;
   export default () => [MyModule];
   ```

2. **Implemente o resolver** em `src/seumódulo/resolvers.ts`:
   ```typescript
   export const Query = {
     minhaQuery: async (_, { param }, { db, firebase }) => {
       // Lógica aqui
       return resultado;
     }
   };
   
   export const Mutation = {
     minhaMutation: async (_, { input }, { db, firebase }) => {
       // Lógica aqui
       return resultado;
     }
   };
   ```

3. **Exporte no schema.ts** da pasta da aplicação raiz:
   - O arquivo `src/schema.ts` automaticamente importa todos os módulos
   - Certifique-se de adicionar o import em `src/schema.ts` e `src/resolvers.ts`

### Como Acessar o Banco de Dados Firestore em um Resolver

```typescript
// Buscar um documento
const snapshot = await context.db
  .collection('usersInfo')
  .doc(uid)
  .get();
const userData = snapshot.data();

// Buscar múltiplos documentos com filtro
const querySnapshot = await context.db
  .collection('matches')
  .where('uid', '==', currentUserId)
  .orderBy('createdAt', 'desc')
  .get();

querySnapshot.forEach(doc => {
  console.log(doc.id, doc.data());
});

// Criar/atualizar documento
await context.db.collection('usersInfo').doc(uid).set({
  uid: uid,
  name: name,
  photoURL: photoURL,
  createdAt: new Date()
});
```

### Como Integrar uma API Externa (como BoardGameAtlas)

```typescript
// Exemplo: Buscar dados de jogo
import axios from 'axios';

const gameData = await axios.get(
  `https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=${API_KEY}`
);

return gameData.data.games[0];
```

---

## 📚 3. Referência (Contratos e Dados)

### Endpoints/Queries Principais (GraphQL)

| Operação | Tipo | Descrição |
|---|---|---|
| `usersInfo(textSearch)` | Query | Lista todos os usuários, com filtro opcional por nome |
| `userInfo(uid)` | Query | Retorna perfil de um usuário específico |
| `userExperienceInfo(uid)` | Query | Retorna nível e experiência total de um usuário |
| `friends` | Query | Lista amigos do usuário autenticado |
| `friend(uid)` | Query | Dados de um amigo específico |
| `games(name)` | Query | Busca jogos pelo nome (via BoardGameAtlas) |
| `game(objectId)` | Query | Retorna detalhes de um jogo específico |
| `matches(uid, textSearch)` | Query | Lista partidas (opcionalmente filtradas por usuário ou busca) |
| `match(idDoc)` | Query | Retorna detalhes de uma partida específica |
| `createUserInfo(uid, name)` | Mutation | Cria novo perfil de usuário |
| `createFriend(uid, name)` | Mutation | Envia solicitação de amizade |
| `follow(followUid)` | Mutation | Segue um usuário |
| `createMatch(MatchInput)` | Mutation | Registra uma nova partida (complexo - vide abaixo) |
| `addComment(CommentInput)` | Mutation | Adiciona comentário a uma partida |
| `likeIt(idDoc)` | Mutation | Marca uma partida com "curtida" |

### Estrutura de Dados Principais

#### UserInfo (Collection: `usersInfo`)
```graphql
type UserInfo {
  uid: ID
  name: String
  photoURL: String
  friends: [Friend]
  numberOfMatches: Int
  following: [Friend]
  followers: [Friend]
  logExperience: [LogExperience]
}

type LogExperience {
  gained: Int          # Pontos ganhos
  gameName: String     # Nome do jogo
  type: String         # "Single Match", "First Match Game", etc
  createdAt: String    # Timestamp
}

type ExperienceInfo {
  totalExperience: Int      # Total de pontos
  level: Int                # Nível atual
  nextLevelExperience: Int  # Pontos para próximo nível
}
```

#### Match (Collection: `matches`)
```graphql
type Match {
  idDoc: String              # ID do documento Firestore
  matchOwner: UserSummary    # Quem registrou a partida
  gameMoment: String         # Descrição/resultado da partida
  createdAt: Date            # Data de criação
  game: Game                 # Dados do jogo jogado
  comments: [Comment]        # Comentários dos usuários
  players: [UserInfo]        # Jogadores que participaram
  likes: [UserInfo]          # Usuários que curtiram
}

type UserSummary {
  uid: ID
  name: String
  photoURL: String
}
```

#### Game (do BoardGameAtlas)
```graphql
type Game {
  name: String              # Nome do jogo
  objectId: String          # ID no BoardGameAtlas
  yearPublished: String     # Ano de publicação
  description: String       # Descrição completa
  imageUrl: String          # URL da capa
}
```

#### Comment (aninhado em Match)
```graphql
type Comment {
  uid: ID                   # Autor do comentário
  name: String              # Nome do autor
  comment: String           # Texto do comentário
  photoURL: String          # Avatar do autor
}
```

### Input Types

#### MatchInput (criação de partida)
```graphql
input MatchInput {
  gameMoment: String        # Descrição da partida
  gameObjectId: String      # ID do jogo no BoardGameAtlas
  players: [PlayerInput]    # Lista de jogadores
}

input PlayerInput {
  uid: String
  name: String
  photoURL: String
}

input CommentInput {
  idDoc: String             # ID da partida
  text: String              # Conteúdo do comentário
}
```

---

## 🧠 4. Explicação e Arquitetura

### Estrutura de Pastas

```
src/
├── index.ts                      # Servidor Express + middlewares
├── schema.ts                     # Schema GraphQL combinado
├── resolvers.ts                  # Resolvers combinados
├── context.ts                    # Contexto GraphQL (db, firebase, user)
├── base.ts                       # Tipos base (Query, Mutation, scalars)
│
├── userInfo/                     # Módulo de Perfil e Experiência
│   ├── schema.ts                 # Queries/Mutations de usuário
│   └── resolvers.ts              # Lógica de perfil
│
├── friend/                       # Módulo de Amigos
│   ├── schema.ts                 # Queries/Mutations de amizade
│   └── resolvers.ts              # Lógica de relacionamento
│
├── game/                         # Módulo de Jogos (BoardGameAtlas)
│   ├── schema.ts                 # Query de games
│   └── resolvers.ts              # Integração com API externa
│
├── match/                        # Módulo de Partidas (complexo)
│   ├── schema.ts                 # Queries/Mutations de partidas
│   └── resolvers.ts              # Lógica de registro e busca
│
├── comment/                      # Módulo de Comentários
│   ├── schema.ts                 # Tipo Comment (aninhado)
│   └── resolvers.ts              # Lógica de comentários
│
└── util/
    └── util.ts                   # Funções auxiliares (experiência, auth)

test/                             # Testes unitários (mesma estrutura)
```

### Padrão Arquitetural

**Padrão: Modular + GraphQL Resolver Pattern**

- **Separação por domínio:** Cada feature (userInfo, friend, match, game) em sua própria pasta
- **Schema + Resolvers:** Cada módulo expõe `schema.ts` e `resolvers.ts`
- **Composição:** O arquivo raiz `src/schema.ts` compõe todos os schemas
- **Context compartilhado:** Firestore (`db`), Firebase SDK (`firebase`), usuário autenticado (`currentUser`)
- **Sem camada de repositório:** Lógica de Firestore diretamente nos resolvers

### Fluxo de Autenticação

1. Cliente faz login via REST (`POST /login` ou `POST /loginCredential`)
2. Backend verifica credenciais com Firebase
3. Retorna `idToken` JWT (vida útil: ~1 hora)
4. Cliente inclui token no header `Authorization: Bearer <token>` nas queries GraphQL
5. Middleware verifica token e adiciona `currentUser` ao contexto

### Integrações Externas

| Sistema | Propósito | Endpoint |
|---|---|---|
| **Firebase Firestore** | Persistência de dados (users, matches) | N/A (SDK) |
| **Firebase Auth** | Autenticação de usuários | N/A (SDK) |
| **BoardGameAtlas** | Catálogo de jogos | `https://api.boardgameatlas.com/api/search` |

---

## 📝 5. Regras de Negócio

### R001 - Sistema de Experiência por Partida
- **Descrição:** Usuários ganham pontos de experiência (XP) ao registrarem partidas.
- **Condições:**
  - Partida deve ter pelo menos 1 jogador registrado
  - Jogo deve existir no BoardGameAtlas
  - Usuário deve estar autenticado
- **Valores de XP:**
  - "Single Match" (partida comum): 5 XP
  - "First Match Game" (primeira vez jogando um jogo): 15 XP
- **Exceções:** Se a API do BoardGameAtlas não responder, partida é rejeitada

### R002 - Nível do Usuário
- **Descrição:** Cada usuário possui um nível baseado em XP total acumulado.
- **Condições:**
  - Nível é calculado a partir do campo `totalExperience` em `usersInfo`
  - Progressão é linear (definir em `calculateExperienceLevel()` no util)
- **Exceções:** Usuários novos começam no nível 1 com 0 XP

### R003 - Relacionamento de Amizade
- **Descrição:** Usuários podem se tornar amigos (relacionamento bidirecional).
- **Condições:**
  - Solicitação de amizade cria entrada em `friends` do perfil
  - `follow()` permite seguir sem reciprocidade obrigatória
- **Exceções:** Um usuário não pode enviar duplicatas de solicitações

### R004 - Registro de Partida
- **Descrição:** Partidas registram jogo, jogadores, resultado e data.
- **Condições:**
  - Obrigatórios: `gameObjectId`, lista de `players`, usuário criador
  - Opcional: `gameMoment` (descrição customizada)
  - Data padrão: `new Date()` se não informada
- **Exceções:** Sem jogadores, partida é inválida

### R005 - Comentários e Curtidas em Partidas
- **Descrição:** Usuários podem comentar e curtir partidas.
- **Condições:**
  - Comentários incluem uid, nome e foto do autor
  - Curtidas são rastreadas como array de usuários
- **Exceções:** Usuário não autenticado não pode comentar/curtir

---

## ☁️ 6. APIs Expostas

### REST Endpoints (Autenticação)

| Método | Rota | Descrição | Body |
|---|---|---|---|
| `POST` | `/login` | Login com email/senha | `{ user: { email, password } }` |
| `POST` | `/loginCredential` | Login com OAuth (Google/Facebook/Twitter) | `{ credential: { providerId, idToken, accessToken } }` |

**Resposta de sucesso:**
```json
{
  "user": {
    "displayName": "João Gabriel",
    "email": "joao@example.com",
    "uid": "abc123xyz",
    "photoURL": "https://...",
    "token": "eyJhbGciOiJSUzI1NiIs...",
    "refreshToken": "..."
  }
}
```

### GraphQL Endpoint

| Rota | Descrição |
|---|---|
| `POST /graphql` | Endpoint GraphQL (queries, mutations, introspection) |
| `GET /graphql` | GraphQL Playground (interface web) |

**Header obrigatório para queries autenticadas:**
```
Authorization: Bearer <idToken>
```

### Exemplos de Queries/Mutations

#### Buscar Usuário
```graphql
query {
  userInfo(uid: "abc123") {
    uid
    name
    photoURL
    numberOfMatches
  }
}
```

#### Registrar Partida
```graphql
mutation {
  createMatch(MatchInput: {
    gameObjectId: "12345"
    gameMoment: "Ganho de 2 pontos!"
    players: [
      { uid: "user1", name: "João", photoURL: "..." }
      { uid: "user2", name: "Maria", photoURL: "..." }
    ]
  }) {
    idDoc
    game { name }
    createdAt
  }
}
```

#### Buscar Partidas
```graphql
query {
  matches(uid: "abc123", textSearch: "Catan") {
    idDoc
    game { name }
    matchOwner { name }
    players { name }
    comments { comment }
    likes { name }
  }
}
```

---

## ⚠️ 7. Pontos de Atenção

### Riscos e Acoplamentos

| Risco | Impacto | Recomendação |
|---|---|---|
| **Acoplamento forte com Firebase** | Dificulta portabilidade; testes complicados | Considerar abstrair em camada de repositório |
| **Chamadas síncronas à API BoardGameAtlas** | Se API cair, partidas não podem ser registradas | Implementar circuit breaker ou cache local |
| **Sem validação de autenticação em resolvers** | Qualquer usuário pode criar/editar dados de outro | Adicionar verificação de `currentUser` em mutations sensíveis |
| **Sem rate limiting** | Abuso potencial de API (BoardGameAtlas, Firestore) | Implementar rate limiting em produção |
| **Sem paginação** | Query `matches` retorna TODOS os documentos | Adicionar `limit` e `offset` para escalabilidade |
| **Sem índices Firestore** | Queries com `.orderBy()` + `.where()` são lentas | Criar índices compostos no console Firebase |
| **Sem tratamento de erros robusto** | Erros de API retornam `null` sem mensagem | Implementar union types de erro em GraphQL |

### Complexidades Técnicas

- **Resolver `createMatch` é o mais complexo:** Orquestra Firebase Auth, BoardGameAtlas API, Firestore writes e cálculo de XP
- **Sem transações:** Múltiplos writes não são atômicos (risco de inconsistência)
- **Sem subscriptions GraphQL:** Real-time updates não são suportados atualmente

### Melhorias Futuras

- [ ] Implementar fragmentos GraphQL reutilizáveis
- [ ] Adicionar cache Apollo Client no backend
- [ ] Testes de integração com Firestore emulator
- [ ] Logging estruturado (Winston/Bunyan)
- [ ] Documentação Swagger/OpenAPI (se necessário APIs REST adicionais)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoramento e observabilidade (Sentry, DataDog, etc.)

---

## 📞 Contato e Recursos

- **Repositório:** [github.com/psico/ludo-app-backend](https://github.com/psico/ludo-app-backend)
- **Autor:** João Gabriel ([@psico](https://github.com/psico))
- **Frontend:** [ludo-app](../ludo-app/) (mesmo monorepo)
- **Documentação GraphQL:** `http://localhost:4000/graphql` (Playground)
- **Firebase:** [console.firebase.google.com](https://console.firebase.google.com)
- **BoardGameAtlas:** [boardgameatlas.com/api/docs](https://www.boardgameatlas.com/api/docs)

---

**Última atualização:** 7 de maio de 2026
