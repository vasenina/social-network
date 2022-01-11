import { Component } from "react";
import InputField from "./UI/inputField";

export default class ResetPasswords extends Component {
    constructor(props) {
        super(props);
        this.state = { stage: 1 };
        this.handleChange = this.handleChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    handleChange({ target }) {
        console.log("input value changed");
        this.setState(
            {
                [target.name]: target.value,
            },
            () => {
                console.log("State after handleChange", this.state);
            }
        );
    }
    checkEmail() {
        if (!this.state.email) {
            this.setState({ error: "Fill all fields" }, () => {
                console.log("Please write your email", this.state);
            });
            return;
        }

        fetch("/resetPass/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response data", data);
                //error handline here
                if (data.success == false) {
                    this.setState(
                        { error: "Smth is wrong, please try again" },
                        () => {
                            console.log("State register fetch", this.state);
                        }
                    );
                } else {
                    //console.log("User with Id added", data.id);
                    console.log("data", data);
                    //location.reload();
                    this.setState({ stage: 2, error: null }, () => {
                        console.log("State register fetch", this.state);
                    });
                }
            })
            .catch((err) => {
                console.log("error in fetch reset pass", err);
                //handle error message
            });
    }

    render() {
        return (
            <>
                {this.state.stage === 1 && (
                    <>
                        <h2>Write your email</h2>
                        {this.state.error && (
                            <h2 className="error">{this.state.error}</h2>
                        )}
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                        <button onClick={this.checkEmail}>Confirm Email</button>
                    </>
                )}
                {this.state.stage === 2 && (
                    <>
                        <h2>Write your code</h2>
                        {this.state.error && (
                            <h2 className="error">{this.state.error}</h2>
                        )}
                        <InputField
                            label="Code"
                            name="code"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <InputField
                            label="New Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <button onClick={this.changePassword}>
                            Change Password
                        </button>
                    </>
                )}
            </>
        );
    }
}
