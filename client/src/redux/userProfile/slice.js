export default function userProfileReducer(userProfile = {}, action) {
    if (action.type == "user-profile/receivedProfile") {
        userProfile = action.payload.user;
    }
    // if (action.type === "friends-and-fans/accept") {
    //     const newFriendsAndFans = friendsAndFans.map((friend) => {
    //         if (friend.id == action.playload.id) {
    //             const newFriend = { ...friend, accepted: true };
    //             return newFriend;
    //         }
    //         return friend;
    //     });
    //     return newFriendsAndFans;
    // }

    // if (action.type === "friends-and-fans/end-friendship") {
    //     const newFriendsAndFans = friendsAndFans.filter(
    //         (friend) => friend.id !== action.playload.id
    //     );
    //     return newFriendsAndFans;
    // }
    return userProfile;
}

export function receiveProfile(user) {
    return {
        type: "user-profile/receivedProfile",
        payload: { user },
    };
}

// export function makeFriend(id) {
//     return {
//         type: "friends-and-fans/accept",
//         playload: { id },
//     };
// }

// export function endFriendship(id) {
//     return {
//         type: "friends-and-fans/end-friendship",
//         playload: { id },
//     };
// }
