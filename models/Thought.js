// requiring npm packages
const {Schema, model} = require('mongoose');
//using dayjs npm package in order to format the date properly
const dayjs = require('dayjs')
// using the advanced format plugin to use "Do" from Dayjs
var AdvancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(AdvancedFormat); 
// including the subdocument Reaction in the Thought model
const Reaction = require('./Reaction');

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
            get: (time) => dayjs(time).format("MMM Do, YYYY [at] hh:mm A")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        // Here we are indicating that we want virtuals and getters to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// creating the virtual here, reactionCount is the length of the reactions array
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
