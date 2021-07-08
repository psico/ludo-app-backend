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

        const request:any = await axios.get(`https://api.boardgameatlas.com/api/search?ids=${MatchInput.gameObjectId}&pretty=true&client_id=fceBG35WbJ`);
        const userData: firebase.User | null = await firebase.auth().currentUser;
        const docRef = db.collection('matches').doc();

        let gameObject = null;
        if (request.data) {
            gameObject = request.data.games[0]
        }

        if (gameObject && userData) {
            await docRef.set({
                uid: userData.uid,
                gameMoment: MatchInput.gameMoment,
                game: {
                    name: gameObject.name,
                    imageUrl: gameObject.image_url,
                    objectId: MatchInput.gameObjectId
                },
                players: MatchInput.players,
                createdAt: new Date()
            });
        } else {
            console.error("Erro on data or user wasn't logged");
            return null;
        }

        return {
            idDoc: docRef.id,
            uid: userData.uid,
            gameMoment: MatchInput.gameMoment,
            game: {
                name: gameObject.name,
                objectId: MatchInput.gameObjectId,
                yearPublished: gameObject.year_published,
                description: gameObject.description,
            },
            comments: [],
            players: [],
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
