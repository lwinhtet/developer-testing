import React from 'react';
import { GET_PROPERTIES_QUERY } from '../../../graphql/queries';
import { iProperty } from '../../../utils/interface';
import PropertyList from '../../../components/PropertyList';
import { ListingType } from '@prisma/client';
import { Suspense } from 'react';
import { PAGE_SIZE } from '../../../utils/constants';

type PropsType = {
  properties: iProperty[];
};

const getRentPropertiesData = async () => {
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
          listingType: ListingType.RENT,
          offset: 0,
          limit: PAGE_SIZE,
        },
      }),
    });
    console.log(4321);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const PropertyRent = async () => {
  const data: PropsType = await getRentPropertiesData();
  const properties = data?.properties || [];
  return (
    <main>
      <Suspense>
        <PropertyList
          initialProperties={properties}
          listingType={ListingType.RENT}
        />
      </Suspense>
    </main>
  );
};

export default PropertyRent;
