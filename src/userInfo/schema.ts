const UserInfo = `
extend type Query {
    userInfo(id: ID!): UserInfo
    usersInfo: [UserInfo]
}
extend type Mutation {
    createUser(name: String!, repo: String!, age: Int!): UserInfo
}
type UserInfo {
    id: ID
    name: String
    repo: String
    age: Int
}
`;

export default () => [UserInfo];
