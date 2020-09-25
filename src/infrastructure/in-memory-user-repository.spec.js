const InMemoryUserRepository = require('./in-memory-user.repository.js');

describe('In-Memory User Repository', () => {
  const userRepository = new InMemoryUserRepository();
  const testUser = {
    userName: 'Payflow',
    externalId: 'test1234',
    externalSource: 'payflow',
    email: 'test@payflow.es'
  };

  const invalidUser = {
    login: 'Payflow',
    externalId: 'test1234',
    externalSource: 'payflow'
  };

  it('should allow me to add a valid user', () => {
    const success = userRepository.addUser(testUser);
    expect(success).toBe(true);
  });

  it('should not allow me to add an invalid user', () => {
    try {
      userRepository.addUser(invalidUser);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should return added users', () => {
    const allUsers = userRepository.findAllUsers();
    expect(allUsers.length).toBe(1);
    expect(allUsers[0]).toStrictEqual(testUser);
  });

  it('should allow me to update a user', () => {
    const updateUser = {
      userName: 'Payflow',
      email: 'tech@payflow.es'
    };

    const result = userRepository.updateUser(updateUser);
    const user = userRepository.findByUserName(updateUser.userName);

    expect(user).toStrictEqual({
      userName: 'Payflow',
      externalId: 'test1234',
      externalSource: 'payflow',
      email: 'tech@payflow.es'
    });
    expect(result).toBe(true);
  });

  it('should throw error id tries to update a user with not valid schema', () => {
    expect(
      () => { userRepository.updateUser({}); }
    ).toThrow('"userName" is required');
  });

  it('should allow me to delete a user', () => {
    userRepository.deleteUserByUserName('Payflow');

    const allUsers = userRepository.findAllUsers();

    expect(allUsers.length).toBe(0);
  });

  it('should delete all users', () => {
    userRepository.deleteAllUsers();
    expect(userRepository.memory).toMatchObject({});
  });
});
