import { combineReducers } from "redux";
import friendsAndFansReducer from "./friends-and-fans/slice.js";
import chatMessagesReducer from "./messages/slice.js";

console.log(friendsAndFansReducer);

const rootReducer = combineReducers({
    friendsAndFans: friendsAndFansReducer,
    chatMessages: chatMessagesReducer,
    //chatMessages: chatMessagesReducer,
});

export default rootReducer;
