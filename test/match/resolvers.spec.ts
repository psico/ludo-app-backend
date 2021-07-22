import { Query } from '../../src/match/resolvers';
import firebase from 'firebase';

const mockData = {
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
};

const context = {
  collection: jest.fn(() => ({
    orderBy: jest.fn(() => ({
      get: jest.fn(() => ([mockData]))
    })),
    doc: jest.fn(() => ({
      get: jest.fn(() => mockData)
    }))
  }))
};

describe('QUERY Match', () => {
  it('Function matches()', async () => {
    const data = await Query.matches(null, null, context);

    expect(Object.keys(data[0]).length).toEqual(5);
    expect(data[0]).toHaveProperty('createdAt');
    expect(data[0]).toHaveProperty('gameMoment');
    expect(data[0]).toHaveProperty('game');
    // @ts-ignore
    expect(data[0].game).toHaveProperty('name');
    // @ts-ignore
    expect(data[0].game).toHaveProperty('description');
    // @ts-ignore
    expect(data[0].game).toHaveProperty('yearPublished');
    // @ts-ignore
    expect(data[0].game).toHaveProperty('objectId');
    expect(data[0]).toHaveProperty('uid');
  });

  it('Function match()', async () => {
    const data = await Query.match(null, { id: 0 }, context);
  });
});

// describe("MUTATION Friend", () => {
//     it("Function createFriend()", () => {__proto__ = Object
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
