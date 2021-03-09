// const Game = `
// extend type Query {
//     friend(gameMoment: String!): Game
// }
// extend type Mutation {
//     createGame(gameMoment: String!): Game
// }
// type Game {
//     gameMoment: String
// }
// `;

const Game = `
type Game {
    name: String
    objectId: String
    yearPublished: Number
}
`;

export default () => [Game];
