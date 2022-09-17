import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import routes from "./routes/routesIndex";
import errorHandler from "./middleware/errorHandler";

const server = express();

server.use(cors());
server.use(json());
server.use(routes);
server.use(errorHandler);

console.log(process.env.DATABASE_URL);

export default server;