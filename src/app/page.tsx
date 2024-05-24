import PropertyList from '../../components/PropertyList';
import { GET_PROPERTIES_QUERY } from '../../graphql/queries';
import { iProperty } from '../../utils/interface';

type PropsType = {
  properties: iProperty[];
};

const getPropertiesData = async () => {
  // const { data } = await getClient().query({
  //   query: GET_PROPERTIES,
  //   variables: { offset: 0, limit: 3 },
  // });

  // return {
  //   properties: data.properties,
  // };

  const response = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    next: { revalidate: 5 },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `${GET_PROPERTIES_QUERY}
    `,
      variables: {
        offset: 0,
        limit: 3,
      },
    }),
  });

  const { data } = await response.json();
  return data;
};

export default async function Home() {
  const { properties }: PropsType = await getPropertiesData();
  return <main>{/* <PropertyList initialProperties={properties} /> */}</main>;
}
