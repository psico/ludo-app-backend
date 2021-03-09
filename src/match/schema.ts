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
}
`;

export default () => [Match];
