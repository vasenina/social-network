import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ProfilePic from "./profilePic";

export default function findPeople(props) {
    const [searchString, setsearchString] = useState("");
    const [users, setUsers] = useState();
    const [error, setError] = useState();
    let history = useHistory();

    useEffect(() => {
        // console.log("search", searchString);
        let abort = false;
        fetch(`getusers?search=${searchString}`)
            .then((res) => res.json())
            .then((data) => {
                if (!abort) {
                    //console.log(data.users);
                    if (data.success == true) {
                        setUsers(data.users);
                        setError("");
                    } else {
                        setError(data.error);
                        setUsers([]);
                    }
                }
            })
            .catch((err) => console.log("error in fetch user info", err));
        return () => (abort = true);
    }, [searchString]);

    return (
        <>
            <h2>Find interesting people here</h2>

            <input
                type="text"
                name="searchString"
                className="input_field in-find-people"
                onChange={(e) => {
                    setsearchString(e.target.value);
                }}
            />
            {users && (
                <div className="user-list">
                    {users.map((user) => (
                        <div
                            className="user-preview"
                            key={user.id}
                            onClick={() => {
                                console.log("user click on", user.id);
                                if (user.id == props.currentId) {
                                    console.log(user.id, props.currentId);
                                    history.replace("/");
                                } else {
                                    history.push("/user/" + user.id);
                                }
                            }}
                        >
                            <ProfilePic
                                imageUrl={user.image_url}
                                first={user.first}
                                last={user.last}
                                size="small"
                            />
                            {/**нужно передать экшен по клику */}
                            <p className="text-center">
                                {user.last} {user.first}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            {error && (
                <div>
                    <p className="error">{error}</p>
                </div>
            )}
        </>
    );
}
