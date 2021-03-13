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
    match: async (_: any, { idDoc }: any) => {
        const snapshot = await db.collection("matches").doc(idDoc).get();

        return snapshot.data();
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
    uid: (match: { uid: string; }) => match.uid,
    gameMoment: (match: { gameMoment: string; }) => match.gameMoment,
    game: (match: { game: string; }) => match.game,
    comments: (match: { comments: string; }) => match.comments
};
