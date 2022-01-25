import { useDispatch, useSelector } from "react-redux";
import { makeFriend, endFriendship } from "./redux/friends-and-fans/slice";
import { useEffect, useState } from "react";
import useGetRequest from "./hooks/useGetRequest";
import ProfilePic from "./profilePic";
import { useHistory } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    const [myId, setMyid] = useState(1);
    let history = useHistory();

    //const [getRequest, response] = useGetRequest("/friends-and-fans");

    const fans = useSelector((state) => {
        return (
            state.friendsAndFans &&
            state.friendsAndFans.filter(
                (friend) => !friend.accepted && friend.sender_id === friend.id
            )
        );
    });
    const mydreams = useSelector((state) => {
        return (
            state.friendsAndFans &&
            state.friendsAndFans.filter((friend) => {
                if (!friend.accepted && friend.sender_id !== friend.id)
                    return friend;
            })
        );
    });

    const friends = useSelector((state) => {
        return (
            state.friendsAndFans &&
            state.friendsAndFans.filter((friend) => friend.accepted)
        );
    });

    const [friendActions, setFriendActions] = useState({
        add: "Add a Friend",
        accept: "Accept",
        cancel: "Cancel",
        end: "End",
        error: "Nothing",
        start: "...",
    });

    //console.log("People", people);

    // useEffect(() => {
    //     //fetch friends and wannabies
    //     console.log("want to see a friendsPage");
    //     (async () => {
    //         await getRequest();
    //         console.log("RESPONSE", response);
    //     })();
    // }, []);

    // console.log("RESPONSE 2", response);
    //console.log("PEOPLE CONSOLE", people);

    const handleBtnClick = (id, action) => {
        fetch(`/api/friendship/${id}/${action}`, {
            method: `POST`,
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    //location.replace("/");
                    if (action === "accept") {
                        dispatch(makeFriend(id));
                    } else if (action === "end" || action === "cancel") {
                        dispatch(endFriendship(id));
                    }

                    //здесь делаем диспатч
                } else {
                    //setError("Your email or password are incorrect.");
                }
            });
        //step 1 post requuest to update db
        //step 2 - dispatch an action to update the Redux Store
        // dispatch(makeFriend(id));
    };

    const returnFriendsList = (friends, action) => {
        if (friends.length <= 0) {
            console.log("no people");
            return <p className="no-people">... no people ...</p>;
        } else {
            console.log("people here");
            return (
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
                                            if (person.id == myId) {
                                                history.replace("/");
                                            } else {
                                                history.push(
                                                    "/user/" + person.id
                                                );
                                            }
                                        }}
                                    />
                                    {/**нужно передать экшен по клику */}
                                    <p className="text-center">
                                        {person.last} {person.first}
                                    </p>
                                    <div className="flex-bottom">
                                        <button
                                            className="friend-preview-btn"
                                            onClick={() =>
                                                handleBtnClick(
                                                    person.id,
                                                    action
                                                )
                                            }
                                        >
                                            {friendActions[action]}
                                        </button>
                                        {action === "accept" && (
                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    handleBtnClick(
                                                        person.id,
                                                        "end"
                                                    )
                                                }
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            );
        }
    };

    return (
        <>
            <h2>You friends</h2>
            {returnFriendsList(friends, "end")}
            <h2>They want to be your friends</h2>
            {returnFriendsList(fans, "accept")}

            <h2>I send them request</h2>
            {returnFriendsList(mydreams, "cancel")}
        </>
    );
}
