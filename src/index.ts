const express = require("express");
const {graphqlHTTP} = require('express-graphql');

import admin from "firebase-admin";
import "firebase/auth";
import "firebase/firestore";

import schema from './schema';

var serviceAccount = require("../ludoapp-b612-firebase-adminsdk.json");

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ludoapp-b612.firebaseio.com"
});

export const db = admin.firestore();
export const auth = admin.auth();

const app = express();

//Using cors protection only in development
const cors = require('cors');
app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000);

console.info("LudoApp system is working");
console.info("Access the address: http://localhost:4000/graphql");
