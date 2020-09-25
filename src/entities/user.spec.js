const userSchema = require('./user');

describe('entities/user.js', () => {
  it('should thow error if user schema is not valid', () => {
    const user = {};
    const { error } = userSchema.validate(user);
    expect(error).toBeDefined();
  });
  it('should add default value to externalSource field', () => {
    const user = { userName: 'userName' };
    const { value } = userSchema.validate(user);
    expect(value).toMatchObject({ ...user, externalSource: 'payflow' });
  });
});
