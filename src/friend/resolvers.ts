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
    try {
      const userData: any = await firebase.auth().currentUser;
      if (userData) {
        const usersInfoRef = db.collection('usersInfo');
        const snapshotUser = await usersInfoRef.where('uid', '==', userData?.uid).get();
        const snapshotFollow = await usersInfoRef.where('uid', '==', followUid).get();
        const dataUser = snapshotUser.docs[0].data();

        let friendExist = null;
        if (dataUser.friends) {
          friendExist = dataUser.friends.find((friend: any) => friend.uid === snapshotFollow.docs[0].data().uid);
        }

        if (!friendExist) {
          dataUser.friends = [
            ...dataUser?.friends || [],
            {
              uid: snapshotFollow.docs[0].data().uid,
              name: snapshotFollow.docs[0].data().name || 'Name undefined'
            }
          ];

          await usersInfoRef.doc(snapshotUser.docs[0].id).set(dataUser);
        }

        return {
          uid: snapshotFollow.docs[0].data().uid,
          name: snapshotFollow.docs[0].data().name || 'Name undefined'
        };
      }
      return null;
    } catch (e) {
      console.error('ERROR on follow a friend');
      return null;
    }
  }
};

export const Friend = {
  uid: (friend: { uid: string; }) => friend.uid,
  name: (friend: { name: string; }) => friend.name
};
