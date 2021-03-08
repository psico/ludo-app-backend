import { db } from "../index";

export const Query = {
    matchs: async () => {
        let matchs: Array<object> = [];

        const snapshot = await db.collection("matches").get();
        snapshot.forEach((doc: any) => {
            matchs.push(doc.data())
        });

        return matchs;
    },
    match: async (_: any, {gameMoment}: any) => {
        // const usersInfoRef = db.collection("usersInfo");
        // const snapshot = await usersInfoRef.where("uid","==", uid).get();

        // return snapshot.docs[0].data();
    },
};

export const Mutation = {
    async createMatch(_: any, { gameMoment }: any) {
        // const docRef = db.collection('usersInfo').doc();

        // return docRef.set({
        //     gameMoment: gameMoment
        // });
    }
};

export const Match = {
    gameMoment: (match: { gameMoment: string; }) => match.gameMoment
};
