import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeFriend, receiveFriends } from "../redux/friends-and-fans/slice";

export default function useGetRequest(url) {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const fetchRequest = () => {
        // console.log("useGetRequest");
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                if (data.success) {
                    dispatch(receiveFriends(data.friendsAndFans));
                }

                // console.log("data from HookFetchRequest", data);
            });
    };

    // console.log(error);
    return [fetchRequest, data];
}
