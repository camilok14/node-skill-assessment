const getUsers = userRepository => async (req, res) => {
  res.send(userRepository.findAllUsers());
};

module.exports = getUsers;
