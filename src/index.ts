import "dotenv/config";
import "reflect-metadata";
import express, { Response, Request} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import bodyParser from "body-parser";

import {PORT } from "./config";

import "./utils/response/customSuccess";
import { errorHandler } from "./middlewares/errorHandler";
import { CustomError } from "./utils/response/custom-error/customError";

import { connectDb } from "./utils/connection";
connectDb();

export const app = express();

let whitelist: string[] = ["https://payment-system-app.com"];

const corsOptions = {
  origin: whitelist,
  method: ["GET ,POST, PUT, DELETE ,PATCH"],
  credentials: true,
};

// CORS: Cross-Origin Resource Sharing: Helps in selective access to resources on server based on origin of request
app.use(cors(corsOptions));

// Helment: Helps to secure Express app by setting various HTTP headers response
app.use(helmet());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Allow", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Cache-Control",
  );
  next();
});

// app.use(morgan("dev"));
app.use(morgan("combined"));

app.get("/health", (req: Request, res: Response) => {
  res.send({
    code: 200,
    message: "Server is running...",
  });
});

// Routes
app.use("/", routes);

// Error Handler on Routes that does not exist
app.use("*", (req, res, next) => {
  return next(new CustomError(404, "Route Not Found"));
});

// Error Handler
app.use(errorHandler);


// Server Error Handler with status code
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status;
  res.status(status);
});

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
