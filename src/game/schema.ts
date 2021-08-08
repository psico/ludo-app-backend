const Game = `
extend type Query {
    games(GameInput: GameInput): [Game]
    game(idDoc: String!): Game
}

type Game {
    name: String
    objectId: String
    yearPublished: String
    description: String
    imageUrl: String
}

input GameInput {
  name: String
}
`;

export default () => [Game];
