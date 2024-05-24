'use client';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../graphql/queries';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { iProperty } from '../utils/interface';
import PropertyItem from './PropertyItem';
import { ListingType } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useFilter, { FilterState } from '../hooks/useFilter';
import { Box, Container } from '@mui/material';
import Filter from './Filter';
import { PAGE_SIZE } from '../utils/helper';

type PropsType = {
  initialProperties: iProperty[];
  listingType?: string;
};

type filtersType = {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minArea?: number;
  maxArea?: number;
};

const PropertyList = ({
  initialProperties,
  listingType = ListingType.SALE,
}: PropsType) => {
  const [initialPropertiesLength] = useState<number>(
    initialProperties.length || 0
  );
  // const [filters, setFilters] = useState<filtersType>({});
  const { filters, setFilter, resetFilters, isFiltered } = useFilter();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const variables: { [key: string]: any } = {
    listingType,
    offset:
      searchParams && searchParams?.size > 0 ? 0 : initialProperties.length,
    limit: PAGE_SIZE,
  };

  const queryMinPrice = searchParams?.get('minPrice');
  if (queryMinPrice) {
    variables.minPrice = parseInt(queryMinPrice);
  }

  const queryMaxPrice = searchParams?.get('maxPrice');
  if (queryMaxPrice) {
    variables.maxPrice = parseInt(queryMaxPrice);
  }

  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_PROPERTIES,
    {
      variables,
    }
  );

  let properties: iProperty[] = [
    ...(searchParams && searchParams?.size > 0 ? [] : initialProperties),
    ...(data?.properties || []),
  ];

  useEffect(() => {
    if (inView && !loading && !error) {
      fetchMore({
        variables: {
          offset: properties.length,
          limit: PAGE_SIZE,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loading, error, fetchMore]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  // const onChangePriceRange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   const newFilters = { ...filters, [name]: value };
  //   // setFilters(newFilters);
  //   // router.push(pathname + '?' + createQueryString(name, value));
  // };

  // const handleSelectChange = (value: string | number) => {
  //   const newFilters = { ...filters, bedrooms: value as number };
  //   setFilters(newFilters);
  // };

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams?.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  // const buildQueryString = (params: FilterState): string => {
  //   const queryEntries = Object.entries(params)
  //     .filter(([key, value]) => value !== '' && value !== 0)
  //     .map(
  //       ([key, value]) =>
  //         `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  //     );

  //   return queryEntries.length > 0 ? `?${queryEntries.join('&')}` : '';
  // };

  if (loading && !properties.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(`data count ${properties?.length}`, properties);

  return (
    <Container>
      <Box my={4}>
        <Filter
          filters={filters}
          setFilter={setFilter}
          resetFilters={resetFilters}
          initialPropertiesLength={initialPropertiesLength}
          refetch={refetch}
          isFiltered={isFiltered}
        />

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
      </Box>
    </Container>
  );

  // return (
  //   <div>
  //     <div>
  //       <div>
  //         <input
  //           type="number"
  //           name="minPrice"
  //           value={filters.minPrice || ''}
  //           onChange={onChangePriceRange}
  //           placeholder="Enter text"
  //         />
  //         <p>Typed value: {filters.minPrice}</p>
  //         <input
  //           type="number"
  //           name="maxPrice"
  //           value={filters.maxPrice || ''}
  //           onChange={onChangePriceRange}
  //           placeholder="Enter text"
  //         />
  //         <p>Typed value: {filters.maxPrice}</p>
  //       </div>
  //     </div>
  //     <div>
  //       {properties.map((property, index) => {
  //         return (
  //           <PropertyItem
  //             property={property}
  //             key={property.id}
  //             ref={properties.length === index + 1 ? ref : null}
  //           />
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
};

export default PropertyList;
