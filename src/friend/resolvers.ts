import { db } from "../index";

const providers = {
    friend: []
};

export const Query = {
    friends: () => {
        db.collection("usersInfo").get()
            .then(snapshot => {
                snapshot.forEach((doc: any) => {
                    console.log("aki ==> ", doc.id, '=>', doc.data());
                });
            })
            .catch((e: any) => {
                console.log("ops =>", e);
            });

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
    uid: (friend: { uid: string; }) => friend.uid,
    name: (friend: { name: string; }) => friend.name
};
