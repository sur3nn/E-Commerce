

export const generateChatbotResponse = (message : string)=>{
    try {
        console.log(message)
        if (message.toLowerCase().includes('hello')) {
            return "Hello! How can I assist you today?";
        } else if (message.toLowerCase().includes('order status')) {
            return "Your order is currently being processed.";
        } else if (message.toLowerCase().includes('price')) {
            return "Please provide the product name to check the price.";
        } else {
            return "I'm sorry, I didn't understand that. Can you please clarify?";
        } 
    } catch (error) {
        throw error;
    }
}

