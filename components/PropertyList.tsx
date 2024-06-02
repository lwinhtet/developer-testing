'use client';

import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../graphql/queries';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { iProperty } from '../utils/interface';
import PropertyItem from './PropertyItem';
import { ListingType } from '@prisma/client';
import useFilter from '../hooks/useFilter';
import { Box } from '@mui/material';
import { PAGE_SIZE } from '../utils/constants';
import CenteredText from './CenteredText';

type PropsType = {
  initialProperties: iProperty[];
  listingType?: ListingType;
};

const PropertyList = ({
  initialProperties,
  listingType = ListingType.SALE,
}: PropsType) => {
  const { filters, isFiltered } = useFilter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const filteredVariables = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== '')
    );
  }, [filters]);

  const { loading, error, data, fetchMore } = useQuery(GET_PROPERTIES, {
    variables: {
      listingType,
      offset: 0,
      limit: PAGE_SIZE,
      ...filteredVariables,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (inView && !loading && !error) {
      fetchMore({
        variables: {
          listingType,
          offset: properties.length,
          limit: PAGE_SIZE,
          ...filteredVariables,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loading, error, fetchMore]);

  let properties: iProperty[] = [];
  if (loading && isFiltered()) {
    return <CenteredText text="Loading..." />;
  } else if (loading && !isFiltered()) {
    properties = initialProperties;
  } else {
    properties = data?.properties;
  }

  // if (loading && !properties?.length) return <CenteredText text="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {!loading && (!properties || properties.length === 0) ? (
        <CenteredText text="No Property Found!!!" />
      ) : (
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {properties.map((property, index) => {
            return (
              <PropertyItem
                property={property}
                key={property.id}
                ref={properties.length === index + 1 ? ref : null}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default PropertyList;
