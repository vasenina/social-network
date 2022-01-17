import App from "./app";
import { render, waitFor } from "@testing-library/react";

//first test

test("App render a div", async () => {
    fetch.mockResolvedValue({
        async json() {
            return {
                first: "Yulia",
                last: "Vasenina",
                imageUrl: "https://a.com",
                bio: "bla-bla bio",
                error: "",
            };
        },
    });

    //pass to render
    const { container } = render(<App user_id="5" />);
    console.log("test", container.innerHTML);
    expect(container.innerHTML).toBe("..loading");
    await waitFor(() => {
        console.log(
            "container.querySelector(.app-container)",
            container.querySelector(".main-body").innerHTML
        );
        expect(container.querySelector(".main-body")).toBeTruthy();
    });
    console.log("done with awaiting waitFor");
});
