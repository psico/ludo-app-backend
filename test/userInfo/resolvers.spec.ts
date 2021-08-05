const { Query, Mutation } = require('../../src/userInfo/resolvers');

const mockData = {
  data: jest.fn(() => ({
    uid: '1111111111111111111111111111',
    name: 'Test',
    friends: [
      {
        uid: '2222222222222222222222222222',
        name: 'Friend Test'
      }
    ]
  }))
};

const db = {
  collection: jest.fn(() => ({
    get: jest.fn(() => ([mockData])),
    where: jest.fn(() => ({
      get: jest.fn(() => ({
        docs: [mockData]
      }))
    })),
    doc: jest.fn(() => ({
      set: jest.fn()
    }))
  }))
};

describe('QUERY UserInfo', () => {
  it('usersInfo()', async () => {
    const data = await Query.usersInfo(null, null, { db });

    expect(data[0]).toHaveProperty('uid');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('friends');
    expect(data[0].friends[0]).toHaveProperty('uid');
    expect(data[0].friends[0]).toHaveProperty('name');
  });

  it('userInfo()', async () => {
    const data = await Query.userInfo(null, { uid: '1111111111111111111111111111' }, { db });

    expect(data).toHaveProperty('uid');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('friends');
    expect(data.friends[0]).toHaveProperty('uid');
    expect(data.friends[0]).toHaveProperty('name');
  });
});

describe('MUTATION UserInfo', () => {
  it('createUserInfo()', async () => {
    const data = Mutation.createUserInfo(null, { uid: '1111111111111111111111111111', name: 'Test' }, { db });

    expect(data).toHaveProperty('uid');
    expect(data).toHaveProperty('name');
  });
});
