import commentsModel from './commentsModel.js'

export const getAllCommentsByItem = (itemId, itemType) => {
    return commentsModel.find({itemType, itemId});
};

export const getAllCommentsByUsername = (username) => {
    return commentsModel.find({username});
};

export const createComment = (comment) => {
    return commentsModel.create(comment);
};

export const updateComment = (commentId, comment) => {
    return commentsModel.updateOne({ _id: commentId }, comment);
};

export const deleteComment = (commentId) => {
    return commentsModel.deleteOne({ _id: commentId });
};
