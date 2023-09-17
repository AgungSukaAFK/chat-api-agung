console.clear();
import "dotenv/config.js";
import express from "express";
import userRouter from "./router/user-router.js";
import dashboardRouter from "./router/dashboard-router.js";
import chatRouter from "./router/chat-router.js";
import session from "express-session";
import mongodb from "./database/mongodb.js";
import cors from "cors"
import MongoDBStore from "connect-mongodb-session";

let mongoDBStoreSession = MongoDBStore(session);

let store = new mongoDBStoreSession({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
  });

  store.on('error', function(error) {
    console.log(error);
  });

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: "Kucing oren",
    store: store,
    saveUninitialized: false,
    resave: false
}))

app.listen(4000, () => {
    console.log(`Service listening on PORT 4000 ...`)
})

app.use("/user", (userRouter));

app.use("/dashboard", (dashboardRouter));


app.get("/login", (req, res) => {
    let from = req.query.from;
    let message;
    if(from == "chat"){
        message = "Silahkan login dulu untuk masuk ke halaman chat"
    } else if(from == "dashboard"){
        message = "Silahkan login dulu untuk mengakses dashboard"
    } else {
        message = "Welcome to login"
    }
    res.json({
        message
    })
})

app.use("/chat", (chatRouter));

app.get("/", (req, res) => {
    res.json({
        message: "Api working"
    })
})

app.use("/*", (req, res, next) => {
    res.status(404)
    .json({
        "data": {
            message: "Page not found"
        }
    });
})
