import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
export default app;

dotenv.config({
  path: "./config/config.env",
});

//Using middlewares

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 1000ms * 60s * 60min * 2hrs
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000" ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));



app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.enable("trust proxy");

connectPassport();

import userRoute from "./routes/User.js";
import lockerRoute from "./routes/Locker.js";
import projectRoute from "./routes/Project.js";
import textRoute from './routes/TextFile.js';
// import jobRoute from './routes/Job.js';
// import queRoute from './routes/Qura.js';

app.use("/port/v1", userRoute);
app.use("/port/v1", lockerRoute);
app.use("/port/v1", projectRoute);
app.use("/port/v1", textRoute);
// app.use("/acc/v1", jobRoute);
// app.use("/acc/v1", queRoute);

app.use(errorMiddleware);
