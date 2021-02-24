const {Query, Mutation} = require("../../../src/userInfo/resolvers");

describe("QUERY UserInfo", () => {
    it("Function usersInfo()", () => {
        expect(typeof Query.usersInfo()).toBe("object");
    });

    it("Function userInfo()", () => {
        expect(typeof Query.userInfo("", {id: 0})).toBe("undefined");
    });
});

describe("MUTATION UserInfo", () => {
    it("Function createUserInfo()", () => {
        const userInfo = Mutation.createUserInfo("", {uid: 1, name: "name"})
        expect(typeof userInfo).toBe("object");
        expect(userInfo.uid).toBe(1);
        expect(userInfo.name).toBe("name");
    });
});
