import { gql } from '@apollo/client';

export const GET_PROPERTIES_QUERY = `
query GetProperties(
  $listingType: String
  $minPrice: Float
  $maxPrice: Float
  $bedrooms: Int
  $minArea: Float
  $maxArea: Float
  $offset: Int
  $limit: Int
) {
  properties(
    listingType: $listingType
    minPrice: $minPrice
    maxPrice: $maxPrice
    bedrooms: $bedrooms
    minArea: $minArea
    maxArea: $maxArea
    offset: $offset
    limit: $limit
  ) {
    id
    listingType
    projectName
    shortTitle
    price
    bedrooms
    area
    shortDescription
    galleries {
      id
      imageUrl
    }
  }
}
`;

export const GET_PROPERTIES = gql`
  ${GET_PROPERTIES_QUERY}
`;
