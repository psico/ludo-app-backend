import "firebase/auth";
import "firebase/firestore";
import schema from './schema';

// const passport = require('passport');

// Initialize Firebase
const firebase = require('firebase');
const firebaseConfig = require("../firebaseConfig.json");
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ludoapp-b612.firebaseio.com"
});
export const db = admin.firestore();
export const auth = admin.auth();

// Initialize Express
const express = require("express");
const app = express();

//Using cors protection only in development
const cors = require('cors');
app.use(cors());

// Login route autentication
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
//     }
// );
app.use('/login', (req: any, res: any) => {

    const email = req.body.user.email;
    const password = req.body.user.password;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result: any) => {
            console.log(result);
            if (!result.user.email.isEmpty) {
                console.info(`User e-mail ${result.user.email} logged`);
                res.send({
                    user: {
                        displayName: result.user.displayName ? result.user.displayName : result.user.email,
                        email: result.user.email,
                        emailVerified: result.user.emailVerified,
                        uid: result.user.uid,
                        photoURL: result.user.photoURL,
                        isLoggedIn: true,
                        token: 'test123',
                        refreshToken: result.user.refreshToken
                    }
                });
            }
        })
        .catch((e: Error) => {
            console.error(e.message);
        });
});

//Initiating graphQL
const {graphqlHTTP} = require('express-graphql');
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
