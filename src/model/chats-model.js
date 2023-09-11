import mongoose from "mongoose";

const Schema = mongoose.Schema;

let chatSchema = new Schema({
    server: {
        type: String,
        required: true
    },
    chats: [{
        _id: false,
        chat: {
            type: String
        },
        from: {
            type: String
        },
        date: {
            type: String
        }
    }]
});

let chat = mongoose.model("chat", chatSchema)

export default chat