import { Component } from "react";
import { Link } from "react-router-dom";
import InputField from "./UI/inputField";
import { useFormSubmit } from "./hooks/useFormSubmit";
import { useForm } from "./hooks/useFormSubmit";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // const [] = useForm();
    // const [submit, error] = useFormSubmit("/register.json", userInput);

    componentDidMount() {
        console.log("registration just mounted");
    }
    handleChange({ target }) {
        console.log("input value changed");
        console.log("value typed", target.value);
        console.log("target name", target.name);
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
        if (
            !this.state.last ||
            !this.state.first ||
            !this.state.email ||
            !this.state.password
        ) {
            this.setState({ error: "Fill all fields" }, () => {
                console.log("Submit fields checking", this.state);
            });
            return;
        }
        fetch("/register.json", {
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
            <div className="registration_page">
                <h1>Registration</h1>
                {this.state.error && (
                    <h2 className="error">{this.state.error}</h2>
                )}
                <form className="center_form">
                    <InputField
                        label="First Name"
                        name="first"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <InputField
                        label="Last Name"
                        name="last"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                    />

                    <button onClick={this.handleSubmit}>Register</button>
                </form>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
