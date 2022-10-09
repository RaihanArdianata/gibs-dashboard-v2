import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';

const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
            createClient({
                url: 'ws://localhost:8000/graphql'
            })
        )
        : null;

const httpLink = new HttpLink({
    uri: `http://localhost:8000/graphql`,
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