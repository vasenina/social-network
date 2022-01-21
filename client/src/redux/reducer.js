import { combineReducers } from "redux";
import friendsAndFansReducer from "./friends-and-fans/slice.js";

console.log(friendsAndFansReducer);

const rootReducer = combineReducers({
    friendsAndFans: friendsAndFansReducer,
    //chatMessages: chatMessagesReducer,
});

export default rootReducer;
