import mongoose from "mongoose";

let Schema = mongoose.Schema

let contactSchema = new Schema({
    contactId: {
        type: String,
    },
    groupNames: {
        type: [String]
    },
    userIds: {
        type: [String]
    }
})

let Contact = mongoose.model("contact", contactSchema);

export default Contact