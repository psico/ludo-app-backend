import Game from '../game/schema';
import Comment from '../comment/schema';
import UserInfo from '../userInfo/schema';

const Match = `
extend type Query {
    matches(uid: ID, textSearch: String): [Match]
    match(idDoc: String!): Match
}
extend type Mutation {
    createMatch(MatchInput: MatchInput): Match
    addComment(CommentInput: CommentInput): Match
}

type Match {
    idDoc: String
    matchOwner: UserSummary
    gameMoment: String
    createdAt: Date
    game: Game
    comments: [Comment]
    players: [UserInfo] 
}

type UserSummary {
    uid: ID
    name: String
    photoURL: String
}

input MatchInput {
    gameMoment: String
    gameObjectId: String
    players: [PlayerInput]
}

input CommentInput {
  idDoc: String
  text: String
}

input PlayerInput {
  uid: String
  name: String
  photoURL: String
}
`;

export default () => [Match, Game, Comment, UserInfo];
