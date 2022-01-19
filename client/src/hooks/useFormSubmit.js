import { useState } from "react";

export default function useFormSubmit(url, userInput, inputFields) {
    const [error, setError] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        console.log("user wants to submit", userInput);

        let errorString = "";
        console.log(error);
        for (let i = 0; i < inputFields.length; i++) {
            if (!userInput[inputFields[i]]) {
                if (errorString.length <= 0) {
                    errorString = `Please fill  ${inputFields[i]}`;
                    // console.log("error was empty", error);
                } else errorString += ` and  ${inputFields[i]}`;
            }
        }
        if (errorString.length > 0) {
            setError(errorString);
            return [submit, error];
        }

        fetch(url, {
            method: `POST`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInput),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    location.replace("/");
                } else {
                    setError("Your email or password are incorrect.");
                }
            });
    };

    console.log(error);
    return [submit, error];
}
