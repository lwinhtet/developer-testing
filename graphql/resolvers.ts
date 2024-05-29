import { Context } from '@apollo/client';
import { Prisma } from '@prisma/client';

export const resolvers = {
  Query: {
    properties: async (_parent: any, args: any, context: Context) => {
      try {
        const {
          listingType,
          minPrice,
          maxPrice,
          bedrooms,
          minArea,
          maxArea,
          offset,
          limit,
        } = args;
        const filters: any = {};
        if (listingType) filters.listingType = listingType;
        if (minPrice) filters.price = { ...filters.price, gte: minPrice };
        if (maxPrice) filters.price = { ...filters.price, lte: maxPrice };
        if (bedrooms) filters.bedrooms = { ...filters.bedrooms, gte: bedrooms };
        if (minArea) filters.area = { ...filters.area, gte: minArea };
        if (maxArea) filters.area = { ...filters.area, lte: maxArea };

        return await context.prisma.property.findMany({
          skip: offset,
          take: limit,
          where: filters,
          include: { galleries: true },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientInitializationError) {
          console.error('Prisma Client Initialization Error:', error.message);
          throw new Error(
            '💥 Failed to initialize the database connection. Please check your database server and configuration.'
          );
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error('Database Table Error:', error.message);
          throw new Error(
            '💥 The `Property` table does not exist in the current database. Please ensure that the database is properly initialized and that the table exists. You might need to run `prisma migrate dev` to create the table.'
          );
        }

        console.error('Unexpected Error:', error);
        throw new Error('An unexpected error occurred.');
      }
    },
  },
};
