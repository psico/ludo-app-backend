import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import User from './user/schema';
import UserInfo from './userInfo/schema';
import Friend from './friend/schema';
import resolvers from './resolvers'


export default makeExecutableSchema({
    typeDefs: [Base, User, UserInfo, Friend],
    resolvers,
    logger: { log: e => console.log(e) },
})
