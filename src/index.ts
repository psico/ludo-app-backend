const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require("graphql-tools");

const fs = require("fs")
const path = require("path");
const schemaFile = path.join(__dirname, "schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

const providers = {
    users: []
};

const resolvers = {
    Query: {
        users: () => {
            return providers.users;
        },
        user: (_: any, {id}: any) => {
            // @ts-ignore
            return providers.users.find(item => item.id === Number(id));
        },
    },
    User: {
        id: (user: { id: any; }) => user.id,
        name: (user: { name: string; }) => user.name,
        repo: (user: { repo: string; }) => user.repo,
        age: (user: { age: number; }) => user.age,
    },
    Mutation: {
        // @ts-ignore
        createUser(_, { name, repo, age }) {
            const user = {
                id: 1,
                name,
                repo,
                age
            };

            // @ts-ignore
            providers.users.push(user);

            return user;
        }
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// let id = 0;

// const resolvers = {
//     // @ts-ignore
//     user({ id }) {
//         // @ts-ignore
//         return providers.users.find(item => item.id === Number(id));
//     },
//     users() {
//         return providers.users;
//     },
    // @ts-ignore
    // createUser({ name, repo, age }) {
    //     const user = {
    //         id: id++,
    //         name,
    //         repo,
    //         age
    //     };
    //
    //     // @ts-ignore
    //     providers.users.push(user);
    //
    //     return user;
    // }
// };

var app = express();

// app.use(
//     "/graphql",
//     graphqlHTTP({
//         schema,
//         rootValue: resolvers,
//         graphiql: true
//     })
// );

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000);
