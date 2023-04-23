const {
  graphql
} = require('graphql');

const schema = require('./graphs/schema');

module.exports.query = (event, context, callback) =>
  graphql(schema, event.queryStringParameters.query, null, context, event.queryStringParameters.variables)
    .then(
      result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
      err => callback(err)
    )

module.exports.mutation = (event, context, callback) =>
  graphql(schema, event.queryStringParameters.mutation, null, context, event.queryStringParameters.variables)
    .then(
      result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
      err => callback(err)
    )
