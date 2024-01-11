const { Schema, model } = require('mongoose');
const {format_date} = require('../utils/helpers')
const reactionSchema = require( './Reactions')
// Schema to create Student model
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
     get: ts => format_date (ts)
    },
    username:{type:String,required:true},
    reactions: [reactionSchema],
    
  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function(){
  return this.reactions.length
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
