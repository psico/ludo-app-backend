const {Query, Mutation, UserInfo} = require("../../../src/userInfo/resolvers");

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

describe("MODEL UserInfo", () => {
    it("Property uid", () => {
        const uid = UserInfo.uid({uid: "1"});
        expect(typeof uid).toBe("string");
        expect(uid).toBe("1");
    });

    it("Property name", () => {
        const name = UserInfo.name({name: "name"});
        expect(typeof name).toBe("string");
        expect(name).toBe("name");
    });

    // it("Property friends", () => {
    //     const friends = UserInfo.friends({friends: []});
    //     expect(typeof friends).toBe("object");
    //     expect(friends).toBe();
    // });
});
