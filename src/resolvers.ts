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
import {
    Query as MatchQuery,
    Mutation as MatchMutation,
    Match
} from "./match/resolvers";

export default {
    Query: {
        ...UserInfoQuery,
        ...FriendQuery,
        ...MatchQuery
    },
    Mutation: {
        ...UserInfoMutation,
        ...FriendMutation,
        ...MatchMutation
    },
    UserInfo,
    Friend,
    Match
}
