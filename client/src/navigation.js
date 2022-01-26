import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation(props) {
    const [currentTab, setCurrentTab] = useState({});
    const [clicker, setClicker] = useState(0);

    // function changeStatus(tab) {
    //     console.log("change", tab);
    //     // return;
    // }
    useEffect(() => {
        const path = window.location.pathname;
        // console.log("Nav", path);

        const tabs = { bio: "", friends: "", people: "", chat: "" };
        if (path === "/") {
            setCurrentTab({ ...tabs, bio: " nav-selected" });
        }
        if (path === "/friends") {
            setCurrentTab({ ...tabs, friends: " nav-selected" });
        }
        if (path === "/users") {
            setCurrentTab({ ...tabs, people: " nav-selected" });
        }
        if (path === "/chat") {
            setCurrentTab({ ...tabs, chat: " nav-selected" });
        }
        if (path === "/net") {
            setCurrentTab({ ...tabs, net: " nav-selected" });
        }
    }, [clicker]);
    return (
        <div className="navigation">
            <ul>
                <Link to="/">
                    <li
                        //className={`nav_item ${currentTab["bio"]}`}
                        className={`nav_item ${currentTab["bio"]}`}
                        onClick={() => setClicker(clicker + 1)}
                    >
                        bio
                    </li>
                </Link>

                <Link to="/friends">
                    <li
                        className={`nav_item ${currentTab["friends"]}`}
                        onClick={() => setClicker(clicker + 1)}
                    >
                        friends
                    </li>
                </Link>

                <Link to="/users">
                    <li
                        className={`nav_item ${currentTab["people"]}`}
                        onClick={() => setClicker(clicker + 1)}
                    >
                        people
                    </li>
                </Link>

                <Link to="/chat">
                    <li
                        className={`nav_item ${currentTab["chat"]}`}
                        onClick={() => setClicker(clicker + 1)}
                    >
                        chat
                    </li>
                </Link>

                <Link to="/net">
                    <li
                        className={`nav_item ${currentTab["net"]}`}
                        onClick={() => setClicker(clicker + 1)}
                    >
                        Net
                    </li>
                </Link>
            </ul>
        </div>
    );
}
