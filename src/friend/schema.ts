const Friend = `
extend type Query {
    friends: [Friend]
    friend(uid: ID!): Friend    
}
extend type Mutation {
    createFriend(uid: ID!, name: String!): Friend
    follow(followUid: ID!): Friend
}
type Friend {
    uid: ID
    name: String
}
`;

export default () => [Friend];
