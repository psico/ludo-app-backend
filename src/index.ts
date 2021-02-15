const express = require("express");
const { graphqlHTTP } = require('express-graphql');

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import schema from './schema';

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000);
