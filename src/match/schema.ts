import Game from '../game/schema';
import Comment from '../comment/schema';
import UserInfo from '../userInfo/schema';

const Match = `
extend type Query {
    matches: [Match]
    match(idDoc: String!): Match
}
extend type Mutation {
    createMatch(MatchInput: MatchInput): Match
    addComment(CommentInput: CommentInput): Match
}
type Match {
    idDoc: String
    uid: String
    gameMoment: String
    game: Game
    comments: [Comment]
    players: [UserInfo] 
}
input MatchInput {
    gameMoment: String
    game: String
}

input CommentInput {
  idDoc: String
  text: String
}
`;

export default () => [Match, Game, Comment, UserInfo];
