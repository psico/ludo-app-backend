import Friend from '../friend/schema';
import Base from '../base';

const UserInfo = `
extend type Query {
    usersInfo(textSearch: String): [UserInfo]
    userInfo(uid: ID!): UserInfo
    userExperienceInfo(uid: ID!): ExperienceInfo 
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
    logExperience: [LogExperience]
}

type LogExperience {
  gained: Int
  gameName: String
  type: String
  createdAt: String
}

type ExperienceInfo {
  totalExperience: Int
  level: Int
  nextLevelExperience: Int
}

`;

export default () => [UserInfo, Friend, Base];
