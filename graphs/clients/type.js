const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const {
  clinic,
} = require('../clinics/type');

const {
  getClinic
} = require('../clinics/request');

// const {
//   GraphQLDate,
//   GraphQLTime,
//   GraphQLDateTime
// } = require('graphql-iso-date');

const client = new GraphQLObjectType({
  name: 'client',
  fields: () => ({
    clinicId: {
      type: GraphQLString,
    },
    clinic: {
      type: clinic,
      resolve: (root) => getClinic(null, { ...root }),
    },
    clientId: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    birthday: {
      type: GraphQLString,
    },
    docCpf: {
      type: GraphQLString,
    },
    docRg: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    cellphone: {
      type: GraphQLString,
    },
    emergencyName: {
      type: GraphQLString,
    },
    emergencyPhone: {
      type: GraphQLString,
    },
    occupation: {
      type: GraphQLString,
    },
    cep: {
      type: GraphQLString,
    },
    streetName: {
      type: GraphQLString,
    },
    neighborhood: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    complement: {
      type: GraphQLString,
    },
    legalRepresentativeCpf: {
      type: GraphQLString,
    },
    legalRepresentativeRg: {
      type: GraphQLString,
    },
    legalRepresentativeName: {
      type: GraphQLString,
    },
    legalRepresentativePhone: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
  }),
});

const clients = new GraphQLObjectType({
  name: 'clients',
  fields: () => ({
    clients: {
      type: new GraphQLList(client),
    },
  }),
});

module.exports = {
  client,
  clients,
};
