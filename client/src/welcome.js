import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import ResetPassword from "./resetPassword";
import Login from "./login";
import Logo from "./UI/logo";

export default function Welcome() {
    return (
        <div id="welcome">
            <Logo />

            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
