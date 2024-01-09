import "dotenv/config.js";
import express from "express";
import session from "express-session";
import dbPool from "./database/mysql-config.js";
import cors from "cors";
import MongoDBStore from "connect-mongodb-session";
import terminalLink from "terminal-link";
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
import terminalLogs from "./middleware/logs.js";
import notFound from "./middleware/notFound-middleware.js";
import errorHandler from "./middleware/error-middleware.js";

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
const PORT = 4001;

app.listen(PORT, () => {
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

// app.enable("trust proxy");

// Setting cors
// app.use(
//   cors({
//     origin: "https://1740-114-79-6-41.ngrok-free.app/",
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//     credentials: true,
//   })
// );

const api = "https://3358-182-2-135-113.ngrok-free.app";
app.use(
  cors({
    origin: [api, "http://localhost:5173", "http://localhost:5174"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
    allowedHeaders: ["Content-Type", "ngrok-skip-browser-warning"],
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Loggin middleware
app.use("/", terminalLogs);

// BAGIAN MIDDLEWARE ROUTING API
app.use("/user", userRouter);

app.use("/dashboard", loginValidation, dashboardRouter);

app.use("/chat", chatRouter);
// app.use("/chat", loginValidation, chatRouter);

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

app.use(notFound);

app.use(errorHandler);
