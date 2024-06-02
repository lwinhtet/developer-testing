import { iProperty } from '../../../utils/interface';
import PropertyList from '../../../components/PropertyList';
import { ListingType } from '@prisma/client';
import { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import Filter from '../../../components/Filter';
import { getPropertiesData } from '../../../utils/services';
import CenteredText from '../../../components/CenteredText';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property For Rent',
  description:
    'Find properties for rent with our wide selection. Browse now for the best deals!"',
};

type PropsType = {
  properties: iProperty[];
};

const PropertyRent = async () => {
  const data: PropsType = await getPropertiesData(ListingType.RENT);
  const properties = data?.properties || [];

  return (
    <Container>
      <Box my={4}>
        <Filter listingType={ListingType.RENT} />
      </Box>
      <Suspense fallback={<CenteredText text="Loading..." />}>
        <PropertyList
          key={ListingType.RENT}
          initialProperties={properties}
          listingType={ListingType.RENT}
        />
      </Suspense>
    </Container>
  );
};

export default PropertyRent;
