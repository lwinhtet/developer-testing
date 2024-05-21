import { Context } from '@apollo/client';

export const resolvers = {
  Query: {
    properties: async (_parent: any, args: any, context: Context) => {
      const {
        listingType,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        minArea,
        maxArea,
        offset,
        limit,
      } = args;
      const filters: any = {};

      if (listingType) filters.listingType = listingType;
      if (minPrice) filters.price = { ...filters.price, gte: minPrice };
      if (maxPrice) filters.price = { ...filters.price, lte: maxPrice };
      if (minBedrooms)
        filters.bedrooms = { ...filters.bedrooms, gte: minBedrooms };
      if (maxBedrooms)
        filters.bedrooms = { ...filters.bedrooms, lte: maxBedrooms };
      if (minArea) filters.area = { ...filters.area, gte: minArea };
      if (maxArea) filters.area = { ...filters.area, lte: maxArea };

      return await context.prisma.property.findMany({
        skip: offset,
        take: limit,
        where: filters,
        include: { galleries: true },
      });
    },
  },
};
