"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatbotResponse = void 0;
const generateChatbotResponse = (message) => {
    try {
        console.log(message);
        if (message.toLowerCase().includes('hello')) {
            return "Hello! How can I assist you today?";
        }
        else if (message.toLowerCase().includes('order status')) {
            return "Your order is currently being processed.";
        }
        else if (message.toLowerCase().includes('price')) {
            return "Please provide the product name to check the price.";
        }
        else {
            return "I'm sorry, I didn't understand that. Can you please clarify?";
        }
    }
    catch (error) {
        throw error;
    }
};
exports.generateChatbotResponse = generateChatbotResponse;
//# sourceMappingURL=ChatbotLogic.js.map