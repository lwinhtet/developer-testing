'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { getClient } from '../graphql/getClient';

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         properties: offsetLimitPagination(),
//       },
//     },
//   },
// });

// export const client = new ApolloClient({
//   uri: 'http://localhost:3000/api/graphql',
//   cache,
// });

const client = getClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
