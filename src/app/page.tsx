import PropertyList from '../../components/PropertyList';
import { GET_PROPERTIES } from '../../graphql/queries';
import { iProperty } from '../../utils/interface';
import { getClient } from '../../graphql/getClient';

type PropsType = {
  properties: iProperty[];
};

const getPropertiesData = async () => {
  const { data } = await getClient().query({
    query: GET_PROPERTIES,
    variables: { offset: 0, limit: 3 },
  });

  return {
    properties: data.properties,
  };

  // const response = await fetch('http://localhost:3000/api/graphql', {
  //   method: 'POST',
  //   next: { revalidate: 5 },
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: `
  //     query GetProperties($offset: Int!, $limit: Int!) {
  //       properties(offset: $offset, limit: $limit) {
  //         id
  //         listingType
  //         projectName
  //         shortTitle
  //         price
  //         bedrooms
  //         area
  //         shortDescription
  //         galleries {
  //           id
  //           imageUrl
  //         }
  //       }
  //     }
  //   `,
  //     variables: {
  //       offset: 0,
  //       limit: 3,
  //     },
  //   }),
  // });

  // const { data } = await response.json();
  // return data;
};

export default async function Home() {
  const { properties }: PropsType = await getPropertiesData();
  return (
    <main>
      <PropertyList initialProperties={properties} />
    </main>
  );
}
