import axios from "axios";

export const Query = {
    games: async (_: any, { gameName }: any) => {
        console.log("gameName ==> ", gameName);
        let games:any = await axios.get(`https://api.boardgameatlas.com/api/search?name=${gameName}&pretty=true&client_id=fceBG35WbJ`);
        let gameList: Array<object> = [];

        let game:any;
        for (game of games.data.games) {
            gameList.push({
                // @ts-ignore
                name: game.name,
                // @ts-ignore
                objectId: game.id,
                // @ts-ignore
                yearPublished: game.year_published,
                // @ts-ignore
                description: game.description,
                // @ts-ignore
                mechanics: game.mechanics,
                // @ts-ignore
                categories: game.categories,
                // @ts-ignore
                artists: game.artists,
                // @ts-ignore
                designers: game.designers,
                // @ts-ignore
                publishers: game.publishers,
                // @ts-ignore
                rules_url: game.rules_url,
                // @ts-ignore
                rules_url: game.rules_url,
            });
        }
        return gameList;
    },
    game: async (_: any, {uid}: any) => {

    },
};

export const Mutation = {
    async createGame(_: any, { gameMoment }: any) {

    }
};

export const Game = {
    name: (game: { name: string; }) => game.name,
    objectId: (game: { objectId: string; }) => game.objectId,
    yearPublished: (game: { yearPublished: string; }) => game.yearPublished
};
