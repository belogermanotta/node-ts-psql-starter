
import "reflect-metadata";
import express from "express";
import compression from "compression";
import logger from "./util/logger";
// import session from "express-session";
// import flash from "express-flash";
// import passport from "passport";
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import nunjucks from "nunjucks";
import { Errback, Response, Request, NextFunction } from "express";

import apiRoutes from "./app/api/routes";
import internalRoutes from "./app/internal/routes";


// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Nunjucks configuration
nunjucks.configure("views", {
  autoescape: true,
  express: app
});
app.engine("html", nunjucks.render);
app.set("view engine", "html");

// Uncomment for Authentication
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// Express configuration
app.set("port", process.env.PORT || 9000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/internal", internalRoutes);
app.use("/", apiRoutes);


interface Error {
  status?: number;
  message?: string;
}

app.use((req: Request, res: Response) => {
  res.render("error/404.html");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;