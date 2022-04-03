import firebase from 'firebase';
import User = firebase.User;

export const userDataFormat = (userData: User, token: string): object => {
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

export const chooseCredential = async (body: ReadableStream): Promise<firebase.auth.OAuthCredential | null> => {
  // Login with Google
  // @ts-ignore
  if (body.credential.providerId === 'google.com') {
    return firebase.auth.GoogleAuthProvider.credential(
      // @ts-ignore
      body.credential.oauthIdToken,
      // @ts-ignore
      body.credential.oauthAccessToken
    );
  }

  // Login with Facebook
  // @ts-ignore
  if (body?.credential.providerId === 'facebook.com') {
    return firebase.auth.FacebookAuthProvider.credential(
      // @ts-ignore
      body.credential.oauthAccessToken
    );
  }

  return null;
};

export const addExperience = async ({ db }:any) => {
  console.log('Testing 1');
  const userData: any = await firebase.auth().currentUser;
  console.log('Testing 2 => ', await userData.uid);
  const snapshot = await db.collection('usersInfo').where('uid', '==', await userData.uid).get();
  console.log('Testing 3');
  snapshot.forEach((doc:any) => {
    console.log('doc => ', doc.name);
    console.log('doc => ', doc.friends);
  });
  console.log('Testing 4 => ');
  const dataObj = snapshot;

  let arrLogExperience = [];
  if (dataObj?.logExperience) {
    arrLogExperience = dataObj?.logExperience;
  }

  arrLogExperience.push({
    gained: 5,
    gameName: 'Lhama Dice',
    type: 'trying new game'
  });

  // docRef.set({
  //   ...dataObj,
  //   logExperience: arrLogExperience
  // });

  // .collection("usersInfo")
  //     .where("uid", "==", "Pr5X0qk6DeYut8paQ8hQ5s7kb8F3")

  return true;
};
