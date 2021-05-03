// connection
const sequelize = require("../config/connection");
// import models we need to use
const { Post, User, Comment } = require("../models");
// use express router object
const router = require("express").Router();

// find all posts on homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }) .then((dbPostData) => { // map response and give us result of promise
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user chooses to login and this directs
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// similar to login but for new users to create account
router.get("/signup", (req, res) => {
  res.render("signup");
});

// directs to the post selected at the homepage
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id, // limited to specific id
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// direct to post and allow comments
router.get("/posts-comments", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("posts-comments", { post, loggedIn: req.session.loggedIn });
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
