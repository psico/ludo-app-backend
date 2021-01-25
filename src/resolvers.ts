import {
    Query as UserQuery,
    Mutation as UserMutation,
    User
} from "./user/resolvers";
import {
    Query as UserInfoQuery,
    Mutation as UserInfoMutation,
    UserInfo
} from "./userInfo/resolvers";

export default {
    Query: {
        ...UserQuery,
        ...UserInfoQuery,
    },
    Mutation: {
        ...UserMutation,
        ...UserInfoMutation,
    },
    User,
    UserInfo
}
