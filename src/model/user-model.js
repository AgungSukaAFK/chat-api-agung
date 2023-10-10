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
    photoIndex: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        default: "Hello there, i'm using AoChat app!" 
    },
    contactId: {
        type: String,
    },
    online: {
        type: Boolean,
        default: false
    },

});

userSchema.pre('save', function(next) {
    this.contactId = this.userId;
    next();
});

let User = mongoose.model("user", userSchema);

export default User