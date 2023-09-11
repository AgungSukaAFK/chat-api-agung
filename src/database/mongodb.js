import mongoose from "mongoose";
import "dotenv/config.js"
// import userSchema from "../model/user-model.js";
// import chatSchema from "../model/chats-model.js";

console.log("Connecting to database...")

export default mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connection succesfully");
})
.catch((err) => {
    console.log(err);
});

// let user = mongoose.model("user", userSchema);

// let chat = mongoose.model("chat", chatSchema) nanti buat export model terpisah filenya

// export default user