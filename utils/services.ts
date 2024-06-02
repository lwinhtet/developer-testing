import { ListingType } from '@prisma/client';
import { GET_PROPERTIES_QUERY } from '../graphql/queries';
import { PAGE_SIZE } from './constants';

export const getPropertiesData = async (listingType: ListingType) => {
  try {
    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      next: { revalidate: 5 },
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `${GET_PROPERTIES_QUERY}`,
        variables: {
          listingType: listingType,
          offset: 0,
          limit: PAGE_SIZE,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('💥 Failed to fetch data');
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
