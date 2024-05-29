'use client';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../graphql/queries';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { iProperty } from '../utils/interface';
import PropertyItem from './PropertyItem';
import { ListingType } from '@prisma/client';
import useFilter from '../hooks/useFilter';
import { Box, Container } from '@mui/material';
import Filter from './Filter';
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
  const { filters, setFilter, resetFilters, isFiltered } = useFilter();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [hasFetched, setHasFetched] = useState(false);

  const variables = useMemo(() => {
    return {
      listingType,
      offset: 0,
      limit: PAGE_SIZE,
      ...Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== '')
      ),
    };
  }, [listingType, filters]);

  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_PROPERTIES,
    {
      variables,
    }
  );

  useEffect(() => {
    if (hasFetched) {
      refetch(variables);
    } else {
      setHasFetched(true);
    }
  }, [hasFetched, listingType, refetch, variables]);

  useEffect(() => {
    if (inView && !loading && !error) {
      const variables = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== '')
      );

      fetchMore({
        variables: {
          listingType,
          offset: properties.length,
          limit: PAGE_SIZE,
          ...variables,
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

  if (loading && !properties?.length) return <CenteredText text="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Box my={4}>
        <Filter
          filters={filters}
          setFilter={setFilter}
          resetFilters={resetFilters}
          listingType={listingType}
        />
      </Box>
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
    </Container>
  );
};

export default PropertyList;
