const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphs/schema');

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(4000);
