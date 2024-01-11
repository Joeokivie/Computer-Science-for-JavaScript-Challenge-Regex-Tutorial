const { Schema, Types } = require('mongoose');

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
    createdAt: {
      type: Date,
      default: Date.now,
     get: ts => format_date (ts)
    },
    username:{type:String,required:true},
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    _id: false,
  }
);

module.exports = reactionSchema;
