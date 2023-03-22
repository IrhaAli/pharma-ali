const router = require("express").Router();
const addComment = require("../db/queries/add-comment");
const deleteComment = require("../db/queries/delete-comment")

module.exports = db => {
  // Get comments for a blog
  router.get("/", (request, response) => {
    getComments.getComments(db, request.url.split('=')[1])
      .then((data) => {
        response.json({ rows: data.rows });
      }).catch((e) => {
        console.log(e);
      })
  });

  // Add a comment to the blog
  router.post("/add", (req, res) => {
    addComment.addComment(db, req.body.user_id, req.body.comment, req.body.blog_id)
      .then((data) => {
        return res.json({ comment_id:data.rows[0].id });
      })
  });

  // Remove a comment from th blog
  router.post("/delete", (req, res) => {
    const comment_id = Object.keys(req.body)[0];
    deleteComment.deleteComment(db, comment_id)
    .then(() => {
      res.send(200);
    })
  });

  return router;
};