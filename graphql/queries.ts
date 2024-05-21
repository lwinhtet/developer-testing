import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
  query GetProperties(
    $listingType: String
    $minPrice: Float
    $maxPrice: Float
    $minBedrooms: Int
    $maxBedrooms: Int
    $minArea: Float
    $maxArea: Float
    $offset: Int
    $limit: Int
  ) {
    properties(
      listingType: $listingType
      minPrice: $minPrice
      maxPrice: $maxPrice
      minBedrooms: $minBedrooms
      maxBedrooms: $maxBedrooms
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
