import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import UserInfo from './userInfo/schema';
import Friend from './friend/schema';
import Game from './game/schema';
import Comment from './comment/schema';
import Match from './match/schema';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Base, UserInfo, Friend, Game, Comment, Match],
  resolvers,
  // @ts-ignore
  // eslint-disable-next-line no-undef
  logger: { log: e => console.log(e) }
});
