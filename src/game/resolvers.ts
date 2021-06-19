import axios from "axios";

export const Query = {
    games: async () => {
        // let games: Array<object> = [];

        let games:any = await axios.get("https://api.boardgameatlas.com/api/search?name=Catan&pretty=true&client_id=fceBG35WbJ");
        let gameList: Array<object> = [];


        // @ts-ignore
        console.log("games => ", games.data.games[0].id);
        let game:any;
        for (game of games.data.games) {
            gameList.push({
                // @ts-ignore
                name: game.name,
                // @ts-ignore
                objectId: game.id,
                // @ts-ignore
                yearPublished: game.year_published,
            });
        }
        // @ts-ignore
        // console.log("gameList => ", gameList);
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
