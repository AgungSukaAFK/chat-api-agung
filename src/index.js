console.clear();
import "dotenv/config.js";
import express from "express";
import userRouter from "./router/user-router.js";
import dashboardRouter from "./router/dashboard-router.js";
import chatRouter from "./router/chat-router.js";
import session from "express-session";
import mongodb from "./database/mongodb.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: "Kucing oren",
    cookie: {maxAge: 1000*60*60},
    saveUninitialized: true,
    resave: false
}))

app.listen(4000, () => {
    console.log(`Service listening on PORT 4000 ...`)
})

app.use("/user", (userRouter));

app.use("/chat-api-agung.vercel.app/dashboard", (dashboardRouter));

app.get("/chat-api-agung.vercel.app/", (req, res) => {
    res.json({
        message: "Api working"
    })
})

app.use("/chat", (chatRouter));

app.use("/*", (req, res, next) => {
    res.status(404)
    .json({
        "data": {
            message: "Page not found"
        }
    });
})
