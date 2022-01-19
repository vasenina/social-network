import useForm from "./hooks/useForm";
import useFormSubmit from "./hooks/useFormSubmit";

import { Link } from "react-router-dom";
import InputField from "./UI/inputField";

export default function Login(props) {
    const [values, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/login.json", values);

    return (
        // <>LOGIN PAGE</>
        <div className="registration_page">
            <h1>Log in</h1>
            {error && <h2 className="error">{error}</h2>}
            <form className="center_form">
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />

                {/* <div className="input_group">
                    <label htmlFor="name" className="input_label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input_field"
                        onChange={handleChange}
                    />
                </div> */}

                <button onClick={submit}>Login</button>
            </form>
            <Link to="/">Register here!</Link>
            <Link to="/reset">Change your password!</Link>
        </div>
    );
}

// constructor(props) {
//     super(props);
//     this.state = {};
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.testChange = this.testChange.bind(this);
// }

// componentDidMount() {
//     console.log("login just mounted");
// }

// handleSubmit(e) {
//     e.preventDefault();
//     console.log("user wants to submit");
//     //send data to server
//     if (!this.state.email || !this.state.password) {
//         this.setState({ error: "Fill all fields" }, () => {
//             console.log("Submit fields checking", this.state);
//         });
//         return;
//     }
//     fetch("/login.json", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state),
//     })
//         .then((resp) => resp.json())
//         .then((data) => {
//             console.log("response data", data);
//             //error handline here
//             if (data.success == false) {
//                 this.setState(
//                     { error: "Smth is wrong, please try again" },
//                     () => {
//                         console.log("State register fetch", this.state);
//                     }
//                 );
//             } else {
//                 console.log("User with Id added", data.id);
//                 console.log("data", data);
//                 location.assign("/");
//             }
//         })
//         .catch((err) => {
//             console.log("error in fetch", err);
//             //handle error message
//         });
// }
//     render() {
//         return (
//             <>
//                 <h1>Log in</h1>
//                 {this.state.error && (
//                     <h2 className="error">{this.state.error}</h2>
//                 )}
//                 <form className="center_form">
//                     <InputField
//                         label="Email"
//                         name="email"
//                         type="email"
//                         onChange={this.handleChange}
//                     />
//                     <InputField
//                         label="Password"
//                         name="password"
//                         type="password"
//                         onChange={this.handleChange}
//                     />

//                     <button onClick={this.handleSubmit}>Login</button>
//                 </form>
//                 <Link to="/">Register here!</Link>
//                 <Link to="/reset">Change your password!</Link>
//             </>
//         );
//     }
// }
