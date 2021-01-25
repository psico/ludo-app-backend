const providers = {
    usersInfo: []
};

export const Query = {
    usersInfo: () => {
        return providers.usersInfo;
    },
    userInfo: (_: any, {id}: any) => {
        // @ts-ignore
        return providers.usersInfo.find(item => item.uid === Number(uid));
    },
};

export const Mutation = {
    createUser(_: any, { uid, name, friends }: any) {
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
