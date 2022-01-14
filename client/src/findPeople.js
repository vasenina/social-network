import { useState, useEffect } from "react";
import ProfilePic from "./profilePic";

export default function findPeople() {
    const [searchString, setsearchString] = useState("");
    const [users, setUsers] = useState([
        {
            id: 1,
            first: "first",
            last: "last",
            image_url: "https://randomuser.me/api/portraits/men/87.jpg",
        },
    ]);
    const [userList, setUserList] = useState();

    useEffect(() => {
        console.log("search", searchString);
        let abort = false;
        fetch(`getusers?search=${searchString}`)
            .then((res) => res.json())
            .then((data) => {
                if (!abort) {
                    console.log(data.users);
                    setUsers(data.users);

                    console.log("users", users);
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
                            <p>
                                {user.last} {user.first}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
