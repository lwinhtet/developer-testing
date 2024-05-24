import React from 'react';
import { GET_PROPERTIES_QUERY } from '../../../graphql/queries';
import { iProperty } from '../../../utils/interface';
import PropertyList from '../../../components/PropertyList';
import { ListingType } from '@prisma/client';
import { Suspense } from 'react';

type PropsType = {
  properties: iProperty[];
};

const getPropertiesData = async () => {
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
        limit: 3,
      },
    }),
  });

  const { data } = await response.json();

  return data;
};

const PropertyRent = async () => {
  const { properties }: PropsType = await getPropertiesData();
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
