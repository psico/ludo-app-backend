export const Comment = {
    uid: (comment: { uid: string; }) => comment.uid,
    name: (comment: { name: string; }) => comment.name,
    comment: (comment: { comment: string; }) => comment.comment
};
