const { Query } = require("../../../src/friend/resolvers");

describe("TEST Friend", () => {
    it("some thing to test", () => {
        expect(typeof Query.friends()).toBe("object");
    });
});
