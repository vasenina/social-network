export default function chatMessagesReducer(chatMessages = [], action) {
    if (action.type == "chat-messages/receivedMessages") {
        console.log("ACTION PLAYLOAD", action.payload);
        chatMessages = action.payload.messages; //???
        console.log("chatMessages", chatMessages);
    }
    if (action.type === "chat-messages/add") {
        const newChatMessages = [action.playload.msg, ...chatMessages];

        return newChatMessages;
    }

    return chatMessages;
}

export function chatMessagesReceived(messages) {
    return {
        type: "chat-messages/receivedMessages",
        payload: { messages },
    };
}

export function chatMessageReceived(msg) {
    return {
        type: "chat-messages/add",
        playload: { msg },
    };
}
