"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = __importDefault(require("typedi"));
const typeorm_1 = require("./typeorm");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const winston_1 = __importDefault(require("./winston"));
dotenv_1.default.config();
async function start() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    // app.use(express.json())
    const httpServer = http_1.default.createServer(app);
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    (0, routing_controllers_1.useContainer)(typedi_1.default);
    await typeorm_1.AppDataSource.initialize()
        .then(() => {
        console.log("database connected successfully");
    })
        .catch((error) => console.log({
        level: "error",
        module: "typeorm",
        submodule: "AppDataSource",
        message: error.message,
        error: error,
    }));
    const routingControllerOption = {
        controllers: [path_1.default.join(__dirname + "/controller/*")],
        middlewares: [path_1.default.join(__dirname, "/middleware/*")],
        // authorizationChecker: async (action: Action) => {
        //   return true;
        // },
        // defaultErrorHandler: false,
    };
    (0, socket_1.setupSocket)(io);
    (0, routing_controllers_1.useExpressServer)(app, routingControllerOption);
    await httpServer.listen(9000, () => {
        console.log(`server is running on this port : 9000`);
        winston_1.default.debug('server is running on this port : 9000');
    });
}
start();
//# sourceMappingURL=server.js.map