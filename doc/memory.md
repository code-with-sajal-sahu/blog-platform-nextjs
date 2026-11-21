# Prisma ORM + Auth.js Setup Notes

This document contains my implementation notes for integrating Prisma ORM with MongoDB in a Next.js application, including Google OAuth authentication through Auth.js.

There are two approaches documented here:

1. Prisma ORM 8 + MongoDB without the official Auth.js Prisma Adapter.
2. Prisma 6 + MongoDB with the official Auth.js Prisma Adapter.

**Important compatibility note:** The official `@auth/prisma-adapter` expects the traditional Prisma Client API. It cannot be directly connected to the new Prisma ORM 8 MongoDB runtime.

---

# Part 1: Prisma ORM 8 + MongoDB

## 1. Install and initialize Prisma

Run this command from the root directory of the Next.js project:

```bash
npx prisma@latest orm init --yes --target mongodb --authoring psl --write-env
```

This command:

- Installs Prisma ORM 8 dependencies.
- Creates `prisma.config.ts`.
- Creates `src/prisma/contract.prisma`.
- Creates `src/prisma/db.ts`.
- Configures the database connection.

**Prerequisites:** Check the Prisma 8 supported Node.js versions before installation. Prisma ORM 8 is currently documented as a release candidate.

## 2. Configure environment variables

Update `.env`:

```env
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/my_database"

AUTH_SECRET="your-generated-secret"

AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

Use the following command to generate a secure Auth.js secret:

```bash
npx auth secret
```

Never commit `.env` or actual database credentials to GitHub.

## 3. Understand initial database initialization

**For a new, empty MongoDB database:**

First generate the contract:

```bash
npx prisma contract emit
```

Then initialize the database:

```bash
npx prisma db init
```

This initializes the database based on the Prisma contract.

**For an existing database with collections and documents:**

Do not blindly run `db init`.

Instead, preview the changes:

```bash
npx prisma db update --db "$DATABASE_URL" --dry-run
```

Then apply the update:

```bash
npx prisma db update --db "$DATABASE_URL" --advance-ref db
```

Review the proposed changes carefully before applying them to an important database.

## 4. Model changes and migrations

Whenever you modify `src/prisma/contract.prisma`, follow this workflow:

```bash
# Generate updated contract artifacts
npx prisma contract emit

# Create migration plan
npx prisma migration plan --name your_change_name

# Apply migration
npx prisma db migrate --advance-ref db

# Verify database schema
npx prisma db verify --db "$DATABASE_URL"
```

Examples of schema changes:

- Adding a new model.
- Adding or removing fields.
- Modifying indexes.
- Changing relationships.
- Modifying database validators.

**Important:** `contract emit` generates the contract artifacts. `migration plan` creates a migration to review, and `db migrate` applies it.

For local experiments where migration history is not required, `db update` can also be used as a direct schema synchronization operation.

## 5. Using Prisma 8 for authentication

The official Auth.js Prisma Adapter currently expects Prisma Client, which is not the client interface exposed by Prisma ORM 8.

Therefore, use Auth.js with JWT sessions and implement user persistence using Prisma 8 queries.

Recommended architecture:

- Auth.js handles Google OAuth.
- Prisma 8 handles user persistence.
- MongoDB stores user information.
- JWT handles session management.
- No official Prisma Adapter is used.

This approach requires custom user persistence logic in Auth.js callbacks.

---

# Part 2: Prisma 6 + Auth.js Prisma Adapter

This is the alternative when you want to use the official Auth.js Prisma Adapter.

## 1. Install dependencies

```bash
npm install prisma@6 --save-dev
npm install @prisma/client@6

npm install next-auth@beta @auth/prisma-adapter
```

This setup uses the Auth.js v5 configuration API.

## 2. Configure environment variables

Create or update `.env`:

```env
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/my_database"

AUTH_SECRET="your-generated-secret"

AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

Generate the Auth.js secret:

```bash
npx auth secret
```

Google OAuth configuration:

1. Open Google Cloud Console.
2. Create OAuth credentials.
3. Configure the authorized redirect URI.

Local development callback URL:

```text
http://localhost:3000/api/auth/callback/google
```

