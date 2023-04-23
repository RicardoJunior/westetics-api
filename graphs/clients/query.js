const {
  GraphQLString,
} = require('graphql');

const request = require('./request');
const { client, clients } = require('./type');

module.exports.client = {
  type: client,
  args: {
    clinicId: {
      type: GraphQLString,
    },
    clientId: {
      type: GraphQLString,
    },
  },
  resolve: async (root, args, context) => request.getClient(root, args, context),
};

module.exports.clients = {
  type: clients,
  args: {
    clinicId: {
      type: GraphQLString,
    },
  },
  resolve: async (root, args, context) => request.getClients(root, args, context),
};
