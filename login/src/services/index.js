const axios = require('axios');

const getUsersService = async (token) => {
  try {
    const response = await axios.get(`http://localhost:3001/users`, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error getting users' + error.message);
  }
}

module.exports = getUsersService;