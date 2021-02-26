import { db } from "../index";

export const Query = {
    friends: async () => {
        let friends: Array<object> = [];

        const snapshot = await db.collection("usersInfo").get();
        snapshot.forEach((doc: any) => {
            friends.push(doc.data())
        });

        return friends;
    },
    friend: async (_: any, {uid}: any) => {
        const usersInfoRef = db.collection("usersInfo");
        const snapshot = await usersInfoRef.where("uid","==", uid).get();

        return snapshot.docs[0].data();
    },
};

export const Mutation = {
    async createFriend(_: any, { uid, name }: any) {
        const docRef = db.collection('usersInfo').doc();

        return docRef.set({
            name: name,
            uid: uid
        });
    }
};

export const Friend = {
    uid: (friend: { uid: string; }) => friend.uid,
    name: (friend: { name: string; }) => friend.name
};
