import axios from 'axios';

export const Query = {
  games: async (_: any, { GameInput }: any) => {
    const games:any = await axios.get(`https://api.boardgameatlas.com/api/search?name=${GameInput.name}&pretty=true&client_id=fceBG35WbJ`);
    const gameList: Array<object> = [];

    let game:any;
    for (game of games.data.games) {
      gameList.push({
        name: game.name,
        objectId: game.id,
        yearPublished: game.year_published,
        description: game.description,
        mechanics: game.mechanics,
        categories: game.categories,
        artists: game.artists,
        designers: game.designers,
        publishers: game.publishers,
        rules_url: game.rules_url
      });
    }
    return gameList;
  },
  game: async (_: any, { uid }: any) => {

  }
};

export const Game = {
  name: (game: { name: string; }) => game.name,
  objectId: (game: { objectId: string; }) => game.objectId,
  yearPublished: (game: { yearPublished: string; }) => game.yearPublished
};
