# LudoApp Backend – Agent Instructions

## Project Overview

**LudoApp Backend** is a GraphQL API server built with Express.js and TypeScript. It provides game match records, user profiles, social features (friends, followers), experience tracking, and integrates with the BoardGameAtlas API for game metadata.

- **Framework**: Express.js + express-graphql
- **Language**: TypeScript
- **API**: GraphQL on `/graphql` endpoint
- **Database**: Firebase Cloud Firestore
- **Auth**: Firebase Authentication + ID tokens
- **Features**: User profiles, experience system, friend graph, match tracking, comments, likes
- **Port**: 4000

---

## Quick Start

### Development Environment

```bash
npm install
npm run dev              # Dev server with hot-reload via nodemon
npm run dev:debug       # Debug mode with DevTools support
npm start               # Production: compile & run
npm test                # Run test suite
npm test:watch          # Tests in watch mode
```

**Required Files**:
- `firebaseConfig.json` – Firebase client config (see sample in sibling folder)
- `serviceAccountKey.json` – Firebase service account credentials

**Backend runs on**: `http://localhost:4000`
- GraphQL explorer: `http://localhost:4000/graphql`

---

## Architecture

### Modular GraphQL Structure

All modules follow the **schema + resolvers** pattern:

```
src/
├── base.ts              # Base Query, Mutation, scalar types
├── schema.ts            # Combined schema from all modules
├── resolvers.ts         # Combined resolvers from all modules
├── context.ts           # GraphQL context (db, firebase, etc)
├── index.ts             # Express server setup
│
├── userInfo/
│   ├── schema.ts        # UserInfo queries, mutations, types
│   └── resolvers.ts     # UserInfo resolver implementations
├── friend/
│   ├── schema.ts        # Friend queries, mutations
│   └── resolvers.ts     # Friend resolver implementations
├── game/
│   ├── schema.ts        # Game queries (BoardGameAtlas integration)
│   └── resolvers.ts     # Game resolver implementations
├── match/
│   ├── schema.ts        # Match queries, mutations (most complex)
│   └── resolvers.ts     # Match resolver implementations
├── comment/
│   ├── schema.ts        # Comment type (nested in Match)
│   └── resolvers.ts     # Comment resolver implementations
└── util/
    └── util.ts          # Helper functions (experience calc, data formatting)

test/
├── userInfo/resolvers.spec.ts
├── match/resolvers.spec.ts
└── friend/resolvers.spec.ts
```

### Schema & Resolvers Pattern

**Adding a new query/mutation**:
1. Add GraphQL type definition to module's `schema.ts`
2. Add resolver function to module's `resolvers.ts`
3. Export from both files
4. Automatically merged in [src/schema.ts](src/schema.ts) and [src/resolvers.ts](src/resolvers.ts)

**Example**:
```typescript
// userInfo/schema.ts
export const userInfoSchema = `
  extend type Query {
    userInfo(uid: String!): UserInfo
  }
`;

// userInfo/resolvers.ts
export const userInfoResolvers = {
  Query: {
    userInfo: async (_, { uid }, { db, firebase }) => {
      const doc = await db.collection('usersInfo').doc(uid).get();
      return doc.data();
    }
  }
};
```

---

## Database & Context

### Firestore Collections

- **`usersInfo`** – User profiles, experience, followers, friend lists
- **`matches`** – Match records with players, game info, comments, likes

### Context Object

All resolvers receive context with:
```typescript
{
  db: Firestore,              // Firebase Firestore client
  firebase: FirebaseApp,      // Firebase app instance
  currentUser: { uid, token } // Current authenticated user
}
```

**Access pattern**:
```typescript
const userData = await context.db.collection('usersInfo')
  .where('uid', '==', uid)
  .get();
```

---

## Core Modules

### 1. **UserInfo** – User Profiles & Experience

**Schema location**: [src/userInfo/schema.ts](src/userInfo/schema.ts)

**Key Queries**:
- `usersInfo(textSearch: String)` – Search users by name
- `userInfo(uid: String!)` – Get specific user profile
- `userExperienceInfo(uid: String!)` – User experience level details

**Key Mutations**:
- `createUserInfo(uid, name, photoURL)` – Create new user profile
- `addExperience(uid, points, context)` – Award experience points

