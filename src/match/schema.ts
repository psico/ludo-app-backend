import Game from '../game/schema';
import Comment from '../comment/schema';
import Friend from '../friend/schema';

const Match = `
extend type Query {
    matches: [Match]
    match(idDoc: String!): Match
}
extend type Mutation {
    createMatch(uid: String!, gameMoment: String!, game: String!): Match
    addComment(idDoc: String!, text: String! ): Match
}
type Match {
    uid: String
    gameMoment: String
    game: Game
    comments: [Comment]
    players: [Friend] 
}
`;

export default () => [Match, Game, Comment, Friend];
