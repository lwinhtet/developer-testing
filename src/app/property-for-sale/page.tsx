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
  title: 'Property For Sale',
  description:
    'Find properties for sale with our wide selection. Browse now for the best deals!"',
};

type PropsType = {
  properties: iProperty[];
};

const PropertySale = async () => {
  const data: PropsType = await getPropertiesData(ListingType.SALE);
  const properties = data?.properties || [];

  return (
    <Container>
      <Box my={4}>
        <Filter listingType={ListingType.SALE} />
      </Box>
      <Suspense fallback={<CenteredText text="Loading..." />}>
        <PropertyList
          key={ListingType.SALE}
          initialProperties={properties}
          listingType={ListingType.SALE}
        />
      </Suspense>
    </Container>
  );
};

export default PropertySale;
