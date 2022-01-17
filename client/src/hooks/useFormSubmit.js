import { useState } from "react";

export default function useFormSubmit(url, userInput) {
    const [error, setError] = useState(false);
    const submit = (e) => {
        fetch(url, {});
    };

    return [submit, error];
}
