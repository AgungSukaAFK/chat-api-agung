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
import adminRouter from "./router/admin-router.js";

let mongoDBStoreSession = MongoDBStore(session);

let store = new mongoDBStoreSession({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

const app = express();

app.listen(4000, () => {
    console.log(`Service listening on PORT 4000 ...`)
})

app.use(cors({
    origin: "https://localhost:5173",
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// app.use(cookieParser("secret"))

app.set("trust proxy", 1)

app.use(session({
    name: "ao-chat",
    secret: "secret",
    store: store,
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: 'auto',
        maxAge: 1000 * 60 * 10,
        sameSite: "none"
    }
}))



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


const userr = (req, res, next) => {
    if(req.session.user){
        console.log(`Dari middleware: ${req.session}`)
        next()
    } else {
        // res.redirect("/login")
        // console.log("Sesi chat: " + req.session);
        res.json({
            session: req.session,
            message: "fail"
        })
    }
}

app.use("/chat", userr, (chatRouter));

app.use("/admin", (req, res, next) => {
    if(req.session.user){
        if(req.session.user.userId == "admin"){
            next();
        } else {
            res.status(404).json({
                message: "Lol, nope"
            })
        }
    } else {
        res.status(404).json({
            message: "Lol, nope"
        })
    }
},(adminRouter))

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
