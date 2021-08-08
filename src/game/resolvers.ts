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
  game: async (_: any, { objectId }: any) => {
    const games:any = await axios.get(`https://api.boardgameatlas.com/api/search?ids=${objectId}&pretty=true&client_id=JLBr5npPhV`);

    let game:any = null;
    if (games.data.games[0]) {
      game = {
        name: games.data.games[0].name,
        objectId: games.data.games[0].id,
        yearPublished: games.data.games[0].year_published,
        description: games.data.games[0].description,
        mechanics: games.data.games[0].mechanics,
        categories: games.data.games[0].categories,
        artists: games.data.games[0].artists,
        designers: games.data.games[0].designers,
        publishers: games.data.games[0].publishers,
        rules_url: games.data.games[0].rules_url
      };
    }

    return game;
  }
};

export const Game = {
  name: (game: { name: string; }) => game.name,
  objectId: (game: { objectId: string; }) => game.objectId,
  yearPublished: (game: { yearPublished: string; }) => game.yearPublished
};
