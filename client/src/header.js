import ProfilePic from "./profilePic";
import Logo from "./UI/logo";
import { useHistory, Redirect } from "react-router-dom";
import useGetRequest from "./hooks/useGetRequest";
import { useEffect, useState } from "react";
export default function Header({ first, last, imageUrl, toggleUploader }) {
    const history = useHistory();
    const [getRequest, response] = useGetRequest("/friends-and-fans");
    // function logout() {
    //     console.log("logout");
    //     fetch("/logout", {}).then(() => {
    //         location.reload();
    //     });
    // }
    useEffect(() => {
        //fetch friends and wannabies
        console.log("want to see a friendsPage");
        (async () => {
            await getRequest();
            console.log("RESPONSE", response);
        })();
    }, []);

    return (
        <div className="header">
            <Logo />
            <div>
                <ProfilePic
                    imageUrl={imageUrl}
                    first={first}
                    last={last}
                    action={toggleUploader}
                    size="small"
                />

                <img
                    src="/logout-icon.svg"
                    className="icon-btn"
                    onClick={() => {
                        console.log("logout clicked");
                        fetch("/logout", {})
                            .then(() => {
                                location.assign("/login");
                            })
                            .catch((err) => {
                                console.log("logout error", err);
                            });
                    }}
                />
                {/* <object
                    type="image/svg+xml"
                    data="logout-icon.svg"
                    className="icon-btn"
                    onClick={() => {
                        console.log("logout clicked");
                        fetch("/logout", {})
                            .then(() => {
                                location.reload();
                            })
                            .catch((err) => {
                                console.log("logout error", err);
                            });
                    }}
                ></object> */}
            </div>
        </div>
    );
}
