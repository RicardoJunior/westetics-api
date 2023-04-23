const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

// const {
//   GraphQLDate,
//   GraphQLTime,
//   GraphQLDateTime
// } = require('graphql-iso-date');

const clinic = new GraphQLObjectType({
  name: 'clinic',
  fields: () => ({
    clinicId: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    docCnpj: {
      type: GraphQLString,
    },
    socialName: {
      type: GraphQLString,
    },
    fantasyName: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    legalRepresentativeId: {
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
    status: {
      type: GraphQLString,
    },
  }),
});

const clinics = new GraphQLObjectType({
  name: 'clinics',
  fields: () => ({
    clinics: {
      type: new GraphQLList(clinic),
    },
  }),
});

module.exports = {
  clinic,
  clinics,
};
