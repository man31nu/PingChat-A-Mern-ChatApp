const axios = require('axios');
(async () => {
  try {
    // login first
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'testuser',
      password: 'testpass'
    });
    const token = loginRes.data.token;
    console.log('Logged in, token:', token.slice(0, 20) + '...');
    // update profile
    const updateRes = await axios.patch('http://localhost:5000/api/users/update-profile', {
      fullName: 'Test User Updated',
      email: 'testupdated@example.com'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Update response:', updateRes.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
})();
