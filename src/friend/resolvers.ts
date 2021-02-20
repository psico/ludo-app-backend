import { db } from "../index";

const providers = {
    friend: []
};

export const Query = {
    friends: async () => {
        let friends: Array<object> = [];
        // db.collection("usersInfo").get()
        //     .then(snapshot => {
        //         snapshot.forEach((doc: any) => {
        //             friends.push(doc.data());
        //         });
        //         return friends;
        //     })
        //     .catch((e: any) => {
        //         console.log("ops =>", e);
        //     });

        const snapshot = await db.collection("usersInfo").get();
        snapshot.forEach((doc: any) => {
            console.log("aki ==> ", doc.id, '=>', doc.data());
            friends.push(doc.data())
        });
        console.log(friends);
        console.log(providers.friend);

        return friends;

        // return providers.friend;
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
