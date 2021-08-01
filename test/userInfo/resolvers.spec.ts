const { Query } = require('../../src/userInfo/resolvers');

const mockData = {
  usersInfo: [
    {
      uid: 'uid-test-uid-test-uid-test-u',
      name: 'Test',
      friends: [
        {
          uid: 'friend-uid-test-friend-uid-t',
          name: 'Desenvolvedork JG'
        }
      ]
    }
  ]
};

const db = {
  collection: jest.fn(() => ({
    get: jest.fn(() => ({
      data: jest.fn(() => ([mockData]))
    }))
  }))
};

describe('QUERY UserInfo', () => {
  it('Function usersInfo()', async () => {
    const data = await Query.usersInfo(null, null, { db });

    expect(data[0]).toHaveProperty('createdAt');
  });
});
