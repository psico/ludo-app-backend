import {db} from "../index";
import firebase from "firebase";
import axios from "axios";

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
    async createMatch(_: any, { MatchInput }: any) {
        console.log(MatchInput.objectId);
        let gameObject:any = await axios.get(`https://api.boardgameatlas.com/api/search?ids=${MatchInput.objectId}&pretty=true&client_id=fceBG35WbJ`);
        const docRef = db.collection('matches').doc();

        if (gameObject[0]) {
            docRef.set({
                uid: "1",
                gameMoment: MatchInput.gameMoment,
                game: {
                    name: gameObject[0].name,
                    objectId: MatchInput.objectId,
                    yearPublished: gameObject[0].year_published,
                }
            });
        } else {
            return null;
        }

        return {
            uid: "1",
            gameMoment: MatchInput.gameMoment,
            game: {
                name: MatchInput.game,
                objectId: MatchInput.game,
                yearPublished: MatchInput.game,
            }
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
