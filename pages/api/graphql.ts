/**
 * we will redirect the calls, requests coming from the Nextjs client to Apollo GraphQL Server
 */

/**
 * @as-integrations/next will provide a handler or a hook between Nextjs and Apollo Server.
 * How API route send all the reqs to the graphical server that is being done by this handler
 */

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { prisma } from '../../prisma/db';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';

export type Context = {
  prisma: PrismaClient;
};

// define typedef and resolvers
const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});
