const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction.js');
const dateFormat = require('dateformat');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => dateFormat(time, "mmm dS, yyyy ...at... hh:MM TT")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
