import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

export default makeExecutableSchema({
    typeDefs: [],
    resolvers,
    logger: { log: e => console.log(e) },
})
