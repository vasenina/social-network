import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import FriendBtn from "./friendBtn";

export default function userInfo() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch("/api/user/" + id)
            .then((response) => response.json())
            .then((data) => {
                //console.log("user info", data);
                if (data.error) {
                    //redirect to "/"
                } else {
                    setUser(data);
                }
            })
            .catch((err) => console.log("error in fetch user info", err));

        //getting friends of friends
        //  console.log("before the fetch ");
        fetch("/api/friends-of-friends/" + id)
            .then((response) => response.json())
            .then((data) => {
                console.log("friends of friends", data);
                if (data.error) {
                    //redirect to "/"
                } else {
                    setFriends(data.friends);
                }

                // console.log(this.state);
            })
            .catch((err) => console.log("error in fetch user info", err));
    }, [id]);

    if (!user.last) {
        return <div className="loader"></div>;
    }

    // console.log("FRIENDS_FRIENDS FRIENDS:", typeof friends);
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
                <FriendBtn otherId={id} />
                <div>Friends :</div>
                <div className="user-list">
                    {friends &&
                        friends.map((person) => {
                            return (
                                <div key={person.id} className="friend-preview">
                                    <ProfilePic
                                        imageUrl={person.image_url}
                                        first={person.first}
                                        last={person.last}
                                        size="small"
                                        action={() => {
                                            location.assign(
                                                "/user/" + person.id
                                            );
                                        }}
                                    />

                                    <p>
                                        {person.last} {person.first}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
