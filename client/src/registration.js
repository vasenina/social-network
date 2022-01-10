import { Component } from "react";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
                    this.setState({ error: "Whoopsie" }, () => {
                        console.log("State register fetch", this.state);
                    });
                } else {
                    console.log("User with Id added", data.id);
                    console.log("data", data);
                    // location.reload();
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
                <h1>Registration</h1>
                {this.state.error && (
                    <h2 className="error">{this.state.error}</h2>
                )}
                <form>
                    <input
                        onChange={({ target }) => this.handleChange({ target })}
                        name="first"
                        placeholder="First Name"
                        type="text"
                        required
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        type="text"
                        onChange={this.handleChange}
                        required
                    />
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
                    <button onClick={this.handleSubmit}>Register</button>
                </form>
            </>
        );
    }
}
