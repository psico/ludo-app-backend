const Friend = `
extend type Query {
    friend(uid: ID!): Friend
    friends: [Friend]
}
extend type Mutation {
    createFriend(uid: ID!, name: String!): Friend
}
type Friend {
    uid: ID
    name: String
}
`;

export default () => [Friend];
