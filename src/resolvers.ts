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
    Query as GameQuery,
    Mutation as GameMutation,
    Game
} from "./game/resolvers";
import {
    Query as CommentQuery,
    Mutation as CommentMutation,
    Comment
} from "./comment/resolvers";
import {
    Query as MatchQuery,
    Mutation as MatchMutation,
    Match
} from "./match/resolvers";

export default {
    Query: {
        ...UserInfoQuery,
        ...FriendQuery,
        ...GameQuery,
        ...CommentQuery,
        ...MatchQuery
    },
    Mutation: {
        ...UserInfoMutation,
        ...FriendMutation,
        ...GameMutation,
        ...CommentMutation,
        ...MatchMutation
    },
    UserInfo,
    Friend,
    Game,
    Comment,
    Match
}
