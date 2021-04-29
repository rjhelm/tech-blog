const { User } = require('../models');

const userData = [{
        userName: 'Rick',
        password: 'morty'
    },
    {
        username: 'Morty',
        password: 'rick'
    },
    {
        username: 'Donovan',
        password: 'spida'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;