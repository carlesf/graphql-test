import express from 'express';
import Schema from './data/schema';
import Resolvers from './data/resolvers';
// import Mocks from './data/mocks';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
});

// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {},
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `# Welcome to GraphiQL
query allBicingStations {
  getAllBicingStations {
    id
    streetName
    streetNumber
    bikes
  }
}
query findBicingStation_35  {
  getBicingStationById (id: 35) {
    id
    bikes
    nearbyStations {
      id
      coordinate {
        longitude
        latitude
      }
      bikes
      nearbyStations {
        id
        bikes
      }
    }
  }
}`,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `View GraphiQL at http://localhost:${GRAPHQL_PORT}/graphiql`
));