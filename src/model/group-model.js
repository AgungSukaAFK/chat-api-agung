import mongoose from "mongoose";

let Schema = mongoose.Schema;

let groupSchema = new Schema({
    groupName: {
        type: string,
        required: true
    },
    kind: {
        type: String
    },
    chatAddress: {
        type: String
    }
})

groupSchema.pre('save', function(next){
    this.chatAddress = this.groupName;
    next();
});

let Group = mongoose.model("group", groupSchema);

// export default Group;