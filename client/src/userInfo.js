import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import FrienBtn from "./friendBtn";

export default function userInfo() {
    const { id } = useParams();
    const [user, setUser] = useState({});
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
        console.log("bla-bla");
    }, [id]);

    if (!user.last) {
        return <div className="loader"></div>;
    }
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
            </div>
        </div>
    );
}
