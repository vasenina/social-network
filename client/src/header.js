export default function Header({ first, last }) {
    // function logout() {
    //     console.log("logout");
    //     fetch("/logout", {}).then(() => {
    //         location.reload();
    //     });
    // }
    return (
        <div className="header">
            <h1>Social Network</h1>
            <div>
                {first} {last}
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
