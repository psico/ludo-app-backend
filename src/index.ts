const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require("graphql-tools");

const fs = require("fs")
const path = require("path");
const schemaFile = path.join(__dirname, "schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

const resolvers = {
    Query: {
        Users: () => {
            return providers.users;
        },
        User: (_, { id }) => {
            // @ts-ignore
            return providers.users.find(item => item.id === Number(id));
        },
    },
    User: {
        id: user => user.id,
        name: user => user.name,
        repo: user => user.repo,
        age: user => user.age,
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const providers = {
    users: []
};

let id = 0;

// const resolvers = {
//     // @ts-ignore
//     user({ id }) {
//         // @ts-ignore
//         return providers.users.find(item => item.id === Number(id));
//     },
//     users() {
//         return providers.users;
//     },
//     // @ts-ignore
//     createUser({ name, repo, age }) {
//         const user = {
//             id: id++,
//             name,
//             repo,
//             age
//         };
//
//         // @ts-ignore
//         providers.users.push(user);
//
//         return user;
//     }
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
