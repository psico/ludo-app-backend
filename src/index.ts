const express = require("express");
const { graphqlHTTP } = require('express-graphql');

const fs = require("fs")
const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");

const schemaFile = path.join(__dirname, "schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

const schema = makeExecutableSchema({ typeDefs });

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
