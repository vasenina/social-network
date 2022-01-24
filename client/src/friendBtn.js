import { useState, useEffect } from "react";

export default function friendBtn(props) {
    const [btnText, setBtnText] = useState("start");
    const [texts, setTexts] = useState({
        add: "Add a Friend",
        accept: "Accept request",
        cancel: "Cancel request",
        end: "End a Friendship",
        error: "Nothing",
        start: "...",
    });

    useEffect(() => {
        // console.log("friend ID", props.otherId);

        fetch("/api/friendship/" + props.otherId)
            .then((response) => response.json())
            .then((data) => {
                // console.log("we got btn ststus from server", data);
                if (data.success) {
                    setBtnText(data.text);
                } else {
                    //setUser(data);
                    setBtnText("start");
                }

                // console.log(this.state);
            })
            .catch((err) => console.log("error in fetch friend Btn", err));
    }, [btnText]);
    //const [error, setError] = useState();

    const clickHandler = () => {
        // console.log("btn clicked");

        fetch("/api/friendship/" + props.otherId + "/" + btnText, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: btnText }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                //  console.log("response form server for btn click fetch", data);
                //error handline here
                if (data.success) {
                    //  console.log("friendship post request ok", data);
                    setBtnText(data.text);
                    //btnText = data.text;
                } else {
                }
            })
            .catch((err) => {
                console.log("error in fetch", err);
                setBtnText("start");
                //handle error message
            });
    };
    return <button onClick={clickHandler}>{texts[btnText]}</button>;
}
