export const Query = {
  usersInfo: async (_: any, __: any, { db }:any) => {
    const usersInfo: Array<object> = [];

    const snapshot = await db.collection('usersInfo').get();
    snapshot.forEach((doc: any) => {
      usersInfo.push(doc.data());
    });

    return usersInfo;
  },
  userInfo: async (_: any, { uid }: any, { db }:any) => {
    const usersInfoRef = db.collection('usersInfo');
    const snapshot = await usersInfoRef.where('uid', '==', uid).get();

    return snapshot.docs[0].data();
  }
};

export const Mutation = {
  createUserInfo (_: any, { uid, name }: any, { db }:any) {
    const docRef = db.collection('usersInfo').doc();
    // @TODO to do a check to validate  that uid exists
    docRef.set({
      name,
      uid
    });

    return { uid, name };
  }
};

export const UserInfo = {
  uid: (userInfo: { uid: any; }) => userInfo.uid,
  name: (userInfo: { name: string; }) => userInfo.name,
  friends: (userInfo: { friends: Array<any>; }) => userInfo.friends
};
