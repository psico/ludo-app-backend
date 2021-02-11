const {Query} = require("../../../src/user/resolvers");

describe("QUERY User", () => {
    it("Function users()", () => {
        expect(typeof Query.users()).toBe("object");
    });

    it("Function user()", () => {
        expect(typeof Query.user("", {id: 0})).toBe("undefined");
    });
});
