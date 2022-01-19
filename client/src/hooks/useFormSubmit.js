import { useState } from "react";

export default function useFormSubmit(url, userInput) {
    const [error, setError] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        console.log("user wants to submit", userInput);

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
                    // setError("Smth wrong on the server");
                    setError("Your email or password are incorrect.");
                }
                // data.success
                //     ? location.replace("/")
                //     : setError("Smth wrong on the server");
            });
    };

    console.log(error);
    return [submit, error];
}
