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
    async createMatch(_: any, { uid, gameMoment, game }: any) {
        const docRef = db.collection('matches').doc();

        return docRef.set({
            uid,
            gameMoment,
            game
        });
    }
};

export const Match = {
    uid: (match: { uid: string; }) => match.uid,
    gameMoment: (match: { gameMoment: string; }) => match.gameMoment,
    game: (match: { game: string; }) => match.game,
    comments: (match: { comments: string; }) => match.comments
};