## 3. Configure Prisma schema

Create `prisma/schema.prisma` in the root directory.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Auth.js Models

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?

  accounts Account[]
  sessions Session[]

  // Application-specific fields
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String
  expires    DateTime

  @@unique([identifier, token])
}
```

The models are responsible for:

- User: Stores registered users.
- Account: Stores linked OAuth provider accounts.
- Session: Stores database sessions.
- VerificationToken: Stores verification tokens.

## 4. Push schema to MongoDB

For Prisma 6 with MongoDB:

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

MongoDB does not use Prisma Migrate's SQL migration workflow.

Whenever you modify the schema, run `db push` again.

## 5. Create Prisma singleton

Create `lib/prisma.ts` in the root directory:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Why?**

Prevents multiple Prisma Client instances from being created during Next.js development hot reloads.

## 6. Configure Auth.js

Create `auth.ts` in the root directory:

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "database",
  },
});
```

**Why database sessions?**

Auth.js stores session records in MongoDB through the Prisma Adapter instead of relying exclusively on JWT sessions.

## 7. Create authentication API route

Create:

`src/app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/auth";

export const {
  GET,
  POST,
} = handlers;
```

## 8. Access authenticated session

On the server:

```typescript
import { auth } from "@/auth";

const session = await auth();

console.log(session?.user);
```

Protect a page:

```typescript
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
```

---

# Part 3: Command Reference

## Prisma ORM 8

| Situation | Command |
|---|---|
| Initialize Prisma | `npx prisma@latest orm init --yes --target mongodb --authoring psl --write-env` |
| Generate contract | `npx prisma contract emit` |
| Initialize empty database | `npx prisma db init` |
| Update existing database | `npx prisma db update --db "$DATABASE_URL"` |
| Create migration plan | `npx prisma migration plan --name change_name` |
| Apply migration | `npx prisma db migrate --advance-ref db` |
| Verify database | `npx prisma db verify --db "$DATABASE_URL"` |

## Prisma 6

| Situation | Command |
|---|---|
| Initial schema setup | `npx prisma db push` |
| After modifying models | `npx prisma db push` |
| Generate Prisma Client | `npx prisma generate` |
| Open database GUI | `npx prisma studio` |
| Check Prisma version | `npx prisma -v` |

---

# Part 4: GitHub Commit Guidelines

## Files to commit

| File or folder | Commit? |
|---|---|
| `prisma/schema.prisma` (Prisma 6) | Yes |
| `src/prisma/contract.prisma` (Prisma 8) | Yes |
| `src/prisma/contract.json` | Yes |
| `src/prisma/contract.d.ts` | Yes |
| `prisma.config.ts` | Yes |
| `migrations/` | Yes |
| `package.json` | Yes |
| `package-lock.json` | Yes |
| `.env` | No |
| `node_modules/` | No |

Generated contract artifacts must be committed because the Prisma 8 application imports them.

Migration files must also be committed so the schema history can be reproduced across environments.

---

# Part 5: Important Learnings

1. Prisma 8 uses `contract.prisma` instead of the traditional `schema.prisma` workflow.
2. `contract emit` replaces the traditional Prisma Client generation workflow.
3. `db init` is for initializing an empty database, not for every model change.
4. Existing populated databases may require `db update`.
5. Prisma 8 uses contract-driven migrations.
6. Prisma 6 MongoDB uses `db push`, not SQL migrations.
7. Auth.js Prisma Adapter expects the traditional Prisma Client API.
8. JWT sessions do not require a database session adapter.
9. Always verify package versions and official documentation before mixing setup instructions from different major versions.
10. Never commit database credentials, OAuth secrets, or `.env` files.

---

## Official Documentation

### Prisma
- https://www.prisma.io/docs/prisma-orm/quickstart/existing-app/mongodb
- https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb
- https://www.prisma.io/docs/orm/v6/overview/databases/mongodb

### Auth.js
- https://authjs.dev/getting-started/adapters/prisma
- https://authjs.dev/getting-started/providers/google
- https://authjs.dev/getting-started/session-management

**Last reviewed:** November 2026

**Note:** Commands, package versions, and integration compatibility can change. Recheck the official documentation before using these notes in a new project.
