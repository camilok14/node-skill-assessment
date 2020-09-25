const { syncUsers } = require('../controller/sync-users');

module.exports = userRepository => async (req, res) => {
  try {
    await syncUsers(userRepository);
    res.send({ message: 'All done' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
