import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/lib/generated/prisma/client";

/**
 * One Prisma Client for the whole app.
 *
 * Next.js reloads modules on every change in development, so the instance is
 * cached on `globalThis` to stop a new client (and a new connection pool) being
 * created on each reload.
 *
 * Two kinds of connection string are supported, picked by their scheme:
 *
 *   postgres://…         a direct TCP connection, used through the pg adapter.
 *                        This is what the local `prisma dev` server needs, and
 *                        what Prisma Postgres calls its "direct TCP" URL.
 *   prisma+postgres://…  the HTTP connection string, handled by Prisma itself.
 *                        Fine against hosted Prisma Postgres, but the local
 *                        `prisma dev` server rejects it.
 *
 * `DIRECT_DATABASE_URL` wins when it is set, so `DATABASE_URL` can stay as the
 * `prisma+postgres://` URL that the Prisma CLI uses for migrations.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not set — add it to .env");
  }

  if (url.startsWith("prisma://") || url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url });
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
