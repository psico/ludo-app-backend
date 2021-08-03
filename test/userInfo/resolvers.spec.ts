const { Query } = require('../../src/userInfo/resolvers');

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
    get: jest.fn(() => ([mockData]))
  }))
};

describe('QUERY UserInfo', () => {
  it('Function usersInfo()', async () => {
    const data = await Query.usersInfo(null, null, { db });

    expect(data[0]).toHaveProperty('uid');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('friends');
    expect(data[0].friends[0]).toHaveProperty('uid');
    expect(data[0].friends[0]).toHaveProperty('name');
  });
});
