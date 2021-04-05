import { db } from "../index";

export const Query = {
    matches: async () => {
        let matches: Array<object> = [];

        const snapshot = await db.collection("matches").get();

        snapshot.forEach((doc: any) => {
            console.log("======================");
            console.log(doc.data());
            // console.log(typeof (doc.id));
            // matches.push({
            //     docId: doc.id,
            //     ...doc.data("uid"),
            //     ...doc.data("comments"),
            //     ...doc.data("game"),
            //     ...doc.data("players"),
            // });

            matches.push({
                docId: doc.id,
                ...doc.data(),
            });
            // matches.push(doc.data());


            console.log("***********************");
            console.log(matches[0])
        });

        return matches;
    },
    match: async (_: any, { idDoc }: any) => {
        const snapshot = await db.collection("matches").doc(idDoc).get();

        return snapshot.data();
    },
};

export const Mutation = {
    createMatch(_: any, { uid, gameMoment, game }: any) {
        console.log(uid, gameMoment, game);
        const docRef = db.collection('matches').doc();

        docRef.set({
            uid,
            gameMoment,
            game
        });

        return { uid, gameMoment, game };
    },

    //@TODO validate idDoc and UID
    async addComment(_: any, { idDoc, text }: any ) {
        const docRef = db.collection('matches').doc(idDoc);
        const snapshot = await docRef.get();

        const objMatch = snapshot.data();

        if (objMatch) {
            objMatch.comments.push({
                comment: text,
                name: "Desenvolvedor JG",
                uid: "0IhNFZFa7QMwBY6yZT8l24L1AX32"
            });

            await docRef.set(objMatch)
        }

        return objMatch;
    }
};

export const Match = {
    docId: (match: { docId: string; }) => match.docId,
    uid: (match: { uid: string; }) => match.uid,
    gameMoment: (match: { gameMoment: string; }) => match.gameMoment,
    game: (match: { game: string; }) => match.game,
    comments: (match: { comments: string; }) => match.comments
};
