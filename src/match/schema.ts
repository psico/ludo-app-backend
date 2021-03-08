const Match = `
extend type Query {
    matchs: [Match]
    match(gameMoment: String!): Match
}
extend type Mutation {
    createMatch(gameMoment: String!): Match
}
type Match {
    gameMoment: String
}
`;

export default () => [Match];
