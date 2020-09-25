jest.mock('../controller/sync-users', () => ({
  syncUsers: async userRepository => {
    if (userRepository === 'error') {
      throw new Error('error');
    }
  }
}));
const syncUsers = require('./syncUsers');

describe('routes/syncUsers.js', () => {
  it('should return status 500 if error on sync users', async () => {
    const middleware = syncUsers('error');
    const send = jest.fn();
    const res = {
      status: jest.fn(() => ({ send }))
    };
    await middleware(undefined, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(send).toHaveBeenCalledWith({ message: 'error' });
  });
  it('should return all done if users no errors', async () => {
    const middleware = syncUsers();
    const send = jest.fn();
    const res = { send };
    await middleware(undefined, res);
    expect(send).toHaveBeenCalledWith({ message: 'All done' });
  });
});
