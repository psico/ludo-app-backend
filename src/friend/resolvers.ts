import { db } from '../index';

export const Query = {
  friends: async () => {
    const friends: Array<object> = [];

    const snapshot = await db.collection('usersInfo').get();
    snapshot.forEach((doc: any) => {
      friends.push(doc.data());
    });

    return friends;
  },

  friend: async (_: any, { uid }: any) => {
    const usersInfoRef = db.collection('usersInfo');
    const snapshot = await usersInfoRef.where('uid', '==', uid).get();

    return snapshot.docs[0].data();
  }
};

export const Mutation = {
  createFriend (_: any, { uid, name }: any) {
    const docRef = db.collection('usersInfo').doc();

    docRef.set({
      name: name,
      uid: uid
    });

    return { uid, name };
  },

  async follow (_: any, { followUid }: any, { db, firebase }:any) {
    const userData: any = await firebase.auth().currentUser;
    const usersInfoRef = db.collection('usersInfo');
    const snapshotUser = await usersInfoRef.where('uid', '==', userData.uid).get();
    const snapshotFollow = await usersInfoRef.where('uid', '==', followUid).get();

    snapshotUser.docs[0].data().friends.push({ uid: followUid, name: 'ok' });
    console.log('ops => ', snapshotUser.docs[0].data());
    await usersInfoRef.doc().set(snapshotUser.docs[0].data());
    console.log('folloing called');
    return {
      uid: 1,
      name: 'test'
    };
  }
};

export const Friend = {
  uid: (friend: { uid: string; }) => friend.uid,
  name: (friend: { name: string; }) => friend.name
};
