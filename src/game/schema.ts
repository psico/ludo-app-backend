const Game = `
extend type Query {
    games(gameName: String!): [Game]
    game(idDoc: String!): Game
}
extend type Mutation {
    createGame(gameMoment: String!): Game
}
type Game {
    name: String
    objectId: String
    yearPublished: String
    description: String
}
`;

export default () => [Game];
