import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Mutation, Query } from '../../src/match/resolvers';

const mockAxios = new MockAdapter(axios);

jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    currentUser: {
      uid: '1',
      displayName: 'Test Display Name',
      email: 'test@email.com',
      photoURL: 'http://photo.png'
    }
  })
  ),
  firestore: {
    Timestamp: {
      now: jest.fn(() => ({
        Timestap: { seconds: 1627137682, nanoseconds: 329000000 }
      }))
    }
  }
}));

jest.mock('firebase-admin', () => ({
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        get: jest.fn(() => ([mockData]))
      })),
      doc: jest.fn(() => ({
        get: jest.fn(() => mockData)
      }))
    }))
  })
  )
}));

const mockData = {
  data: jest.fn(() => ({
    createdAt: { Timestamp: { seconds: 1627588601, nanoseconds: 901000000 } },
    gameMoment: 'play-now',
    game: {
      name: 'Test Game',
      description: 'Only for test',
      yearPublished: 2021,
      objectId: 'Teste'
    },
    uid: 'uid-test-uid-test-uid-test-uid-test',
    id: 'id-test-id-test-id-test-id-test'
  }))
};

const db = {
  collection: jest.fn(() => ({
    orderBy: jest.fn(() => ({
      get: jest.fn(() => ([mockData]))
    })),
    doc: jest.fn(() => ({
      id: 'id-test-id-test-id-test-id-test',
      get: jest.fn(() => mockData),
      set: jest.fn(() => mockData)
    }))
  }))
};

const firebase = {
  auth: jest.fn(() => ({
    currentUser: {
      uid: '1'
    }
  }))
};

describe('QUERY MATCH', () => {
  it('Function matches()', async () => {
    const data = await Query.matches(null, null, { db });

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
    const data = await Query.match(null, { id: 0 }, { db });

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
  it('Function createMatch()', async () => {
    mockAxios.onGet('https://api.boardgameatlas.com/api/search?ids=1&pretty=true&client_id=fceBG35WbJ').reply(200, {
      games: [{
        name: 'Game Test',
        image_url: 'http://image.png',
        year_published: 1985,
        description: 'Game Test description'
      }]
    });
    const match = await Mutation.createMatch(null, {
      MatchInput: {
        gameObjectId: 1,
        gameMoment: 'play-now',
        players: 'name'
      }
    }, { db, firebase });

    expect(typeof match).toBe('object');
    expect(match?.uid).toBe('1');
    expect(match?.gameMoment).toBe('play-now');
    expect(typeof match?.game).toBe('object');
    expect(match?.game).toHaveProperty('name');
    expect(match?.game).toHaveProperty('objectId');
    expect(match?.game).toHaveProperty('yearPublished');
    expect(match?.game).toHaveProperty('description');
  });

  it('Function addComment()', async () => {
    const match = await Mutation.addComment(null, {
      CommentInput: {
        idDoc: '1',
        text: 'Test Text'
      }
    }, { db, firebase });

    expect(typeof match).toBe('object');
    expect(match).toHaveProperty('comments');
    expect(match.comments).toHaveLength(1);
    expect(match.comments[0]).toHaveProperty('comment');
    expect(match.comments[0]).toHaveProperty('name');
    expect(match.comments[0]).toHaveProperty('photoURL');
    expect(match.comments[0]).toHaveProperty('uid');
  });
});
