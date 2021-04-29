const { Comment } = require('../models');

const commentData = [{
    comment_text: "Lorem ipsum sequdn lors gofs",
    user_id: 1,
    post_id: 1
    },
    {
        comment_text: "filleouj kilsdd kdfor",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "dees od sdein ut labore et dolore magna aliqua",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;