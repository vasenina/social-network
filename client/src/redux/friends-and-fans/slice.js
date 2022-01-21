export default function friendsAndFansReducer(friendsAndFans = [], action) {
    if (action.type == "friends-and-fans/receivedFriends") {
        friendsAndFans = action.payload.friends;
    }
    if (action.type === "friends-and-fans/accept") {
        const newFriendsAndFans = friendsAndFans.map((friend) => {
            if (friend.id == action.playload.id) {
                const newFriend = { ...friend, accepted: true };
                return newFriend;
            }
            return friend;
        });
        return newFriendsAndFans;
    }

    if (action.type === "friends-and-fans/end-friendship") {
        const newFriendsAndFans = friendsAndFans.filter(
            (friend) => friend.id !== action.playload.id
        );
        return newFriendsAndFans;
    }
    return friendsAndFans;
}

export function receiveFriends(friends) {
    return {
        type: "friends-and-fans/receivedFriends",
        payload: { friends },
    };
}

export function makeFriend(id) {
    return {
        type: "friends-and-fans/accept",
        playload: { id },
    };
}

export function endFriendship(id) {
    return {
        type: "friends-and-fans/end-friendship",
        playload: { id },
    };
}
