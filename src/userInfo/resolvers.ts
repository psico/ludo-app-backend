import { calculateExperienceLevel } from '../util/util';

export const Query = {
  usersInfo: async (_: any, { textSearch }: any, { db }:any) => {
    let usersInfo: Array<object> = [];

    const snapshot = await db.collection('usersInfo').get();
    snapshot.forEach((doc: any) => {
      usersInfo.push(doc.data());
    });

    if (textSearch) {
      usersInfo = usersInfo.filter((user: any) => {
        let searchResult = false;

        if (user.name && user.name?.toUpperCase().search(textSearch.toUpperCase()) !== -1) {
          searchResult = true;
        }

        return searchResult;
      });
    }

    return usersInfo;
  },
  userInfo: async (_: any, { uid }: any, { db }:any) => {
    // @TODO this code should be optimized
    let userInfo: any = {};
    const followers: any = [];

    const snapshotUsersInfo = await db.collection('usersInfo').get();
    snapshotUsersInfo.docs.forEach((doc:any) => {
      if (doc.data().uid === uid) {
        userInfo = doc.data();
      } else {
        if (doc.data().friends?.find((friendData:any) => friendData.uid === uid)) {
          followers.push(doc.data());
        }
      }
    });

    const matches:any = [];
    const snapshotMatches = await db.collection('matches').get();
    snapshotMatches.docs.forEach((doc:any) => {
      if (doc.data().uid === uid || doc.data().players?.find((player:any) => player.uid === uid)) {
        matches.push(doc.data());
      }
    });

    // const logExperience: any = userInfo.logExperience((logExperience: any) => {
    //   return {
    //     ...logExperience,
    //     createdAt: (new Date(logExperience.createdAt))
    //   };
    // });

    return {
      ...userInfo,
      numberOfMatches: matches.length,
      following: snapshotUsersInfo.docs[0].data().friends,
      followers: followers
    };
  },
  userExperienceInfo: async (_: any, { uid }: any, { db }:any) => {
    const snapshotUsersInfo = await db.collection('usersInfo').where('uid', '==', uid).get();

    const totalExperience = snapshotUsersInfo.docs[0].data().logExperience.reduce(
      (previousValue: any, currentValue: any) => previousValue.gained + currentValue.gained
    );

    console.log('lvlExperience => ', totalExperience, calculateExperienceLevel({ experience: totalExperience }));

    return {
      totalExperience: totalExperience,
      level: 1
    };
  }
};

export const Mutation = {
  createUserInfo: (_: any, { uid, name, photoURL }: any, { db }:any) => {
    const docRef = db.collection('usersInfo').doc();
    // @TODO to do a check to validate  that uid exists
    docRef.set({
      uid,
      name,
      photoURL
    });

    return { uid, name };
  }
};

export const UserInfo = {
  uid: (userInfo: { uid: any; }) => userInfo.uid,
  name: (userInfo: { name: string; }) => userInfo.name,
  photoURL: (userInfo: { photoURL: string; }) => userInfo.photoURL,
  friends: (userInfo: { friends: Array<any>; }) => userInfo.friends,
  logExperience: (userInfo: { logExperience: Array<any>; }) => userInfo.logExperience
};
