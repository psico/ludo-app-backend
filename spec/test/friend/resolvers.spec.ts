const { Query } = require("../../../src/friend/resolvers");

describe("TEST Friend", () => {
    it("Function friends()", () => {
        expect(typeof Query.friends()).toBe("object");
    });

    it("Function friend()", () => {
        expect(typeof Query.friend("",{id:1})).toBe("object");
    });
});
