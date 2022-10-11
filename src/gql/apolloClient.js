import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';
console.log('====================================');
console.log(process.env.NEXT_PUBLIC_API_HOST);
console.log('====================================');
const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
            createClient({
                url: process.env.NEXT_PUBLIC_WS_API_HOST || 'ws://localhost:8000/graphql'
            })
        )
        : null;

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_HOST || `http://localhost:8000/graphql`,
});

const splitLink = typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    ) : httpLink;

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;