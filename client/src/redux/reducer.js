import { combineReducers } from "redux";
import friendsAndFansReducer from "./friends-and-fans/slice.js";
import chatMessagesReducer from "./messages/slice.js";
import userProfileReducer from "./userProfile/slice.js";

console.log(friendsAndFansReducer);

const rootReducer = combineReducers({
    friendsAndFans: friendsAndFansReducer,
    chatMessages: chatMessagesReducer,
    userProFile: userProfileReducer,
    //chatMessages: chatMessagesReducer,
});

export default rootReducer;
