const myMockFn = jest.fn((n) => n * 2);
test("test that pam call our function correctly", () => {
    const a = [10, 20, 30, 40];
    a.map(myMockFn);
});
