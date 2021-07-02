import {db} from "../index";
import firebase from "firebase";

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
    createMatch(_: any, { MatchInput }: any) {
        console.log(MatchInput);
        const docRef = db.collection('matches').doc();

        docRef.set({
            uid: "1",
            gameMoment: MatchInput.gameMoment,
            game: MatchInput.game
        });

        return {
            uid: "1",
            gameMoment: MatchInput.gameMoment,
            game: MatchInput.game
        };
    },

    async addComment(_: any, { CommentInput }: any ) {
        const userData: any = await firebase.auth().currentUser;
        const docRef = db.collection('matches').doc(CommentInput.idDoc);
        const snapshot = await docRef.get();
        let objMatch = snapshot.data();

        if (CommentInput.text && objMatch && userData) {
            let comments = [];
            if (objMatch.comments) {
                comments = objMatch.comments;
            }

            comments.push({
                    comment: CommentInput.text,
                    name: userData.displayName ?? userData.email,
                    photoURL: userData.photoURL,
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
