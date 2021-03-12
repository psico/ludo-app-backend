import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import UserInfo from './userInfo/schema';
import Friend from './friend/schema';
import Match from './match/schema';
import Game from './game/schema';
import resolvers from './resolvers';


export default makeExecutableSchema({
    typeDefs: [Base, UserInfo, Friend, Game, Match],
    resolvers,
    logger: { log: e => console.log(e) },
})
