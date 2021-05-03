const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const passport = require('passport');

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

// Initiating login
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// app.post('/login',
//     passport.authenticate('local'),
//     function (req: any, res: any) {
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         // res.redirect('/users/' + req.user.username);
//
//         console.log(req.data);
//         console.log(req.params);
//         console.log(req.body);
//         //JG implements
//         res.send({
//             token: 'test12345'
//         });
//     }
// );
app.use('/login', (req: any, res: any) => {
    console.log(req.data);
    console.log(req.params);
    console.log(req.body);
    res.send({
        token: 'test123'
    });
});

//Initiating graphQL
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
