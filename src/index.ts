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

const db = admin.firestore();
db.collection("usersInfo").get()
    .then(snapshot => {
        snapshot.forEach((doc: any) => {
            console.log("aki ==> ", doc.id, '=>', doc.data());
        });
    })
    .catch((e: any) => {
        console.log("ops =>", e);
    });

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000);
