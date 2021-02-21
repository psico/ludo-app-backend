import { db } from "../index";

const providers = {
    friend: []
};

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
        console.log(snapshot.docs[0].data());

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });

        return snapshot.docs[0].data();

        // @ts-ignore
        // return providers.friend.find(item => item.uid === Number(uid));
    },
};

export const Mutation = {
    createFriend(_: any, { uid, name }: any) {
        const friend = {
            uid,
            name
        };

        // @ts-ignore
        providers.friend.push(friend);

        return friend;
    }
};

export const Friend = {
    uid: (friend: { uid: string; }) => friend.uid,
    name: (friend: { name: string; }) => friend.name
};
