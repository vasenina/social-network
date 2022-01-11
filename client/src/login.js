import { Component } from "react";
import { Link } from "react-router-dom";
import InputField from "./UI/inputField";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.testChange = this.testChange.bind(this);
    }

    componentDidMount() {
        console.log("registration just mounted");
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

    testChange({ target }) {
        //console.log("test", target);
        // console.log("value typed", target.value);
        //console.log("target name", target.name);
        //update state

        this.setState(
            {
                [target.name]: target.value,
            },
            () => {
                console.log("State after handleChange", this.state);
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("user wants to submit");
        //send data to server
        if (!this.state.email || !this.state.password) {
            this.setState({ error: "Fill all fields" }, () => {
                console.log("Submit fields checking", this.state);
            });
            return;
        }
        fetch("/login.json", {
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
                    console.log("User with Id added", data.id);
                    console.log("data", data);
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("error in fetch", err);
                //handle error message
            });
    }
    render() {
        return (
            <>
                <h1>Log in</h1>
                {this.state.error && (
                    <h2 className="error">{this.state.error}</h2>
                )}
                <form>
                    <input
                        name="email"
                        placeholder="your@email"
                        type="email"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                        required
                    />
                    <button onClick={this.handleSubmit}>Login</button>
                </form>
                <Link to="/">Register here!</Link>
                <Link to="/reset">Change your password!</Link>
                <InputField
                    label="Test"
                    name="test"
                    type="text"
                    onChange={this.testChange}
                />
            </>
        );
    }
}

//onChange={({ target }) => this.testChange({ target })}
//({ target }) => this.handleChange({ target });
