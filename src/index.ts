import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import schema from './schema';
import { chooseCredential, userDataFormat } from './util/util';
import context from './context';
const firebase = require('firebase/compat/app');

// Initialize Firebase
const firebaseConfig = require('../firebaseConfig.json');
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ludoapp-b612.firebaseio.com'
});
export const db = admin.firestore();
admin.auth();

// Initialize Express
const express = require('express');
const app = express();

// Using cors protection only in development
const cors = require('cors');
app.use(cors());

// Login route autentication
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// REQUEST - Login
app.use('/login', async (req: any, res: any) => {
  try {
    const email = req.body.user.email;
    const password = req.body.user.password;

    const userData: any = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token: string | undefined = await firebase.auth().currentUser?.getIdToken();

    if (userData?.user && token) {
      console.info(`User e-mail ${userData.user?.email} logged`);
      return res.send(userDataFormat(userData.user, token));
    }
  } catch (error) {
    console.error('Unauthorized');
    return res.status(403).send('Unauthorized');
  }
});

// REQUEST - Login with credential
app.use('/loginCredential', async (req: Request, res: any) => {
  try {
    if (req.body) {
      const credential = await chooseCredential(req.body);

      if (credential) {
        const userData: any | void = await firebase.auth().signInWithCredential(credential);
        const token: string | undefined = await firebase.auth().currentUser?.getIdToken();
        if (token && userData.user) {
          console.info(`User e-mail ${userData.user?.email} logged`);
          return res.send(userDataFormat(userData.user, token));
        }
      }
    }
    console.error('There are problems with credential');
    return res.status(403).send('Unauthorized');
  } catch (error) {
    console.error('Unauthorized');
    return res.status(403).send('Unauthorized');
  }
});

// REQUEST - Verify Token
app.use('/verifyToken', async (req: any, res: any) => {
  try {
    const decodedToken: any = await admin.auth().verifyIdToken(req.body.idToken);
    const uid = decodedToken.uid;

    console.info('Token verified');
    return res.send({ uid });
  } catch (error) {
    console.error('Error with token');
    return res.status(403).send('Error with token');
  }
});

// REQUEST - Get current user
app.use('/currentUser', async (req: any, res: any) => {
  const userData: any | null = firebase.auth().currentUser;

  if (userData) {
    console.info(`Returning current e-mail user ${userData.displayName ? userData.displayName : userData.email}... `);
    return res.send(userDataFormat(userData, await userData.getIdToken()));
  }

  return res.status(204).send();
});

// Initiating graphQL
const { graphqlHTTP } = require('express-graphql');
app.use(
  '/graphql',
  graphqlHTTP((request: any) => ({
    schema,
    context: context(request),
    graphiql: true
  }))
);

app.listen(4000);

console.info('LudoApp system is working');
console.info('Access the address: http://localhost:4000/graphql');
