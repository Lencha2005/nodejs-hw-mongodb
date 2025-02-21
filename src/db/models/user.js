import { Schema, model } from "mongoose";
import { emailRegex } from "../../constants/index.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            match: emailRegex,
            unique: true,
            required: true,
        },
        password:{
            type: String,
            minlenght: 6,
            required: true,
        },
    },
        {
            timestamps: true,
            versionKey: false,
        }
);

userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

export const UsersCollection = model("users", userSchema);
