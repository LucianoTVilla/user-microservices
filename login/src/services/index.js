const axios = require('axios');

const { businessServiceUrl } = require('../utils/constants')

const getUsersService = async (token) => {
  try {
    const response = await axios.get(`${businessServiceUrl}/users`, {
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