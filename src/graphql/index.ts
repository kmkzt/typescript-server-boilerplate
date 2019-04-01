import * as express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

// docs
// https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express#express

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}
const server = new ApolloServer({ typeDefs, resolvers })
// server.applyMiddleware({ app: graphql })

export default server
