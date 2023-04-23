const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} = require('graphql');

const request = require('./request');

const mutation = {
  addClinic: {
    name: 'addClinic',
    type: new GraphQLObjectType({
      name: 'addClinicResult',
      fields: {
        success: {
          name: 'success',
          type: GraphQLBoolean,
        },
        message: {
          name: 'message',
          type: GraphQLString,
        },
      },
    }),
    args: {
      clinicId: {
        name: 'clinicId',
        type: GraphQLString,
      },
      clientId: {
        name: 'clientId',
        type: GraphQLString,
      },
      name: {
        name: 'name',
        type: GraphQLString,
      },
      birthday: {
        name: 'birthday',
        type: GraphQLString,
      },
      docCpf: {
        name: 'docCpf',
        type: GraphQLString,
      },
      docRg: {
        name: 'docRg',
        type: GraphQLString,
      },
      email: {
        name: 'email',
        type: GraphQLString,
      },
      phone: {
        name: 'phone',
        type: GraphQLString,
      },
      cellphone: {
        name: 'cellphone',
        type: GraphQLString,
      },
      emergencyName: {
        name: 'emergencyName',
        type: GraphQLString,
      },
      emergencyPhone: {
        name: 'emergencyPhone',
        type: GraphQLString,
      },
      occupation: {
        name: 'occupation',
        type: GraphQLString,
      },
      cep: {
        name: 'cep',
        type: GraphQLString,
      },
      streetName: {
        name: 'streetName',
        type: GraphQLString,
      },
      neighborhood: {
        name: 'neighborhood',
        type: GraphQLString,
      },
      city: {
        name: 'city',
        type: GraphQLString,
      },
      state: {
        name: 'state',
        type: GraphQLString,
      },
      complement: {
        name: 'complement',
        type: GraphQLString,
      },
      legalRepresentativeCpf: {
        name: 'legalRepresentativeCpf',
        type: GraphQLString,
      },
      legalRepresentativeRg: {
        name: 'legalRepresentativeRg',
        type: GraphQLString,
      },
      legalRepresentativeName: {
        name: 'legalRepresentativeName',
        type: GraphQLString,
      },
      legalRepresentativePhone: {
        name: 'legalRepresentativePhone',
        type: GraphQLString,
      },
    },
    resolve: async (root, args, context) => request.addClinic(root, args, context),
  },
  updateClinic: {
    name: 'updateClinic',
    type: new GraphQLObjectType({
      name: 'updateClinicResult',
      fields: {
        success: {
          name: 'success',
          type: GraphQLBoolean,
        },
        message: {
          name: 'message',
          type: GraphQLString,
        },
      },
    }),
    args: {
      clinicId: {
        name: 'clinicId',
        type: GraphQLString,
      },
      clientId: {
        name: 'clientId',
        type: GraphQLString,
      },
      name: {
        name: 'name',
        type: GraphQLString,
      },
      birthday: {
        name: 'birthday',
        type: GraphQLString,
      },
      docCpf: {
        name: 'docCpf',
        type: GraphQLString,
      },
      docRg: {
        name: 'docRg',
        type: GraphQLString,
      },
      email: {
        name: 'email',
        type: GraphQLString,
      },
      phone: {
        name: 'phone',
        type: GraphQLString,
      },
      cellphone: {
        name: 'cellphone',
        type: GraphQLString,
      },
      emergencyName: {
        name: 'emergencyName',
        type: GraphQLString,
      },
      emergencyPhone: {
        name: 'emergencyPhone',
        type: GraphQLString,
      },
      occupation: {
        name: 'occupation',
        type: GraphQLString,
      },
      cep: {
        name: 'cep',
        type: GraphQLString,
      },
      streetName: {
        name: 'streetName',
        type: GraphQLString,
      },
      neighborhood: {
        name: 'neighborhood',
        type: GraphQLString,
      },
      city: {
        name: 'city',
        type: GraphQLString,
      },
      state: {
        name: 'state',
        type: GraphQLString,
      },
      complement: {
        name: 'complement',
        type: GraphQLString,
      },
      legalRepresentativeCpf: {
        name: 'legalRepresentativeCpf',
        type: GraphQLString,
      },
      legalRepresentativeRg: {
        name: 'legalRepresentativeRg',
        type: GraphQLString,
      },
      legalRepresentativeName: {
        name: 'legalRepresentativeName',
        type: GraphQLString,
      },
      legalRepresentativePhone: {
        name: 'legalRepresentativePhone',
        type: GraphQLString,
      },
    },
    resolve: async (root, args, context) => request.updateClinic(root, args, context),
  },
  deleteClinic: {
    name: 'deleteClinic',
    type: new GraphQLObjectType({
      name: 'deleteClinicResult',
      fields: {
        success: {
          name: 'success',
          type: GraphQLBoolean,
        },
        message: {
          name: 'message',
          type: GraphQLString,
        },
      },
    }),
    args: {
      clinicId: {
        name: 'clinicId',
        type: GraphQLString,
      },
      clientId: {
        name: 'clientId',
        type: GraphQLString,
      },
    },
    resolve: async (root, args, context) => request.deleteClinic(root, args, context),
  },
};

module.exports = mutation;
