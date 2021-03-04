const Comment = `
extend type Query {
    comment(uid: ID!): Comment
    comments: [Comment]
}
extend type Mutation {
    createComment(uid: ID!, name: String!, comment: String!): Comment
}
type Comment {
    uid: ID
    name: String
    comment: String
}
`;

export default () => [Comment];
