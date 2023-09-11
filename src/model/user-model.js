import mongoose from "mongoose";

const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    photoIndex: {
        type: Number,
        default: 1
    },
    status: {
       type: String,
       default: "Hello there, i'm using AoChat app!" 
    }
});

let user = mongoose.model("user", userSchema);

export default user