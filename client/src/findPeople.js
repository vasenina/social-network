import { useState, useEffect } from "react";
import ProfilePic from "./profilePic";

export default function findPeople() {
    const [searchString, setsearchString] = useState("");
    const [users, setUsers] = useState();
    const [error, setError] = useState();

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
            <div className="navigation">find people</div>
            <input
                type="text"
                name="searchString"
                className="input_field"
                onChange={(e) => {
                    setsearchString(e.target.value);
                }}
            />
            {users && (
                <div className="user-list">
                    {users.map((user) => (
                        <div key={user.id}>
                            <ProfilePic
                                imageUrl={user.image_url}
                                first={user.first}
                                last={user.last}
                                size="small"
                            />
                            {/**нужно передать экшен по клику */}
                            <p>
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
