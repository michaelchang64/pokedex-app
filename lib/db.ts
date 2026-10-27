import "server-only";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "@/generated/prisma/client";

// Read-only: the app never writes, and the file is rebuilt by
// ~/dev/learning_projects/get_pokemon_api. fileMustExist stops better-sqlite3
// from silently creating an empty database when the path is wrong.
function createClient() {
  const adapter = new PrismaBetterSqlite3({
    url: "file:./prisma/pokedex.db",
    readonly: true,
    fileMustExist: true,
  });
  return new PrismaClient({ adapter });
}

// `next dev` re-runs modules on every edit; keeping the client on globalThis
// stops each reload from opening another connection.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
