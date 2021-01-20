import {
    Query as UserQuery,
    Mutation as UserMutation,
    User
} from "./user/resolvers";

export default {
    Query: {
        ...UserQuery,
    },
    Mutation: {
        ...UserMutation,
    },
    User
}
