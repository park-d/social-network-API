const connection = require('../config/connection');
const {Thought, User} = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

    // Add students to the collection and await the results
    await User.collection.insertMany([
        {
            username: "Devan",
            email: "devan@email.com"
        },
        {
            username: "Roy",
            email: "roy@email.com"
        },
        {
            username: "Jackson",
            email: "Jackson@email.com"
        },]);
    
    // Log out the seed data to indicate what should appear in the database
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
