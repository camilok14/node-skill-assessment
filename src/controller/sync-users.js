const fetch = require('node-fetch');

const getItemsFromAPI = async () => {
  const result = await fetch('https://api.github.com/search/users?q=payflow');
  const data = await result.json();
  return data.items;
};

const syncUsers = async userRepository => {
  const itemsFromAPI = await getItemsFromAPI();
  const users = itemsFromAPI.map(item => ({
    userName: item.login,
    picture: item.avatar_url,
    externalId: `${item.id}`
  }));
  userRepository.deleteAllUsers();
  const allAdded = users.every(user => userRepository.addUser(user));
  if (!allAdded) {
    throw new Error('Could not add all users retrieved from API');
  }
};
module.exports = { syncUsers };
