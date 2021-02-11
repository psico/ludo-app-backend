const {Query, Mutation} = require("../../../src/user/resolvers");

describe("QUERY User", () => {
    it("Function users()", () => {
        expect(typeof Query.users()).toBe("object");
    });

    it("Function user()", () => {
        expect(typeof Query.user("", {id: 0})).toBe("undefined");
    });
});

describe("MUTATION User", () => {
    it("Function createUser()", () => {
        const user = Mutation.createUser("", {name: "name", repo: "repo", age: 1})
        expect(typeof user).toBe("object");
        expect(user.name).toBe("name");
        expect(user.repo).toBe("repo");
        expect(user.age).toBe(1);
    });
});
