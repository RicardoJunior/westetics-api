'use strict';

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const clientsMutation = require('./clients/mutation');
const { client, clients } = require('./clients/query');

const clinicsMutation = require('./clinics/mutation');
const { clinic, clinics } = require('./clinics/query');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      client,
      clients,
      clinic,
      clinics,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...clientsMutation,
      ...clinicsMutation,
    },
  }),
});
