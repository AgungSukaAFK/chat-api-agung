import "dotenv/config.js";
import express from "express";
import session from "express-session";
import dbPool from "./database/mysql-config.js";
import cors from "cors";
import MongoDBStore from "connect-mongodb-session";

// Config imports
import ansiColor from "./config/ansiColor.js";
const ANSICOLOR = ansiColor;

// Router Imports
import userRouter from "./router/user-router.js";
import chatRouter from "./router/chat-router.js";
import adminRouter from "./router/admin-router.js";
import contactRouter from "./router/contact-router.js";
import dashboardRouter from "./router/dashboard-router.js";
import groupRouter from "./router/group-router.js";

// Middleware imports
import loginValidation from "./middleware/loginValidation.js";
import adminValidation from "./middleware/adminValidation.js";

// session store config
let mongoDBStoreSession = MongoDBStore(session);

let store = new mongoDBStoreSession({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

// Starting server
const app = express();

app.listen(4000, () => {
  console.clear();
  console.log(
    `${ANSICOLOR.yellow}Halo, selamat datang di ${ANSICOLOR.blue}AchPI${
      ANSICOLOR.yellow
    } V1.0 OMEGA${ANSICOLOR.reset} by ${ANSICOLOR.blue}${terminalLink(
      "Agung@AgungSukaAFK",
      "https://www.github.com/AgungSukaAFK"
    )}${ANSICOLOR.reset}`
  );
  console.log("API chat menggunakan database MySQL");
  console.log(`Server is listening on port: ${PORT}`);
  // console.log("--------------------------")
  console.log("----------- LOGS ---------");
});

// Setting cors
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(cookieParser("secret"))

app.set("trust proxy", 1);

// Setting cookie
app.use(
  session({
    name: "AchPI 2.1",
    secret: "secret",
    store: store,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60, // 1000ms * 60 * 60 =  1 jam
      sameSite: "none",
    },
  })
);

// BAGIAN MIDDLEWARE ROUTING API
app.use("/user", userRouter);

app.use("/dashboard", loginValidation, dashboardRouter);

app.use("/chat", loginValidation, chatRouter);

app.use("/admin", adminValidation, adminRouter);

app.use("/contact", loginValidation, contactRouter);

app.use("/group", loginValidation, groupRouter);

// kontak sudah: bisa tambah kontak, gabisa nambah diri sendiri, gabisa nambah kontak yang udah ada, next mungkin delete contact?
// NEXT: urusin bikin private group buat conversation 2 user alias chatan normal.

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "AchPI",
    versi: "2.1 OMEGA",
    api_status: "ALL GOOD :)",
  });
});

// Ngambil semua route selain diatas
app.use("/*", (req, res, next) => {
  res.status(404).json({
    data: {
      message: "Page not found",
    },
  });
});
