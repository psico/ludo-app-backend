import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import User from './user/schema';
import resolvers from './resolvers'

export default makeExecutableSchema({
    typeDefs: [Base, User],
    resolvers,
    logger: { log: e => console.log(e) },
})
