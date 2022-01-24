import { io } from "socket.io-client";

import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", ({ messages }) =>
            store.dispatch(chatMessagesReceived(messages))
        );

        socket.on("chatMessage", (msg) =>
            store.dispatch(chatMessageReceived(msg))
        );

        socket.on("text", (msg) => {
            console.log("test mesg:", msg);
        });
    }
};
