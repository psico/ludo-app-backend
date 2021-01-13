const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require("graphql");


const schema = buildSchema(`
  type User {
    id: ID
    name: String
    repo: String
    age: Int
  }
  type Query {
    user(id: ID!): User
    users: [User]
  }
  type Mutation {
    createUser(name: String!, repo: String!, age: Int!): User
  }
`);

const providers = {
    users: []
};

let id = 0;

const resolvers = {
    // @ts-ignore
    user({ id }) {
        // @ts-ignore
        return providers.users.find(item => item.id === Number(id));
    },
    users() {
        return providers.users;
    },
    // @ts-ignore
    createUser({ name, repo, age }) {
        const user = {
            id: id++,
            name,
            repo,
            age
        };

        // @ts-ignore
        providers.users.push(user);

        return user;
    }
};

var app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true
    })
);

app.listen(4000);
