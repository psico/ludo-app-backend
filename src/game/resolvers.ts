import axios from "axios";

export const Query = {
    games: async () => {
        let games: Array<object> = [];

        games = await axios.get("");

        return games;
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
