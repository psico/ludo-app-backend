import axios from 'axios';
import { addExperience } from '../util/util';

export const Query = {
  // @TODO it`s necessary to improve code to use query to search filter
  matches: async (_: any, { uid, textSearch }: any, { db }:any) => {
    let matches: Array<object> = [];

    const snapshot = await db.collection('matches').orderBy('createdAt', 'desc').get();

    snapshot.forEach((doc: any) => {
      if (uid) {
        if (doc.data().uid === uid || doc.data().players?.find((player:any) => player.uid === uid)) {
          matches.push({
            idDoc: doc.id,
            ...doc.data()
          });
        }
      } else {
        matches.push({
          idDoc: doc.id,
          ...doc.data()
        });
      }
    });

    if (textSearch) {
      matches = matches.filter((match: any) => {
        let searchResult = false;

        if (match.matchOwner?.name && match.matchOwner?.name?.toUpperCase().search(textSearch.toUpperCase()) !== -1) {
          searchResult = true;
        }

        if (match.game?.name && match.game?.name?.toUpperCase().search(textSearch.toUpperCase()) !== -1) {
          searchResult = true;
        }

        if (match.game?.description && match.game?.description?.toUpperCase().search(textSearch.toUpperCase()) !== -1) {
          searchResult = true;
        }

        return searchResult;
      });
    }

    return matches;
  },
  match: async (_: any, { idDoc }: any, { db }:any) => {
    const snapshot = await db.collection('matches').doc(idDoc).get();

    return snapshot.data();
  }
};

export const Mutation = {
  async createMatch (_: any, { MatchInput }: any, { db, firebase }:any) {
    const request: any = await axios.get(`https://api.boardgameatlas.com/api/search?ids=${MatchInput.gameObjectId}&pretty=true&client_id=fceBG35WbJ`);
    const userData: any = await firebase.auth().currentUser;
    const docRef = db.collection('matches').doc();

    let gameObject = null;
    if (request.data) {
      gameObject = request.data.games[0];
    }

    if (gameObject && userData) {
      await docRef.set({
        matchOwner: {
          uid: userData.uid,
          name: userData.displayName,
          photoURL: userData.photoURL
        },
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

    await addExperience({ db, experienceType: 'Single Match', game: { name: gameObject.name, objectId: MatchInput.gameObjectId } });

    return {
      idDoc: docRef.id,
      matchOwner: {
        uid: userData.uid,
        name: userData.displayName,
        photoURL: userData.photoURL
      },
      gameMoment: MatchInput.gameMoment,
      game: {
        name: gameObject.name,
        objectId: MatchInput.gameObjectId,
        yearPublished: gameObject.year_published,
        description: gameObject.description
      },
      comments: [],
      players: []
    };
  },

  async addComment (_: any, { CommentInput }: any, { db, firebase }:any) {
    const userData: any = await firebase.auth().currentUser;
    const docRef = db.collection('matches').doc(CommentInput.idDoc);
    const snapshot = await docRef.get();
    const objMatch = snapshot.data();

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
      });

      objMatch.comments = comments;

      await docRef.set(objMatch);
    }

    return objMatch;
  },

  async likeIt (_: any, { idDoc }: any, { db, firebase }: any) {
    const userData: any = await firebase.auth().currentUser;
    const docRef = db.collection('matches').doc(idDoc);

    const snapshot = await docRef.get();
    const objMatch = snapshot.data();

    if (idDoc && objMatch && userData) {
      let likes = [];
      if (objMatch.likes) {
        likes = objMatch.likes;
      }

      likes.push({
        name: userData.displayName ?? userData.email,
        photoURL: userData.photoURL,
        uid: userData.uid
      });

      objMatch.likes = likes;

      await docRef.set(objMatch);
    }

    return objMatch;
  }
};

export const Match = {
  idDoc: (match: { idDoc: string; }) => match.idDoc,
  matchOwner: (match: { matchOwner: string; }) => match.matchOwner,
  gameMoment: (match: { gameMoment: string; }) => match.gameMoment,
  game: (match: { game: string; }) => match.game,
  comments: (match: { comments: string; }) => match.comments
};
