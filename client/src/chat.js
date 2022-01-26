// import { io } from "socket.io-client";
//const socket = io();
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { socket } from "./socket";
import ProfilePic from "./profilePic";
import DayJS from "react-dayjs";

export default function Chat() {
    const textAreaRef = useRef();
    const chatContainerRef = useRef();
    const chatMessages = useSelector((state) => state?.chatMessages);

    const keyCheck = (e) => {
        // e.preventDefault();
        if (e.key === "Enter") {
            if (textAreaRef.current.value === "") {
                textAreaRef.current.value = "";
                return;
            }
            // console.log(e.target.value, "message added");
            // e.target.value = "";
            socket.emit("newChatMessage", textAreaRef.current.value);
            textAreaRef.current.value = "";
        }
    };
    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [chatMessages]);

    // console.log("type", chatMessages);

    return (
        <>
            <h2>Let's start chatting</h2>
            <div className="chat-container" ref={chatContainerRef}>
                {chatMessages &&
                    chatMessages.map((msg) => {
                        return (
                            <div key={msg.id} className="message-view">
                                <div className="chat-photo-area">
                                    <ProfilePic
                                        imageUrl={msg.image_url}
                                        first={msg.first}
                                        last={msg.last}
                                        size="small"
                                        action={() => {
                                            location.assign(
                                                "/user/" + msg.user_id
                                            );
                                        }}
                                    />
                                </div>

                                <div className="message-body">
                                    <div className="message-head">
                                        <p>
                                            <b>
                                                {msg.first} {msg.last}
                                            </b>
                                        </p>
                                        <DayJS
                                            format="HH:mm  DD MMM"
                                            className="date-text"
                                        >
                                            {msg.created_at}
                                        </DayJS>
                                    </div>
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <textarea
                ref={textAreaRef}
                onKeyDown={keyCheck}
                placeholder="Write your message here..."
                rows="5"
                className="chat-area"
                maxLength="200"
            ></textarea>
        </>
    );
}
