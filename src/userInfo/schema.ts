import Friend from '../friend/schema';
import Base from '../base';

const UserInfo = `
extend type Query {
    usersInfo: [UserInfo]
    userInfo(uid: ID!): UserInfo
}
extend type Mutation {
    createUserInfo(uid: ID!, name: String!): UserInfo
}
type UserInfo {
    uid: ID
    name: String
    photoURL: String
    friends: [Friend]
    numberOfMatches: Int
    following: [Friend]
    followers: [Friend]
}
`;

export default () => [UserInfo, Friend, Base];
