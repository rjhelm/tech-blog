// Import our models 
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create an association between our models
User.hasMany(Post, {
    foreignKey: 'user_id' // allows users to have multiple posts
});

Post.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: "cascade" // cascade for foriegn key that does not allow null values
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

module.exports = { User, Post, Comment };