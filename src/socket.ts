import { Server } from "socket.io";
import { generateChatbotResponse } from "./bussinessLogic/ChatbotLogic";



export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user_message", (msg) => {
      console.log("Received message:", msg);

      const userMessage = msg?.message;
      if (typeof userMessage === "string") {
        const response =  generateChatbotResponse(userMessage);
        console.log(response);
        socket.emit("bot_response", response);
      } else {
        socket.emit("bot_response", "Invalid message format.");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
