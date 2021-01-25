import Friend from '../friend/schema';
import Base from '../base';

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
    friends: [Friend]
}
`;

export default () => [UserInfo, Friend, Base];
