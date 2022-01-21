export default function friendsAndFansReducer(friendsAndFans = [], action) {
    if (action.type == "friends-and-fans/receivedFriends") {
        friendsAndFans = action.payload.friends;
    }
    if (action.type === "friends-and-fans/accept") {
        const newFriendsAndFans = []; //friendsAndFans.map();
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
