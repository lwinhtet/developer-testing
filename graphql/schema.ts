import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Property {
    id: Int!
    listingType: String
    projectName: String
    shortTitle: String
    price: Float
    bedrooms: Int
    area: Float
    shortDescription: String
    galleries: [Gallery]
  }

  type Gallery {
    id: Int!
    imageUrl: String
  }

  type Query {
    properties(
      listingType: String
      minPrice: Float
      maxPrice: Float
      bedrooms: Int
      minArea: Float
      maxArea: Float
      offset: Int
      limit: Int
    ): [Property!]!
  }
`;
