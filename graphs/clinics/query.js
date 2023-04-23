const {
  GraphQLString,
} = require('graphql');

const request = require('./request');
const { clinic, clinics } = require('./type');

module.exports.clinic = {
  type: clinic,
  args: {
    clinicId: {
      type: GraphQLString,
    },
    clinicId: {
      type: GraphQLString,
    },
  },
  resolve: async (root, args, context) => request.getClinic(root, args, context),
};

module.exports.clinics = {
  type: clinics,
  args: {
    clinicId: {
      type: GraphQLString,
    },
  },
  resolve: async (root, args, context) => request.getClinics(root, args, context),
};
