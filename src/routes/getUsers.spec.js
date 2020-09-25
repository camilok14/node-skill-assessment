const getUsers = require('./getUsers');

describe('routes/getUsers.js', () => {
  it('should expose middleware', () => {
    const userRepository = { findAllUsers: () => 'findAllUsers' };
    const middleware = getUsers(userRepository);
    const res = { send: jest.fn() };
    middleware(undefined, res);
    expect(res.send).toHaveBeenCalledWith('findAllUsers');
  });
});
