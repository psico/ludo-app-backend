const { Query } = require("../../../src/friend/resolvers");

describe("TEST Friend", () => {
    it("Function friends", () => {
        expect(typeof Query.friends()).toBe("object");
    });
});
