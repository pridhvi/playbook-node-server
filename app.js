import axios from "axios";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import IgdbApiController from "./controllers/igdbController.js";
import UserController from "./controllers/users/usersController.js";
import SessionController from './controllers/sessionController.js'

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/playbook'

mongoose.connect(CONNECTION_STRING)

const app = express();
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  session({
    secret: "asdfasdfasdfasdf",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }, // needs HTTPS
  })
);
app.use(
  cors({
    credentials: true,
    origin: "https://playbook.pridhvi.net",
    // origin: "http://localhost:5173",
  })
);

IgdbApiController(app);
UserController(app);
SessionController(app);

app.listen(process.env.PORT || 4000);
