const { Query } = require('../../src/userInfo/resolvers');

const mockData = {
  data: {
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
  }
};

const db = {
  collection: jest.fn(() => ({
    get: jest.fn(() => (mockData))
  }))
};

describe('QUERY UserInfo', () => {
  it('Function usersInfo()', () => {
    Query.usersInfo(null, null, db);
  });
});
