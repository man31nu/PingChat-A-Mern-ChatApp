const axios = require('axios');
(async () => {
  try {
    // Try to sign up a test user (ignore if already exists)
    const signupData = {
      fullName: 'Test User',
      username: 'testuser123',
      password: 'TestPass123!',
      confirmPassword: 'TestPass123!'
    };
    try {
      const signupRes = await axios.post('http://localhost:5000/api/auth/signup', signupData);
      console.log('Signup success:', signupRes.data);
    } catch (e) {
      console.log('Signup maybe already exists, proceeding...');
    }
    // Login
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'testuser123',
      password: 'TestPass123!'
    });
    const token = loginRes.data.token;
    console.log('Logged in, token:', token.slice(0, 20) + '...');
    // Update profile
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
