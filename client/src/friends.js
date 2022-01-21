import { useDispatch, useSelector } from "react-redux";
import { makeFriend, endFriendship } from "./redux/friends-and-fans/slice";
import { useEffect, useState } from "react";
import useGetRequest from "./hooks/useGetRequest";
import ProfilePic from "./profilePic";

export default function Friends() {
    const dispatch = useDispatch();

    const [getRequest, response] = useGetRequest("/friends-and-fans");

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

    const [test, settest] = useState([
        {
            id: 2,
            first: "Lacey",
            last: "Fritz",
            image_url:
                "https://images-na.ssl-images-amazon.com/images/M/MV5BNTQ3OTA2NDQtMzBkMy00ZDVjLWFlYzUtMmZhNzRmZTc3NmM1XkEyXkFqcGdeQXVyNjc1NTc4MDA@._V1_UX172_CR0,0,172,256_AL_.jpg",
            accepted: false,
            sender_id: 2,
        },
        {
            id: 3,
            first: "Lacsdey-true",
            last: "Fritdsdz",
            image_url:
                "https://images-na.ssl-images-amazon.com/images/M/MV5BNTQ3OTA2NDQtMzBkMy00ZDVjLWFlYzUtMmZhNzRmZTc3NmM1XkEyXkFqcGdeQXVyNjc1NTc4MDA@._V1_UX172_CR0,0,172,256_AL_.jpg",
            accepted: true,
            sender_id: 2,
        },
    ]);

    useEffect(() => {
        //fetch friends and wannabies
        console.log("want to see a friendsPage");
        (async () => {
            await getRequest();
            console.log("RESPONSE", response);
        })();
    }, []);

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
                                        location.assign("/user/" + person.id);
                                    }}
                                />
                                {/**нужно передать экшен по клику */}
                                <p>
                                    {person.last} {person.first}
                                </p>
                                <div className="flex-bottom">
                                    <button
                                        className="friend-preview-btn"
                                        onClick={() =>
                                            handleBtnClick(person.id, action)
                                        }
                                    >
                                        {friendActions[action]}
                                    </button>
                                    {action === "accept" && (
                                        <button
                                            className="reject-btn"
                                            onClick={() =>
                                                handleBtnClick(person.id, "end")
                                            }
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                {!friends && <p>No people here</p>}
            </div>
        );
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
