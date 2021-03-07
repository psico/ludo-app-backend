const Game = `
extend type Query {
    friend(gameMoment: String!): Game
}
extend type Mutation {
    createGame(gameMoment: String!): Game
}
type Game {
    gameMoment: String
}
`;

export default () => [Game];
