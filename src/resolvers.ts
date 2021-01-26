import {
    Query as UserQuery,
    Mutation as UserMutation,
    User
} from "./user/resolvers";
// import {
//     Query as UserInfoQuery,
//     Mutation as UserInfoMutation,
//     UserInfo
// } from "./userInfo/resolvers";
import {
    Query as FriendQuery,
    Mutation as FriendMutation,
    Friend
} from "./friend/resolvers";

export default {
    Query: {
        ...UserQuery,
        // ...UserInfoQuery,
        ...FriendQuery
    },
    Mutation: {
        ...UserMutation,
        // ...UserInfoMutation,
        ...FriendMutation
    },
    User,
    // UserInfo,
    Friend
}
