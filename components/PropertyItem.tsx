import Image from 'next/image';
import React, { LegacyRef, forwardRef } from 'react';
import { iProperty } from '../utils/interface';

type PropertyItemType = {
  property: iProperty;
};

const PropertyItem = forwardRef(
  ({ property }: PropertyItemType, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div key={property.id} ref={ref}>
        <h2>{property.shortTitle}</h2>
        <h3>{property.projectName}</h3>
        <p>{property.shortDescription}</p>
        <p>Price: ${property.price}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Area: {property.area} sq ft</p>
        <div>
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
        </div>
      </div>
    );
  }
);

PropertyItem.displayName = 'PropertyItem';

export default PropertyItem;
