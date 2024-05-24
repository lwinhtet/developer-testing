import { ListingType, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { parseArgs } from 'node:util';

const options = {
  count: { type: 'string' },
} as const;

const DEFAULT_COUNT = '10000';

const prisma = new PrismaClient();

async function main() {
  await prisma.gallery.deleteMany({});

  await prisma.property.deleteMany({});

  console.log('💥  All records have been deleted.');

  const {
    values: { count = DEFAULT_COUNT },
  } = parseArgs({ options });

  const countValue = parseInt(count, 10);

  const propertiesData = Array.from({ length: countValue }).map(() => ({
    listingType: faker.helpers.arrayElement([
      ListingType.SALE,
      ListingType.RENT,
    ]),
    projectName: faker.company.buzzPhrase(),
    shortTitle: faker.lorem.words(3),
    price: faker.number.int({ min: 50000, max: 1500000 }),
    bedrooms: faker.number.int({ min: 1, max: 5 }),
    area: faker.number.int({ min: 500, max: 5000 }),
    shortDescription: faker.lorem.sentence({ min: 15, max: 18 }),
    galleries: {
      create: Array.from({ length: 5 }).map(() => ({
        imageUrl: faker.image.urlLoremFlickr({ category: 'city' }),
      })),
    },
  }));

  for (const property of propertiesData) {
    await prisma.property.create({
      data: {
        listingType: property.listingType,
        projectName: property.projectName,
        shortTitle: property.shortTitle,
        price: property.price,
        bedrooms: property.bedrooms,
        area: property.area,
        shortDescription: property.shortDescription,
        galleries: {
          create: property.galleries.create.map((gallery) => ({
            imageUrl: gallery.imageUrl,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    console.log('🟢  Records have been created');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// npx prisma migrate dev
// npx prisma migrate reset
// npx prisma db seed
// npx prisma db seed -- --count 10000
