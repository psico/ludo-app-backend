import "firebase/auth";
import "firebase/firestore";
import schema from './schema';
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;
import {auth} from "firebase-admin/lib/auth";
import DecodedIdToken = auth.DecodedIdToken;

// const passport = require('passport');

// Initialize Firebase
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
export const adminAuth = admin.auth();

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
        .then((userData: UserCredential) => {
            if (userData?.user) {
                firebase.auth().currentUser?.getIdToken().then((token: string) => {
                    console.info(`User e-mail ${userData.user?.email} logged`);

                    res.send({
                        user: {
                            displayName: userData.user?.displayName ? userData.user.displayName : userData.user?.email,
                            email: userData.user?.email,
                            emailVerified: userData.user?.emailVerified,
                            uid: userData.user?.uid,
                            photoURL: userData.user?.photoURL,
                            isLoggedIn: true,
                            token: token,
                            refreshToken: userData.user?.refreshToken
                        }
                    });
                });
            }
        })
        .catch((e: Error) => {
            console.error(e.message);
        });
});

app.use('/loginCredential', (req: any, res: any) => {
    let credential = null;

    if (req.body.credential.providerId === "google.com") {
        credential = firebase.auth.GoogleAuthProvider.credential(
            req.body.credential.oauthIdToken,
            req.body.credential.oauthAccessToken
        );
    }

    if (req.body.credential.providerId === "facebook.com") {
        credential = firebase.auth.FacebookAuthProvider.credential(
            req.body.credential.oauthAccessToken
        );
    }

    if (credential) {
        firebase.auth()
            .signInWithCredential(credential)
            .then((userData: UserCredential) => {
                if (userData) {

                    firebase.auth().currentUser?.getIdToken().then((token: string) => {
                        console.info(`User e-mail ${userData.user?.email} logged`);

                        res.send({
                            user: {
                                displayName: userData.user?.displayName ? userData.user.displayName : userData.user?.email,
                                email: userData.user?.email,
                                emailVerified: userData.user?.emailVerified,
                                uid: userData.user?.uid,
                                photoURL: userData.user?.photoURL,
                                isLoggedIn: true,
                                token: token,
                                refreshToken: userData.user?.refreshToken
                            }
                        });
                    });
                }
            }).catch(() => {
            console.error("Unauthorized")
            res.status(403).send('Unauthorized')
        });
    } else {
        console.error("There are problens with credential")
        res.status(403).send('Unauthorized')
    }

});

//Verify Token
app.use('/verifyToken', (req: any, res: any) => {

    const idToken = req.body.idToken;

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken: DecodedIdToken) => {
            const uid = decodedToken.uid;
            console.log(uid);
            res.send({uid});
        })
        .catch((e: Error) => {
            console.error(e.message);
        });
});

//Get current user
app.use('/currentUser', async (req: any, res: any) => {

    const userData: firebase.User | null = firebase.auth().currentUser;

    if (userData) {
        console.log(`Returning current e-mail user ${userData.displayName ? userData.displayName : userData.email}... `)
        res.send({
            user: {
                displayName: userData.displayName ? userData.displayName : userData.email,
                email: userData.email,
                emailVerified: userData.emailVerified,
                uid: userData.uid,
                photoURL: userData.photoURL,
                isLoggedIn: true,
                token: await userData.getIdToken(),
                refreshToken: userData.refreshToken
            }
        });
    }

    res.status(204).send();
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
