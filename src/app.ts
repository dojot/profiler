import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import ejs from "ejs";
import fileupload from "express-fileupload";
import expressValidator from "express-validator";
import { SESSION_SECRET } from "./util/secrets";

dotenv.config({ path: ".env.example" });

import * as homeController from "./controllers/home";
import * as uploadController from "./controllers/upload";
import * as testController from "./controllers/test";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(fileupload());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.get("/", homeController.index);
app.post("/upload", uploadController.create);
app.post("/test", testController.create);

export default app;