
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import { AppDataSource } from "./typeorm";
import path from "path";
import dotenv from "dotenv";
import helmetMiddleware from 'helmet';
import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from "./socket";
import logger from "./winston";

dotenv.config();

async function start() {
  

const app = express();
app.use(helmetMiddleware());
app.use(cors())
// app.use(express.json())
const httpServer = http.createServer(app)
const io = new SocketIOServer(httpServer,{
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});
useContainer(Container)


await AppDataSource.initialize()
.then(() => {
  console.log("database connected successfully");
})
.catch((error) =>
  console.log({
    level: "error",
    module: "typeorm",
    submodule: "AppDataSource",
    message: error.message,
    error: error,
  })
);
const routingControllerOption = {
    controllers : [path.join(__dirname + "/controller/*")],
    middlewares: [path.join(__dirname, "/middleware/*")],
    // authorizationChecker: async (action: Action) => {
    //   return true;
    // },
    // defaultErrorHandler: false,
}
setupSocket(io);  

useExpressServer(app,routingControllerOption);
 await httpServer.listen(9000,()=>{
    console.log(`server is running on this port : 9000`);
    logger.debug('server is running on this port : 9000')
})

}
start();





