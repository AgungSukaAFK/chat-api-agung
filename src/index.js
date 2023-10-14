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
import contactRouter from "./router/contact-router.js";
import groupRouter from "./router/group-router.js";

let mongoDBStoreSession = MongoDBStore(session);

let store = new mongoDBStoreSession({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

const app = express();

// Nyalain server
app.listen(4000, () => {
    console.log(`Service listening on PORT 4000 ...`)
})

// Setting cors
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

// Setting cookie
app.use(session({
    name: "ao-chat",
    secret: "secret",
    store: store,
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: 'auto',
        maxAge: 1000 * 60 * 60, // 1000ms * 60 * 60 =  1 jam
        sameSite: "none"
    }
}))

// BAGIAN MIDDLEWARE KHUSUS
const loginValidation = (req, res, next) => {
    if(req.session.user){
        console.log(`Dari middleware: ${req.session}`)
        next()
    } else {
        res.json({
            message: "No login detected"
        })
    }
}

const adminValidation = (req, res, next) => {
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
}

// BAGIAN MIDDLEWARE ROUTING API
app.use("/user", (userRouter));

app.use("/dashboard", (dashboardRouter));

app.use("/chat", loginValidation, (chatRouter));

app.use("/admin", adminValidation,(adminRouter));

app.use("/contact", loginValidation, (contactRouter));

app.use("/group", loginValidation, (groupRouter));

// kontak sudah: bisa tambah kontak, gabisa nambah diri sendiri, gabisa nambah kontak yang udah ada, next mungkin delete contact?
// NEXT: urusin bikin private group buat conversation 2 user alias chatan normal.

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "ACHATT API V2",
        api_status: "ALL GOOD :)"
    })
})

// Ngambil semua route selain diatas
app.use("/*", (req, res, next) => {
    res.status(404)
    .json({
        "data": {
            message: "Page not found"
        }
    });
})