import Friend from '../friend/schema';
import Base from '../base';

const UserInfo = `
extend type Query {
    usersInfo: [UserInfo]
    userInfo(uid: ID!): UserInfo
}
extend type Mutation {
    createUserInfo(uid: ID!, name: String!, friends: String): UserInfo
}
type UserInfo {
    uid: ID
    name: String
    friends: [Friend]
}
`;

export default () => [UserInfo, Friend, Base];
