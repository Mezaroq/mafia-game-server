import {Schema, model} from "mongoose";
import {hashPassword} from "../../utils/encoders/password-encoder.util";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

const UserSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required: true,
    select: false
  },
  name: {
    type: Schema.Types.String,
    lowercase: true,
    trim: true,
    required: true
  },
  role: {
    type: UserRole,
    enum: UserRole,
    required: true,
    default: UserRole.USER
  },
  isConfirmed: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  isDeleted: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now()
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now(),
  }
});

UserSchema.pre("save", async function (next) {
  (this as any).password = await hashPassword((this as any).password);
  next();
});

export const User = model("users", UserSchema);
