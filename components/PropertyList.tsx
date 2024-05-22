'use client';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../graphql/queries';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { iProperty } from '../utils/interface';
import PropertyItem from './PropertyItem';

type PropsType = {
  initialProperties: iProperty[];
};

const PAGE_SIZE = 2;

const PropertyList = ({ initialProperties }: PropsType) => {
  const { loading, error, data, fetchMore } = useQuery(GET_PROPERTIES, {
    variables: { offset: initialProperties.length, limit: PAGE_SIZE },
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  let properties: iProperty[] = [
    ...(initialProperties || []),
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

  if (loading && !properties.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(`data count ${properties?.length}`);

  return (
    <div>
      {properties.map((property, index) => {
        return (
          <PropertyItem
            property={property}
            key={index}
            ref={properties.length === index + 1 ? ref : null}
          />
        );
      })}
    </div>
  );
};

export default PropertyList;
