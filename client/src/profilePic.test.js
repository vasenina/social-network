import ProfilePic from "./profilePic";
import { render, fireEvent } from "@testing-library/react";

test("when no url - dafault_profile ", () => {
    const { container } = render(<ProfilePic />);
    console.log(container.querySelector("img").src);
    expect(
        container.querySelector("img").src.endsWith("default_profile.png")
    ).toBe(true);
});

test("when has url - has url ", () => {
    const { container } = render(<ProfilePic picUrl="https://f.com" />);
    console.log(container.querySelector("img").src);
    expect(container.querySelector("img").src.endsWith("f.com")).toBe(true);
});

test("onclick prop", () => {
    const fakeOnClick = jest.fn(() => {
        console.log("user clicked");
        const { container } = render(<ProfilePic action={fakeOnClick} />);
        fireEvent.click(container.querySelector("img"));
        console.log("fakeOnClick.mock:", fakeOnClick.mock());
        expect(fakeOnClick.mock.calls.length).toBe(1);
    });
});
