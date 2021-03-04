import { db } from "../index";

export const Query = {
    comments: async () => {
        let comments: Array<object> = [];

        // const snapshot = await db.collection("usersInfo").get();
        // snapshot.forEach((doc: any) => {
        //     comments.push(doc.data())
        // });

        return comments;
    },
    comment: async (_: any, {uid}: any) => {
        // const usersInfoRef = db.collection("usersInfo");
        // const snapshot = await usersInfoRef.where("uid","==", uid).get();

        return snapshot.docs[0].data();
    },
};

export const Mutation = {
    async createComment(_: any, { uid, name, comment }: any) {
        // const docRef = db.collection('usersInfo').doc();

        return docRef.set({
            uid: uid,
            name: name,
            comment: comment
        });
    }
};

export const Comment = {
    uid: (comment: { uid: string; }) => comment.uid,
    name: (comment: { name: string; }) => comment.name,
    comment: (comment: { comment: string; }) => comment.comment
};
