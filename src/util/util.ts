import { firestore } from 'firebase-admin';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
const firebase = require('firebase/compat/app');

export const userDataFormat = (userData: any, token: string): object => {
  return {
    user: {
      displayName: userData.displayName ? userData.displayName : userData.email,
      email: userData.email,
      emailVerified: userData.emailVerified,
      uid: userData.uid,
      photoURL: userData.photoURL,
      isLoggedIn: true,
      token: token,
      refreshToken: userData.refreshToken
    }
  };
};

export const chooseCredential = async (body: ReadableStream): Promise<any | null> => {
  // Login with Google
  // @ts-ignore
  if (body.credential.providerId === 'google.com') {
    return firebase.auth.GoogleAuthProvider.credential(
      // @ts-ignore
      body.credential.idToken,
      // @ts-ignore
      body.credential.accessToken
    );
  }

  // Login with Facebook
  // @ts-ignore
  if (body?.credential.providerId === 'facebook.com') {
    return firebase.auth.FacebookAuthProvider.credential(
      // @ts-ignore
      body.credential.accessToken
    );
  }

  return null;
};

export const addExperience = async ({ db, experienceType, game }:any) => {
  const userData: any = await firebase.auth().currentUser;
  const uid = await userData.uid;
  const docRef: QuerySnapshot = db.collection('usersInfo').where('uid', '==', uid);
  // @ts-ignore
  const snapshot = await docRef.get();

  let arrLogExperience: { gained: number; game: string; experienceType: string; }[] = [];

  snapshot.forEach((doc:QueryDocumentSnapshot) => {
    if (doc.data()?.logExperience) {
      arrLogExperience = doc.data()?.logExperience;
    }

    let gained = 0;
    if (experienceType === 'Single Match') {
      gained = 5;
    }
    if (experienceType === 'First Match Game') {
      gained = 15;
    }

    arrLogExperience.push({
      gained,
      game,
      experienceType
    });

    doc.ref.set({
      ...doc.data(),
      logExperience: arrLogExperience
    });
  });

  // console.log('Testing 4 => ', snapshot[0].data());
  // const dataObj = snapshot;

  // let arrLogExperience = [];
  // // @ts-ignore
  // if (dataObj?.logExperience) {
  //   // @ts-ignore
  //   arrLogExperience = dataObj?.logExperience;
  // }

  // arrLogExperience.push({
  //   gained: 5,
  //   gameName: 'Lhama Dice',
  //   type: 'trying new game'
  // });

  // docRef.set({
  //   ...dataObj,
  //   logExperience: arrLogExperience
  // });

  // .collection("usersInfo")
  //     .where("uid", "==", "Pr5X0qk6DeYut8paQ8hQ5s7kb8F3")

  return true;
};

export const verifyPassiveExperience = ({ db, user }:any) => {

};

export const calculateExperienceLevel = ({ experience, amountDivision, nextLevelExperience }: any): any => {
  experience = experience || 0;
  amountDivision = amountDivision || 0;
  nextLevelExperience = nextLevelExperience || 5;

  if (experience >= 5) {
    experience = experience / 2;
    amountDivision = amountDivision + 1;
    nextLevelExperience = nextLevelExperience * 2;
    return calculateExperienceLevel({
      experience,
      amountDivision,
      nextLevelExperience
    });
  }

  return {
    level: amountDivision - 1,
    nextLevelExperience
  };
};
