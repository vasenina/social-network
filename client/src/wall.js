import { useState } from "react";
import { useRef, useEffect } from "react";
import ProfilePic from "./profilePic";
import DayJS from "react-dayjs";

export default function Wall(props) {
    const [wallMessages, setWallMessages] = useState([]);
    const textAreaRef = useRef();

    useEffect(() => {
        console.log("wall id", props.id);
        // console.log("wallUseEffect", "/api/wall/" + props.id);

        fetch("/api/wall/" + props.id)
            .then((res) => res.json())
            .then((data) => {
                // console.log("WallData", data);
                setWallMessages([...data.messages]);
            })
            .catch((err) => {
                console.log("error in fetch get wall");
            });
    }, []);

    const keyCheck = (e) => {
        // e.preventDefault();
        if (e.key === "Enter") {
            if (textAreaRef.current.value === "") {
                return;
            }
            // console.log(e.target.value, "message added");

            const message = { message: textAreaRef.current.value };

            fetch("/api/addMsgToWall/" + props.id, {
                method: `POST`,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(message),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.success) {
                        //location.replace("/");
                        setWallMessages([data.message, ...wallMessages]);
                        textAreaRef.current.value = "";
                    } else {
                    }
                });
        }
    };

    return (
        <>
            <textarea
                ref={textAreaRef}
                onKeyDown={keyCheck}
                placeholder="Write your message here..."
                rows="5"
                className="chat-area"
                maxLength="200"
            ></textarea>
            {wallMessages &&
                wallMessages.map((msg) => {
                    return (
                        <div key={msg.id} className="message-view">
                            <div className="chat-photo-area">
                                <ProfilePic
                                    imageUrl={msg.image_url}
                                    first={msg.first}
                                    last={msg.last}
                                    size="small"
                                    action={() => {
                                        location.assign("/user/" + msg.user_id);
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
            {wallMessages.length <= 0 && <div>...No Messages here...</div>}
        </>
    );
}
