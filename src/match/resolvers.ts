import {auth, db} from "../index";

export const Query = {
    matches: async () => {
        let matches: Array<object> = [];

        const snapshot = await db.collection("matches").get();

        snapshot.forEach((doc: any) => {

            matches.push({
                idDoc: doc.id,
                ...doc.data(),
            });
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
    async addComment(_: any, { idDoc, uid, text }: any ) {
        console.log("UID: ", uid);

        const userData = await auth.getUser(uid);
        const docRef = db.collection('matches').doc(idDoc);
        const snapshot = await docRef.get();
        let objMatch = snapshot.data();

        if (text && objMatch && userData) {
            let comments = [];
            if (objMatch.comments) {
                comments = objMatch.comments;
            }

            comments.push({
                    comment: text,
                    name: userData.displayName,
                    uid: userData.uid
            })

            objMatch.comments = comments;

            await docRef.set(objMatch)
        }

        return objMatch;
    }
};

export const Match = {
    idDoc: (match: { idDoc: string; }) => match.idDoc,
    uid: (match: { uid: string; }) => match.uid,
    gameMoment: (match: { gameMoment: string; }) => match.gameMoment,
    game: (match: { game: string; }) => match.game,
    comments: (match: { comments: string; }) => match.comments
};
