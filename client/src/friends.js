import { useDispatch, useSelector } from "react-redux";
import { makeFriend, receiveFriends } from "./redux/friends-and-fans/slice";
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
    const handleAccept = (id) => {
        //step 1 post requuest to update db
        //step 2 - dispatch an action to update the Redux Store
        // dispatch(makeFriend(id));
    };

    const returnFriendsList = (friends) => {
        return (
            <div className="user-list">
                {friends &&
                    friends.map((person) => {
                        return (
                            <div key={person.id}>
                                <ProfilePic
                                    imageUrl={person.image_url}
                                    first={person.first}
                                    last={person.last}
                                    size="small"
                                />
                                {/**нужно передать экшен по клику */}
                                <p>
                                    {person.last} {person.first}
                                </p>
                                <button
                                    className="friend-preview-btn"
                                    onClick={() => handleAccept(person.id)}
                                >
                                    Accept
                                </button>
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
            {returnFriendsList(friends)}
            <h2>They want to be your friends</h2>
            {returnFriendsList(fans)}

            <h2>I send them request</h2>
            {returnFriendsList(mydreams)}
        </>
    );
}
