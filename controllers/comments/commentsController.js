import * as commentsDao from "./commentsDao.js";

const CommentsController = (app) => {
  const getAllCommentsByItem = async (req, res) => {
    const comments = await commentsDao.getAllCommentsByItem(
      req.params.itemId,
      req.params.itemType
    );
    res.json(comments);
  };

  const getAllCommentsByUsername = async (req, res) => {
    const comments = await commentsDao.getAllCommentsByUsername(
      req.params.username
    );
    res.json(comments);
  };

  const createComment = async (req, res) => {
    const comment = await commentsDao.createComment(req.body);
    res.json(comment);
  };

  const updateComment = async (req, res) => {
    const comment = await commentsDao.updateComment(
      req.params.commentId,
      req.body
    );
    res.json(comment);
  };

  const deleteComment = async (req, res) => {
    const comment = await commentsDao.deleteComment(req.params.commentId);
    res.json(comment);
  };

  app.get("/api/comments/:itemType/:itemId", getAllCommentsByItem);
  app.get("/api/comments/:username", getAllCommentsByUsername);
  app.post("/api/comments", createComment);
  app.put("/api/comments/:commentId", updateComment);
  app.delete("/api/comments/:commentId", deleteComment);
};

export default CommentsController;
