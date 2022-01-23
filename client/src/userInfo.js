import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import FrienBtn from "./friendBtn";

export default function userInfo() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    //const history = useHistory();
    useEffect(() => {
        // //make request here
        // fetch("ms")
        //     .then()
        //     .then(() => {
        //         history.replace("/");
        //     })
        //     .catch((err) => {
        //         console.log("err");
        //     });
        fetch("/api/user/" + id)
            .then((response) => response.json())
            .then((data) => {
                console.log("user info", data);
                if (data.error) {
                    //redirect to "/"
                } else {
                    setUser(data);
                }

                // console.log(this.state);
            })
            .catch((err) => console.log("error in fetch user info", err));

        //getting friends of friends
        console.log("before the fetch ");
        fetch("/api/friends-of-friends/" + id)
            .then((response) => response.json())
            .then((data) => {
                console.log("friends of friends", data);
                if (data.error) {
                    //redirect to "/"
                } else {
                    setFriends(data);
                }

                // console.log(this.state);
            })
            .catch((err) => console.log("error in fetch user info", err));
    }, [id]);

    if (!user.last) {
        return <div className="loader"></div>;
    }

    console.log("FRIENDS_FRIENDS FRIENDS:", typeof friends);
    return (
        <div className="bio">
            <div className="bioPic">
                <ProfilePic
                    imageUrl={user.imageUrl}
                    first={user.first}
                    last={user.last}
                    action={user.toggleUploader}
                />
            </div>
            <div>
                <h2>
                    {user.first} {user.last}
                </h2>
                <p>{user.bio}</p>
                <FrienBtn otherId={id} />

                <div className="user-list">
                    dsjhj
                    {friends &&
                        friends.map((person) => {
                            return <div key={person.id}>dskfe</div>;
                        })}
                </div>
            </div>
        </div>
    );
}
