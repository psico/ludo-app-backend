import {db} from "../index";

const providers = {
    usersInfo: []
};

export const Query = {
    usersInfo: async () => {
        let usersInfo: Array<object> = [];

        const snapshot = await db.collection("usersInfo").get();
        snapshot.forEach((doc: any) => {
            usersInfo.push(doc.data())
        });

        return usersInfo;
    },
    userInfo: (_: any, {id}: any) => {
        // @ts-ignore
        return providers.usersInfo.find(item => item.uid === Number(uid));
    },
};

export const Mutation = {
    createUserInfo(_: any, { uid, name, friends }: any) {
        const userInfo = {
            uid,
            name,
            friends
        };

        // @ts-ignore
        providers.usersInfo.push(userInfo);

        return userInfo;
    }
};

export const UserInfo = {
    uid: (userInfo: { uid: any; }) => userInfo.uid,
    name: (userInfo: { name: string; }) => userInfo.name,
    friends: (userInfo: { friends: Array<any>; }) => userInfo.friends
};
