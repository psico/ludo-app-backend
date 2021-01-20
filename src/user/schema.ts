const User = `
extend type Query {
    user(id: ID!): User
    users: [User]
}
extend type Mutation {
    createUser(name: String!, repo: String!, age: Int!): User
}
type User {
    id: ID
    name: String
    repo: String
    age: Int
}
`;

export default () => [User];
