const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const mysql = require('../.mysql/index');
const SQL = require('sql-template-strings');

AWS.config.setPromisesDependency(Promise);

/*
CREATE TABLE CLINICS
(
    CLINIC_ID                  VARCHAR(50)  NOT NULL,
    NAME                       VARCHAR(255) NOT NULL,
    DOC_CNPJ                   VARCHAR(15)  NOT NULL,
    SOCIAL_NAME                VARCHAR(255) NOT NULL,
    FANTASY_NAME               VARCHAR(255) NOT NULL,
    EMAIL                      VARCHAR(320) NOT NULL,
    LEGAL_REPRESENTATIVE_ID    VARCHAR(15),
    LEGAL_REPRESENTATIVE_CPF   VARCHAR(15),
    LEGAL_REPRESENTATIVE_RG    VARCHAR(15),
    LEGAL_REPRESENTATIVE_NAME  VARCHAR(255),
    LEGAL_REPRESENTATIVE_PHONE VARCHAR(15),
    CEP                        VARCHAR(8),
    STREET_NAME                VARCHAR(100),
    NEIGHBORHOOD               VARCHAR(100),
    CITY                       VARCHAR(100),
    STATE                      VARCHAR(50),
    COMPLEMENT                 VARCHAR(100),
    PRIMARY KEY (CLINIC_ID)
)
*/

const request = {};

request.getClinics = async (root, { clinicId }, context) => {
  try {
    console.log('GET CLIENTS');

    const data = await mysql.readQuery(
      SQL`
        SELECT  CLINIC_ID as clinicId,
                NAME as name,
                DOC_CNPJ as docCnpj,
                SOCIAL_NAME as socialName,
                FANTASY_NAME as fantasyName,
                EMAIL as email,
                LEGAL_REPRESENTATIVE_ID as legalRepresentativeId,
                LEGAL_REPRESENTATIVE_CPF as legalRepresentativeCpf,
                LEGAL_REPRESENTATIVE_RG as legalRepresentativeRg,
                LEGAL_REPRESENTATIVE_NAME as legalRepresentativeName,
                LEGAL_REPRESENTATIVE_PHONE as legalRepresentativePhone,
                CEP as cep,
                STREET_NAME as streetName,
                NEIGHBORHOOD as neighborhood,
                CITY as city,
                STATE as state,
                COMPLEMENT as complement
        FROM CLINICS
        WHERE ${clinicId} = '' OR CLINICS.CLINIC_ID = ${clinicId}
        AND   CLINICS.STATUS = 1
      `
    );

    return data;
  } catch (error) {
    return {};
  }
};

request.getClinic = async (root, { clinicId }, context) => {
  try {
    console.log('getClinic');

    const [error, data] = await mysql.readQuery(
      SQL`
        SELECT  CLINIC_ID as clinicId,
                NAME as name,
                DOC_CNPJ as docCnpj,
                SOCIAL_NAME as socialName,
                FANTASY_NAME as fantasyName,
                EMAIL as email,
                LEGAL_REPRESENTATIVE_ID as legalRepresentativeId,
                LEGAL_REPRESENTATIVE_CPF as legalRepresentativeCpf,
                LEGAL_REPRESENTATIVE_RG as legalRepresentativeRg,
                LEGAL_REPRESENTATIVE_NAME as legalRepresentativeName,
                LEGAL_REPRESENTATIVE_PHONE as legalRepresentativePhone,
                CEP as cep,
                STREET_NAME as streetName,
                NEIGHBORHOOD as neighborhood,
                CITY as city,
                STATE as state,
                COMPLEMENT as complement,
                STATUS as status
        FROM CLINICS
        WHERE CLINICS.CLINIC_ID = ${clinicId}
        AND   CLINICS.STATUS = 1
      `
    );

    if (data) {
      return Array.isArray(data) && data[0] ? data[0] : {};
    }

    return error;
  } catch (error) {
    console.log('error', error);
    return {};
  }
};

request.addClinic = async (root, {
  clinicId,
  name,
  docCnpj,
  socialName,
  fantasyName,
  email,
  legalRepresentativeId,
  legalRepresentativeCpf,
  legalRepresentativeRg,
  legalRepresentativeName,
  legalRepresentativePhone,
  cep,
  streetName,
  neighborhood,
  city,
  state,
  complement
 }, context) => {
  const [error, data] = await mysql.writeQuery(
    SQL`
      INSERT CLINIC (
        CLINIC_ID,
        NAME,
        DOC_CNPJ,
        SOCIAL_NAME,
        FANTASY_NAME,
        EMAIL,
        LEGAL_REPRESENTATIVE_ID,
        LEGAL_REPRESENTATIVE_CPF,
        LEGAL_REPRESENTATIVE_RG,
        LEGAL_REPRESENTATIVE_NAME,
        LEGAL_REPRESENTATIVE_PHONE,
        CEP,
        STREET_NAME,
        NEIGHBORHOOD,
        CITY,
        STATE,
        COMPLEMENT
      )
      values (
        ${clinicId},
        ${name},
        ${docCnpj},
        ${socialName},
        ${fantasyName},
        ${email},
        ${legalRepresentativeId},
        ${legalRepresentativeCpf},
        ${legalRepresentativeRg},
        ${legalRepresentativeName},
        ${legalRepresentativePhone},
        ${cep},
        ${streetName},
        ${neighborhood},
        ${city},
        ${state},
        ${complement}
      )
    `
  );

  if (data) {
    return {
      success: true,
      message: 'Clínica cadastrado com sucesso!'
    }
  }

  return {
    success: false,
    message: error
  };
};

request.updateClinic = async (root, {
  clinicId,
  name,
  docCnpj,
  socialName,
  fantasyName,
  email,
  legalRepresentativeId,
  legalRepresentativeCpf,
  legalRepresentativeRg,
  legalRepresentativeName,
  legalRepresentativePhone,
  cep,
  streetName,
  neighborhood,
  city,
  state,
  complement
 }, context) => {
  const [error, data] = await mysql.writeQuery(
    SQL`
      UPDATE CLINICS
      SET NAME = ${name},
          DOC_CNPJ = ${docCnpj},
          SOCIAL_NAME = ${socialName},
          FANTASY_NAME = ${fantasyName},
          EMAIL = ${email},
          LEGAL_REPRESENTATIVE_ID = ${legalRepresentativeId},
          LEGAL_REPRESENTATIVE_CPF = ${legalRepresentativeCpf},
          LEGAL_REPRESENTATIVE_RG = ${legalRepresentativeRg},
          LEGAL_REPRESENTATIVE_NAME = ${legalRepresentativeName},
          LEGAL_REPRESENTATIVE_PHONE = ${legalRepresentativePhone},
          CEP = ${cep},
          STREET_NAME = ${streetName},
          NEIGHBORHOOD = ${neighborhood},
          CITY = ${city},
          STATE = ${state},
          COMPLEMENT = ${complement}
      WHERE CLIENTS.CLINIC_ID = ${clinicId}
    `
  );

  if (data) {
    return {
      success: true,
      message: 'Clínica atualizado com sucesso!'
    }
  }

  return {
    success: false,
    message: error
  };
};

request.deleteClinic = async (root, {
  clinicId,
 }, context) => {
  const [error, data] = await mysql.writeQuery(
    SQL`
      UPDATE CLINICS
      SET STATUS = 0
      WHERE CLINICS.CLINIC_ID = ${clinicId}
    `
  );

  if (data) {
    return {
      success: true,
      message: 'Clínica excluído com sucesso!'
    }
  }

  return {
    success: false,
    message: error
  };
};

module.exports = request;