**Experience System** ([src/util/util.ts](src/util/util.ts)):
- `addExperience()` – Log XP to user profile
- `calculateExperienceLevel()` – Compute level from total XP
- Levels determine rank/achievement status

### 2. **Friend** – Social Graph

**Schema location**: [src/friend/schema.ts](src/friend/schema.ts)

**Key Queries**:
- `friends` – Get current user's friends
- `friend(uid: String!)` – Get specific friend info

**Key Mutations**:
- `createFriend(followUid)` – Send friend request
- `follow(followUid)` – Follow user
- Bidirectional relationships in `usersInfo` collection

### 3. **Game** – Board Game Catalog

**Schema location**: [src/game/schema.ts](src/game/schema.ts)

**Key Queries**:
- `games(name: String)` – Search games by name
- `game(objectId: String!)` – Get game details

**External Integration**:
- Uses **BoardGameAtlas API** to fetch game metadata
- `axios` calls to BoardGameAtlas endpoints
- Resolver examples in [src/game/resolvers.ts](src/game/resolvers.ts)

### 4. **Match** – Core Feature: Match Recording ⭐

**Schema location**: [src/match/schema.ts](src/match/schema.ts)  
**Resolvers**: [src/match/resolvers.ts](src/match/resolvers.ts) *Most complex module*

**Key Queries**:
- `matches(uid: String, textSearch: String)` – Get user's matches or search all
- `match(idDoc: String!)` – Get specific match details

**Key Mutations**:
- `createMatch(MatchInput!)` – Create new match record
  - Stores match data in Firestore
  - Fetches game info from BoardGameAtlas API
  - Awards experience to all players
  - Returns match document
- `addComment(matchId, uid, comment)` – Add comment to match
- `likeIt(matchId)` – Like a match

**MatchInput type**:
```graphql
input MatchInput {
  players: [PlayerInput!]!
  winner: String!
  gameId: String!
  gameName: String!
  date: Date
  comments: [CommentInput]
}
```

**Data flow for `createMatch`**:
1. Validate input players
2. Query BoardGameAtlas for game metadata
3. Create match document in Firestore `matches` collection
4. For each player: award experience using `addExperience()`
5. Return created match

### 5. **Comment** – Match Discussions

**Schema location**: [src/comment/schema.ts](src/comment/schema.ts)

**Type**: Nested in Match (no separate collection)
- `uid` – User who commented
- `name` – User display name
- `comment` – Text content
- `photoURL` – User avatar

---

## Authentication Flow

**Endpoint**: `http://localhost:4000` (REST, not GraphQL)

1. **User login** (`POST /login` or `POST /loginCredential`):
   - Client sends email/password or OAuth token
   - Server validates via Firebase Admin SDK
   - Returns: `{ user: {...}, idToken: "..." }`
   - Client stores token

2. **Token verification** in resolvers:
   ```typescript
   const user = await firebase.auth().verifyIdToken(token);
   // user.uid is now available
   ```

3. **Current user context**:
   - Extracted from Authorization header
   - Passed to all resolver context objects
   - Use for permission checks

---

## Key Utilities

**File**: [src/util/util.ts](src/util/util.ts)

| Function | Purpose |
|----------|---------|
| `userDataFormat()` | Format user responses with token info |
| `chooseCredential()` | Select OAuth provider (Google, Facebook) |
| `addExperience()` | Award XP to user profile |
| `calculateExperienceLevel()` | Compute level/rank from total XP |

---

## Testing

- **Framework**: Jest with ts-jest
- **Test location**: [test/](test/) (mirrors src/ structure)
- **Examples**:
  - [test/userInfo/resolvers.spec.ts](test/userInfo/resolvers.spec.ts)
  - [test/match/resolvers.spec.ts](test/match/resolvers.spec.ts)
  - [test/friend/resolvers.spec.ts](test/friend/resolvers.spec.ts)

**Run tests**:
```bash
npm test          # Single run
npm test:watch    # Watch mode with coverage
```

**Test pattern**:
```typescript
describe('userInfo resolvers', () => {
  it('should fetch user info by uid', async () => {
    // Setup mock context with db, firebase
    // Call resolver
    // Assert result
  });
});
```

