import ProfilePic from "./profilePic";
import Logo from "./UI/logo";
import { useHistory, Redirect } from "react-router-dom";
export default function Header({ first, last, imageUrl, toggleUploader }) {
    const history = useHistory();
    // function logout() {
    //     console.log("logout");
    //     fetch("/logout", {}).then(() => {
    //         location.reload();
    //     });
    // }
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
                    src="logout-icon.svg"
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
