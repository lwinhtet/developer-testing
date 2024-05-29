'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { getClient } from '../graphql/getClient';

const client = getClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
