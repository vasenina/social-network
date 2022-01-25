import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import { receiveProfile } from "./redux/userProfile/slice.js";

import { init } from "./socket";
//create store
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/user-cookie/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("DAta", data);
        if (!data.userId) {
            // window.history.replaceState({}, null, "/");
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            init(store);
            store.dispatch(receiveProfile({ id: data.userId }));
            ReactDOM.render(
                <Provider store={store}>
                    <App user_id={data.userId} />
                </Provider>,
                document.querySelector("main")
            );
        }
    });
