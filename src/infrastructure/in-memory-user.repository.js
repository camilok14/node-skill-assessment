const userSchema = require('../entities/user');

class InMemoryUserRepository {
  constructor() {
    this.memory = {};
  }

  deleteAllUsers() {
    this.memory = {};
  }

  findAllUsers() {
    return Object.values(this.memory);
  }

  findByUserName(userName) {
    return this.memory[userName];
  }

  updateUser(user) {
    const updatedUser = {
      ...this.memory[user.userName],
      ...user
    };
    const { value, error } = userSchema.validate(updatedUser);
    if (error) {
      throw new Error(error);
    }

    this.memory[value.userName] = value;
    return true;
  }

  deleteUserByUserName(userName) {
    delete this.memory[userName];
  }

  addUser(user) {
    const { value, error } = userSchema.validate(user);
    if (error) {
      throw new Error(error);
    }
    this.memory[value.userName] = value;
    return true;
  }
}

module.exports = InMemoryUserRepository;
