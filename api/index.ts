import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import router from "../src/router";
import { appendFile } from "fs";

require("dotenv").config();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});

const MONGO_URL =
  "mongodb+srv://shehan:Shehan123456@cluster0.yjed8ln.mongodb.net/kanban?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());

export default app;
