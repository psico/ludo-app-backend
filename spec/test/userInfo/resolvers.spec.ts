const {Query} = require("../../../src/userInfo/resolvers");

describe("QUERY UserInfo", () => {
    it("Function usersInfo()", () => {
        expect(typeof Query.usersInfo()).toBe("object");
    });

    it("Function userInfo()", () => {
        expect(typeof Query.userInfo("", {id: 0})).toBe("undefined");
    });
});
