import { Query } from '../../src/match/resolvers';

// eslint-disable-next-line no-undef
describe('QUERY Match', () => {
  // eslint-disable-next-line no-undef
  it('Function matches()', () => {
    Query.matches(null, null, null);
    //         expect(typeof Query.friends()).toBe("object");
  });
//
//     it("Function friend()", () => {
//         expect(typeof Query.friend("", {id: 0})).toBe("undefined");
//     });
});
//
// describe("MUTATION Friend", () => {
//     it("Function createFriend()", () => {
//         const friend = Mutation.createFriend("", {uid: 1, name: "name"})
//         expect(typeof friend).toBe("object");
//         expect(friend.uid).toBe(1);
//         expect(friend.name).toBe("name");
//     });
// });
//
// describe("MODEL Friend", () => {
//     it("Property uid", () => {
//         const uid = Friend.uid({uid: "1"});
//         expect(typeof uid).toBe("string");
//         expect(uid).toBe("1");
//     });
//
//     it("Property name", () => {
//         const name = Friend.name({name: "name"});
//         expect(typeof name).toBe("string");
//         expect(name).toBe("name");
//     });
// });
