const mysql = require('mysql');

const readQuery = async (query) => {
  const connection = mysql.createConnection({
    host: 'westetics-transacional.cluster-ro-c2ha4rofgbo9.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'sa',
    password: 'HanSolo1503',
    database: 'westetics',
  });

  return await new Promise((resolve, reject) => {
    return connection.query(query, (error, data) => {
      if (error) {
        reject([error, data]);
      }

      resolve([null, data]);
    });
  });
};

const writeQuery = async (query) => {
  const connection = mysql.createConnection({
    host: 'westetics-transacional.cluster-c2ha4rofgbo9.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'sa',
    password: 'HanSolo1503',
    database: 'westetics',
  });

  return await new Promise((resolve, reject) => {
    return connection.query(query, (error, data) => {
      if (error) {
        reject([error, data]);
      }

      resolve([null, data]);
    });
  });
};

module.exports = {
  readQuery,
  writeQuery,
};
