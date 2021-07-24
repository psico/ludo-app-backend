import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import firebase from 'firebase';
import { Mutation, Query } from '../../src/match/resolvers';

const mockAxios = new MockAdapter(axios);

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

describe('QUERY MATCH', () => {
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

    expect(Object.keys(data).length).toEqual(4);
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('gameMoment');
    expect(data).toHaveProperty('game');
    // @ts-ignore
    expect(data.game).toHaveProperty('name');
    // @ts-ignore
    expect(data.game).toHaveProperty('description');
    // @ts-ignore
    expect(data.game).toHaveProperty('yearPublished');
    // @ts-ignore
    expect(data.game).toHaveProperty('objectId');
    expect(data).toHaveProperty('uid');
  });
});

describe('MUTATION MATCH', () => {
  it('Function createMatch()', () => {
    mockAxios.onGet('https://api.boardgameatlas.com/api/search?ids=1&pretty=true&client_id=fceBG35WbJ').reply(200, {
      games: [{
        name: 'Game Test',
        image_url: 'http://image.png',
        year_published: 1985,
        description: 'Game Test description'
      }]
    });
    const match = Mutation.createMatch(null, {
      MatchInput: {
        gameObjectId: 1, players: 'name'
      }
    }, context);

    // expect(typeof match).toBe("object");
    // expect(match.uid).toBe(1);
    // expect(match.name).toBe("name");
  });
});

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
