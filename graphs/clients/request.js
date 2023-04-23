const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const mysql = require('../.mysql/index');
const SQL = require('sql-template-strings');

AWS.config.setPromisesDependency(Promise);

/*
CREATE TABLE CLIENTS (
    CLINIC_ID       VARCHAR(50)     NOT NULL,
    CLIENT_ID       VARCHAR(50)     NOT NULL,
    NAME            VARCHAR(255)    NOT NULL,
    BIRTHDAY        DATETIME,
    DOC_CPF         VARCHAR(15),
    DOC_RG          VARCHAR(15),
    EMAIL           VARCHAR(320),
    PHONE           VARCHAR(15),
    CELLPHONE       VARCHAR(15),
    EMERGENCY_NAME  VARCHAR(255),
    EMERGENCY_PHONE VARCHAR(15),
    OCCUPATION      VARCHAR(50),
    CEP             VARCHAR(8),
    STREET_NAME     VARCHAR(100),
    NEIGHBORHOOD    VARCHAR(100),
    CITY            VARCHAR(100),
    STATE           VARCHAR(50),
    COMPLEMENT      VARCHAR(100),
    LEGAL_REPRESENTATIVE_CPF    VARCHAR(15),
    LEGAL_REPRESENTATIVE_RG     VARCHAR(15),
    LEGAL_REPRESENTATIVE_NAME   VARCHAR(255),
    LEGAL_REPRESENTATIVE_PHONE  VARCHAR(15),
    PRIMARY KEY (CLINIC_ID, CLIENT_ID),
    FOREIGN KEY (CLINIC_ID) REFERENCES CLINICS(CLINIC_ID)
);
*/

const request = {};

request.getClients = async (root, { clinicId }, context) => {
  try {
    const data = await mysql.readQuery(
      SQL`
        SELECT  CLINIC_ID,
                CLIENT_ID,
                NAME,
                BIRTHDAY,
                DOC_CPF,
                DOC_RG,
                EMAIL,
                PHONE,
                CELLPHONE
        FROM CLIENTS
        WHERE CLIENTS.CLINIC_ID = ${clinicId}
        AND   CLIENTS.STATUS = 1
      `
    );

    return data;
  } catch (error) {
    return {};
  }
};

