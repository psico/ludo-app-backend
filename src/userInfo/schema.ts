const UserInfo = `
extend type Query {
    userInfo(uid: ID!): UserInfo
    usersInfo: [UserInfo]
}
extend type Mutation {
    createUser(uid: ID!, name: String!, friends: friend): UserInfo
}
type UserInfo {
    uid: ID
    name: String
    friends: [friend]
}
`;

export default () => [UserInfo];
