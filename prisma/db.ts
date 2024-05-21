import { PrismaClient } from '@prisma/client';

/**
 * In a Next.js application, during development, the server-side code can be re-executed frequently
 * due to hot-reloading. If you're not careful, this can lead to multiple instances of the Prisma Client
 * being created, which can cause issues such as exhausting the database connection pool.
 * To prevent this, developers often attach the Prisma Client instance to the global object in Node.js.
 * This ensures that only one instance is created and reused across multiple hot-reloads.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * this db.ts file we are going to use to access the Prisma instance before accessing any models and try
 * to insert update delete in the db
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') {
  // here we are caching
  globalForPrisma.prisma = prisma;
}