request.getClient = async (root, { clinicId, clientId }, context) => {
  try {
    console.log('getClient');

    const [error, data] = await mysql.readQuery(
      SQL`
        SELECT  CLINIC_ID as clinicId,
                CLIENT_ID as clientId,
                NAME as name,
                BIRTHDAY as birthday,
                DOC_CPF as docCpf,
                DOC_RG as docRg,
                EMAIL as email,
                PHONE as phone,
                CELLPHONE as cellphone,
                EMERGENCY_NAME as emergencyName,
                EMERGENCY_PHONE as emergencyPhone,
                OCCUPATION as occupation,
                CEP as cep,
                STREET_NAME as streetName,
                NEIGHBORHOOD as neighborhood,
                CITY as city,
                STATE as state,
                COMPLEMENT as complement,
                LEGAL_REPRESENTATIVE_CPF as legalRepresentativeCpf,
                LEGAL_REPRESENTATIVE_RG as legalRepresentativeRg,
                LEGAL_REPRESENTATIVE_NAME as legalRepresentativeName,
                LEGAL_REPRESENTATIVE_PHONE as legalRepresentativePhone,
                STATUS as status
        FROM CLIENTS
        WHERE CLIENTS.CLINIC_ID = ${clinicId}
        AND   CLIENTS.CLIENT_ID = ${clientId}
        AND   CLIENTS.STATUS = 1
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

request.addClient = async (root, {
  clinicId,
  clientId,
  name,
  birthday,
  docCpf,
  docRg,
  email,
  phone,
  cellphone,
  emergencyName,
  emergencyPhone,
  occupation,
  cep,
  streetName,
  neighborhood,
  city,
  state,
  complement,
  legalRepresentativeCpf,
  legalRepresentativeRg,
  legalRepresentativeName,
  legalRepresentativePhone
 }, context) => {
  const [error, data] = await mysql.writeQuery(
    SQL`
      INSERT CLIENTS (
        CLINIC_ID,
        CLIENT_ID,
        NAME,
        BIRTHDAY,
        DOC_CPF,
        DOC_RG,
        EMAIL,
        PHONE,
        CELLPHONE,
        EMERGENCY_NAME,
        EMERGENCY_PHONE,
        OCCUPATION,
        CEP,
        STREET_NAME,
        NEIGHBORHOOD,
        CITY,
        STATE,
        COMPLEMENT,
        LEGAL_REPRESENTATIVE_CPF,
        LEGAL_REPRESENTATIVE_RG,
        LEGAL_REPRESENTATIVE_NAME,
        LEGAL_REPRESENTATIVE_PHONE
      )
      values (
        ${clinicId},
        ${clientId},
        ${name},
        ${birthday},
        ${docCpf},
        ${docRg},
        ${email},
        ${phone},
        ${cellphone},
        ${emergencyName},
        ${emergencyPhone},
        ${occupation},
        ${cep},
        ${streetName},
        ${neighborhood},
        ${city},
        ${state},
        ${complement},
        ${legalRepresentativeCpf},
        ${legalRepresentativeRg},
        ${legalRepresentativeName},
        ${legalRepresentativePhone}
      )
    `
  );

  if (data) {
    return {
      success: true,
      message: 'Cliente cadastrado com sucesso!'
    }
  }

  return {
    success: false,
    message: error
  };
};

request.updateClient = async (root, {
  clinicId,
  clientId,
  name,
  birthday,
  docCpf,
  docRg,
  email,
  phone,
  cellphone,
  emergencyName,
  emergencyPhone,
  occupation,
  cep,
  streetName,
  neighborhood,
  city,
  state,
  complement,
  legalRepresentativeCpf,
  legalRepresentativeRg,
  legalRepresentativeName,
  legalRepresentativePhone
 }, context) => {
  const [error, data] = await mysql.writeQuery(
    SQL`
      UPDATE CLIENTS
      SET
        NAME = ${name},
        BIRTHDAY = ${birthday},
        DOC_CPF = ${docCpf},
        DOC_RG = ${docRg},
        EMAIL = ${email},
        PHONE = ${phone},
        CELLPHONE = ${cellphone},
        EMERGENCY_NAME = ${emergencyName},
        EMERGENCY_PHONE = ${emergencyPhone},
        OCCUPATION = ${occupation},
        CEP = ${cep},
        STREET_NAME = ${streetName},
        NEIGHBORHOOD = ${neighborhood},
        CITY = ${city},
        STATE = ${state},
        COMPLEMENT = ${complement},
        LEGAL_REPRESENTATIVE_CPF = ${legalRepresentativeCpf},
        LEGAL_REPRESENTATIVE_RG = ${legalRepresentativeRg},
        LEGAL_REPRESENTATIVE_NAME = ${legalRepresentativeName},
        LEGAL_REPRESENTATIVE_PHONE = ${legalRepresentativePhone}
      WHERE CLIENTS.CLINIC_ID = ${clinicId}
      AND   CLIENTS.CLIENT_ID = ${clientId}
    `
  );

  if (data) {
    return {
      success: true,
      message: 'Cliente atualizado com sucesso!'
    }
  }

  return {
    success: false,
    message: error
  };
};

request.deleteClient = async (root, {
  clinicId,
  clientId
 }, context) => {
  const [error, data] = await mysql.writeQuery(
    SQL`
      UPDATE CLIENTS
      SET STATUS = 0
      WHERE CLIENTS.CLINIC_ID = ${clinicId}
      AND   CLIENTS.CLIENT_ID = ${clientId}
    `
  );

  if (data) {
    return {
      success: true,
      message: 'Cliente excluído com sucesso!'
    }
  }

  return {
    success: false,
    message: error
  };
};

module.exports = request;
