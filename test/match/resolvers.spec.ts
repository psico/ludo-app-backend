import { Query } from '../../src/match/resolvers';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

// const queryStub = collection => {
//   if (q == 'SELECT * from tweets') {
//     return Promise.resolve({
//       rows: [
//         { id: 1, body: 'hello' },
//         { id: 2, body: 'world' }
//       ]
//     });
//   }
// };

// eslint-disable-next-line no-undef
describe('QUERY Match', () => {
  // eslint-disable-next-line no-undef
  it('Function matches()', async () => {
    const mockData = [{
      // eslint-disable-next-line no-undef
      data: jest.fn(() => ({
        createdAt: Timestamp.now(),
        gameMoment: 'play-now',
        game: {
          name: 'Ab die Post!',
          description: '',
          yearPublished: 1996,
          objectId: 'H3sDuNTtK0'
        },
        uid: '0IhNFZFa7QMwBY6yZT8l24L1AX32'
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
    const data = await Query.matches(null, null, context);
    console.log('data => ', data);
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
