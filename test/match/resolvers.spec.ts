import { Query } from '../../src/match/resolvers';
import firebase from 'firebase';

const mockData = [{
  // eslint-disable-next-line no-undef
  data: jest.fn(() => ({
    createdAt: firebase.firestore.Timestamp.now(),
    gameMoment: 'play-now',
    game: {
      name: 'Test Game',
      description: 'Only for test',
      yearPublished: 2021,
      objectId: 'Teste'
    },
    uid: 'testTestTestTestTestTestTest'
  }))
}];

const context = {
  // eslint-disable-next-line no-undef
  collection: jest.fn(x => ({
    // eslint-disable-next-line no-undef
    orderBy: jest.fn(x => ({
      // eslint-disable-next-line no-undef
      get: jest.fn(() => mockData)
    }))
  }))
};

// eslint-disable-next-line no-undef
describe('QUERY Match', () => {
  // eslint-disable-next-line no-undef
  it('Function matches()', async () => {
    const data = await Query.matches(null, null, context);

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
