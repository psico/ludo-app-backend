const { Query } = require('../../src/userInfo/resolvers');

const mockData = {
  data: jest.fn(() => ({
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
    console.log('data.usersInfo => ', data.usersInfo);
    expect(data.usersInfo).toHaveProperty('uid');
    expect(data.usersInfo).toHaveProperty('name');
    expect(data.usersInfo).toHaveProperty('friends');
  });
});
