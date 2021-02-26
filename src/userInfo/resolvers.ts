import {db} from "../index";

export const Query = {
    usersInfo: async () => {
        let usersInfo: Array<object> = [];

        const snapshot = await db.collection("usersInfo").get();
        snapshot.forEach((doc: any) => {
            usersInfo.push(doc.data())
        });

        return usersInfo;
    },
    userInfo: async (_: any, {uid}: any) => {
        const usersInfoRef = db.collection("usersInfo");
        const snapshot = await usersInfoRef.where("uid","==", uid).get();

        return snapshot.docs[0].data();
    },
};

export const Mutation = {
    async createUserInfo(_: any, { uid, name, friends }: any) {
        const docRef = db.collection('usersInfo').doc();

        return docRef.set({
            name,
            uid,
            friends
        });
    }
};

export const UserInfo = {
    uid: (userInfo: { uid: any; }) => userInfo.uid,
    name: (userInfo: { name: string; }) => userInfo.name,
    friends: (userInfo: { friends: Array<any>; }) => userInfo.friends
};
