import Game from '../game/schema';

const Match = `
extend type Query {
    matchs: [Match]
    match(idDoc: String!): Match
}
extend type Mutation {
    createMatch(gameMoment: String!): Match
}
type Match {
    uid: String
    gameMoment: String
    game: Game
}
`;

export default () => [Match, Game];
