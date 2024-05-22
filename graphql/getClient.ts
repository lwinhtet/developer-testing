import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server
  if (!client || typeof window === 'undefined') {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            properties: offsetLimitPagination(),
          },
        },
      },
    });

    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      }),
      cache,
    });
  }

  return client;
};
