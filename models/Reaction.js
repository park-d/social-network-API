// requiring npm packages
const {Schema, Types} = require('mongoose');
const dayjs = require('dayjs')

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
            get: (time) => dayjs(time).format("mmm Do, YYYY [at] hh:mm A")
        }
    },
    {
        // Here we are indicating that we want getters to be included with our response, overriding the default behavior
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
