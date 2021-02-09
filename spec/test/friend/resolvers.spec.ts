const { Query, Mutation } = require("../../../src/friend/resolvers");

describe("QUERY Friend", () => {
    it("Function friends()", () => {
        expect(typeof Query.friends()).toBe("object");
    });

    it("Function friend()", () => {
        expect(typeof Query.friend("",{id:0})).toBe("undefined");
    });
});

describe("MUTATION Friend", () => {
    it("Function createFriend()", () => {
        expect(typeof Mutation.createFriend("", { uid: 1, name: "name" }))
            .toBe("object");
    });
});