---

## Build & Deployment

### Development

```bash
npm run dev              # Watch TS files, auto-restart on change
npm run dev:debug       # Same with Node debugger enabled
```

### Production

```bash
npm run build            # Compile TypeScript to dist/
npm start                # Run compiled JavaScript
```

**Build steps** (from package.json):
1. `tsc` – Compile TypeScript to dist/
2. `yarn copy-files` – Copy non-TS files to dist/
3. `node dist/index.js` – Run compiled server

**Output**: `dist/` directory

---

## Configuration Files

| File | Purpose |
|------|---------|
| [tsconfig.json](tsconfig.json) | TypeScript configuration (ES2020, strict mode) |
| [nodemon.json](nodemon.json) | Dev server hot-reload config |
| [tslint.json](tslint.json) | Linting rules |
| [package.json](package.json) | Dependencies and scripts |

---

## Key Dependencies

| Package | Version | Role |
|---------|---------|------|
| `express` | ^4.17.3 | Web server |
| `express-graphql` | ^0.12.0 | GraphQL middleware |
| `graphql` | ^15.8.0 | GraphQL engine |
| `graphql-tools` | ^8.2.7 | Schema utilities |
| `firebase` | ^9.9.3 | Firebase client SDK |
| `firebase-admin` | ^11.0.1 | Firebase admin (token verification) |
| `typescript` | ^4.7.2 | Language |
| `ts-jest` | ^26.5.6 | TypeScript testing |
| `nodemon` | ^2.0.16 | Dev server |
| `axios` | ^0.27.2 | HTTP client (BoardGameAtlas API) |

---

## Common Development Tasks

### Adding a New GraphQL Query

1. Create or edit module's `schema.ts` (e.g., [src/userInfo/schema.ts](src/userInfo/schema.ts))
2. Add query type definition
3. Export as string or add to existing schema
4. In corresponding `resolvers.ts`, add Query resolver
5. Auto-merged in [src/schema.ts](src/schema.ts) and [src/resolvers.ts](src/resolvers.ts)

### Fetching Data from Firestore

```typescript
// Inside a resolver
const snapshot = await context.db
  .collection('usersInfo')
  .where('uid', '==', userId)
  .get();

snapshot.forEach(doc => {
  console.log(doc.data());
});
```

### Calling External APIs (e.g., BoardGameAtlas)

```typescript
// Example from game resolvers
const response = await axios.get(`https://www.boardgameatlas.com/api/search?name=${gameName}`);
return response.data.games[0];
```

### Testing a New Resolver

Create test file in [test/](test/) following Jest pattern:
```typescript
// test/myModule/resolvers.spec.ts
describe('My Resolver', () => {
  it('should do something', async () => {
    const context = {
      db: mockDb,
      firebase: mockFirebase
    };
    const result = await myResolver(null, args, context);
    expect(result).toBe(expectedValue);
  });
});
```

---

## Debugging Tips

- **GraphQL Playground**: Visit `http://localhost:4000/graphql` to explore schema and test queries
- **Debug mode**: `npm run dev:debug` for Node inspector
- **Console logs**: Add `console.log()` in resolvers, visible in terminal
- **TypeScript errors**: `npm run build` shows compile errors before runtime

---

## Known Patterns & Conventions

1. **Async/await**: All resolver database operations use async/await
2. **Firestore queries**: Use `.where()` for filtering, `.get()` to fetch
3. **Error handling**: Resolvers should throw errors (GraphQL catches them)
4. **Context**: Always use context.db and context.firebase, never create new SDK instances
5. **Types**: Always define GraphQL types, leverage TypeScript for safety
6. **Modular schema**: Each feature in its own folder with schema.ts + resolvers.ts

---

## Related Documentation

- [README.md](README.md) – Project setup and features
- [../ludo-app/AGENTS.md](../ludo-app/AGENTS.md) – Frontend architecture
- [package.json](package.json) – Full dependency list and scripts
- Firestore documentation: https://firebase.google.com/docs/firestore
- GraphQL documentation: https://graphql.org/learn/
- BoardGameAtlas API: https://www.boardgameatlas.com/api/docs
