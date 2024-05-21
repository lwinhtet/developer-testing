'use client';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../graphql/queries';
import { Gallery, Property } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface iProperty extends Property {
  galleries: Gallery[];
}

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

const PAGE_SIZE = 10;

const PropertyList = () => {
  const [properties, setProperties] = useState<iProperty[]>([]);
  const { loading, error, data, fetchMore } = useQuery(GET_PROPERTIES, {
    variables: { offset: 0, limit: PAGE_SIZE },
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // const properties: iProperty[] = data?.properties;
  useEffect(() => {
    if (data) {
      setProperties(data?.properties);
    }
  }, [data]);

  useEffect(() => {
    if (inView && !loading && !error) {
      console.log(7777777);
      fetchMore({
        variables: {
          offset: properties.length,
          limit: PAGE_SIZE,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            properties: [...prev.properties, ...fetchMoreResult.properties],
          };
        },
      });
    }
  }, [inView, loading, error, fetchMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(properties.length);

  return (
    <main>
      <div>Hi</div>
      <div>
        {properties.map((property, index) => {
          if (properties.length === index + 1) {
            return (
              <div key={property.id} ref={ref}>
                <h2>{property.shortTitle}</h2>
                <h3>{property.projectName}</h3>
                <p>{property.shortDescription}</p>
                <p>Price: ${property.price}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Area: {property.area} sq ft</p>
                {/* <div>
              {property.galleries.map((gallery) => (
                <Image
                  key={gallery.id}
                  src={gallery.imageUrl}
                  alt={`Image ${gallery.id}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{
                    width: '200px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                  priority
                />
              ))}
            </div> */}
              </div>
            );
          } else {
            return (
              <div key={property.id}>
                <h2>{property.shortTitle}</h2>
                <h3>{property.projectName}</h3>
                <p>{property.shortDescription}</p>
                <p>Price: ${property.price}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Area: {property.area} sq ft</p>
                {/* <div>
              {property.galleries.map((gallery) => (
                <Image
                  key={gallery.id}
                  src={gallery.imageUrl}
                  alt={`Image ${gallery.id}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{
                    width: '200px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                  priority
                />
              ))}
            </div> */}
              </div>
            );
          }
        })}
        {/* <div ref={ref} style={{ height: '1px', width: '100%' }} /> */}
      </div>
    </main>
  );
};

export default PropertyList;
