import {
    Query as UserInfoQuery,
    Mutation as UserInfoMutation,
    UserInfo
} from "./userInfo/resolvers";
import {
    Query as FriendQuery,
    Mutation as FriendMutation,
    Friend
} from "./friend/resolvers";

export default {
    Query: {
        ...UserInfoQuery,
        ...FriendQuery
    },
    Mutation: {
        ...UserInfoMutation,
        ...FriendMutation
    },
    UserInfo,
    Friend
}
