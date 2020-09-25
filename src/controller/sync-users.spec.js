jest.mock('node-fetch', () => async () => ({
  json: async () => ({
    items: [{ login: 'login', avatar_url: 'avatar_url', id: 'id' }]
  })
}));
const { syncUsers } = require('./sync-users');

describe('controller/sync-users.js', () => {
  it('should sync users', async () => {
    const userRepository = {
      deleteAllUsers: jest.fn(),
      addUser: jest.fn(() => true)
    };
    await syncUsers(userRepository);
    expect(userRepository.deleteAllUsers).toHaveBeenCalled();
    expect(userRepository.addUser).toHaveBeenCalledWith({
      userName: 'login',
      picture: 'avatar_url',
      externalId: 'id'
    });
  });
});
