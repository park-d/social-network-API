const {Schema, Types} = require('mongoose');
const dateFormat = require('dateformat');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => dateFormat(time, "mmm dS, yyyy at hh:MM TT")
        }
    },
    {
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
