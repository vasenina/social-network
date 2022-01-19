import { Component } from "react";
import InputField from "./UI/inputField";
import { Link } from "react-router-dom";
import useForm from "./hooks/useForm";
import { useState, useEffect } from "react";

export default function ResetPasswords() {
    const [values, handleChange] = useForm();
    const [stage, setStage] = useState(1);
    const [error, setError] = useState();

    function checkEmail(e) {
        e.preventDefault();
        if (!values.email) {
            setError("Please write your email");
            return;
        }

        fetch("/resetPass/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response data", data);

                if (data.success == false) {
                    setError("Smth is wrong, please try again");
                } else {
                    //console.log("User with Id added", data.id);
                    console.log("data", data);
                    setStage(2);
                    setError(null);
                }
            })
            .catch((err) => {
                console.log("error in fetch reset pass", err);
                //handle error message
            });
    }
    function changePassword(e) {
        e.preventDefault();
        if (!values.code || !values.password) {
            setError("Fill all fields");
            return;
        }

        fetch("/resetPass/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response data", data);
                //error handline here
                if (data.success == false) {
                    setError("Smth is wrong, please try again");
                } else {
                    //console.log("User with Id added", data.id);
                    console.log("data", data);

                    setStage(3);
                    setError(null);
                }
            })
            .catch((err) => {
                console.log("error in fetch changing pass", err);

                setError("Smth is wrong, please try again");
            });
    }

    return (
        <>
            {stage === 1 && (
                <form className="center_form">
                    <h2>Write your email</h2>
                    {error && <h2 className="error">{error}</h2>}
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                    />
                    <button onClick={checkEmail}>Confirm Email</button>
                    <Link to="/login">Click here to Log in!</Link>
                </form>
            )}
            {stage === 2 && (
                <form className="center_form">
                    <h2>Write your code</h2>
                    {error && <h2 className="error">{error}</h2>}
                    <InputField
                        label="Code"
                        name="code"
                        type="text"
                        onChange={handleChange}
                    />
                    <InputField
                        label="New Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <button onClick={changePassword}>Change Password</button>
                </form>
            )}
            {stage === 3 && (
                <>
                    <h2>Success</h2>

                    <Link to="/login">Click here to Log in!</Link>
                </>
            )}
        </>
    );
}
