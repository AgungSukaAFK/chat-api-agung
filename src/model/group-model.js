import mongoose from "mongoose";

let Schema = mongoose.Schema;

// Khusus private group, groupname akan dibuat otomatis
let groupSchema = new Schema({
    groupName: {
        type: String,
    },
    kind: {
        type: String
    },
    chatAddress: {
        type: String
    },
    userIds: {
        // HANYA UNTUK PRIVATE KIND
        type: [String]
    }
})

groupSchema.pre('save', function(next){
    this.chatAddress = this.groupName;
    next();
});

let Group = mongoose.model("group", groupSchema);

export default Group