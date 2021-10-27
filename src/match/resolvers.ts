import axios from 'axios';

export const Query = {
  matches: async (_: any, { uid }: any, { db }:any) => {
    const matches: Array<object> = [];

    const snapshot = await db.collection('matches')
      .orderBy('createdAt', 'desc').get();

    snapshot.forEach((doc: any) => {
      if (doc.data().uid === uid || doc.data().players.find((player:any) => player.uid === uid)) {
        matches.push({
          idDoc: doc.id,
          ...doc.data()
        });
      }
    });

    // const snapshot = await db.collection('matches')
    //   .where('uid', '==', uid)
    //   .orderBy('createdAt', 'desc').get();

    // const snapshot = await db.collection('matches')
    //   .where('players.uid', '==', uid)
    //   .orderBy('createdAt', 'desc').get();

    // snapshot.forEach((doc: any) => {
    //   matches.push({
    //     idDoc: doc.id,
    //     ...doc.data()
    //   });
    // });

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
  }
};

export const Match = {
  idDoc: (match: { idDoc: string; }) => match.idDoc,
  uid: (match: { uid: string; }) => match.uid,
  gameMoment: (match: { gameMoment: string; }) => match.gameMoment,
  game: (match: { game: string; }) => match.game,
  comments: (match: { comments: string; }) => match.comments
};
