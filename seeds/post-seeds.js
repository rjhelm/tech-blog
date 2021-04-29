const { Post } = require('../models');

const postData = [{
        title: 'Lorem Ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        user_id: 1
    },
    {
        title: 'Lorem Ipsum 2',
        content: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
        user_id: 2
    },
    {
        title: 'Lorem Ipsum 3',
        content: 'Tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);


module.exports = seedPosts;