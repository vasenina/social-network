import ProfilePic from "./profilePic";
import Logo from "./UI/logo";
export default function Header({ first, last, imageUrl, toggleUploader }) {
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
                    toggleUploader={toggleUploader}
                    size="small"
                />
                <button
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
                >
                    out
                </button>
            </div>
        </div>
    );
}
