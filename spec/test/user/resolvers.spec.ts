const {Query} = require("../../../src/user/resolvers");

describe("QUERY User", () => {
    it("Function users()", () => {
        expect(typeof Query.users()).toBe("object");
    });
});
