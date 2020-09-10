import {Schema, model} from "mongoose";

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  token: {
    type: Schema.Types.String,
    required: true,
    unique: true
  }
});

export const Token = model('tokens', TokenSchema);
