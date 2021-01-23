const providers = {
    friend: []
};

export const Query = {
    friends: () => {
        return providers.friend;
    },
    friend: (_: any, {id}: any) => {
        // @ts-ignore
        return providers.friend.find(item => item.uid === Number(uid));
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
    uid: (friend: { uid: any; }) => friend.uid,
    name: (friend: { name: string; }) => friend.name
};
