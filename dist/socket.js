"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const ChatbotLogic_1 = require("./bussinessLogic/ChatbotLogic");
function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("user_message", (msg) => {
            console.log("Received message:", msg);
            const userMessage = msg === null || msg === void 0 ? void 0 : msg.message;
            if (typeof userMessage === "string") {
                const response = (0, ChatbotLogic_1.generateChatbotResponse)(userMessage);
                console.log(response);
                socket.emit("bot_response", response);
            }
            else {
                socket.emit("bot_response", "Invalid message format.");
            }
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}
//# sourceMappingURL=socket.js.map