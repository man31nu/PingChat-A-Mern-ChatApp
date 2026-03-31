(async () => {
  try {
    const base = 'http://localhost:5000';
    // Helper functions
    const post = async (url, data, token) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
      });
      return await res.json();
    };
    const patch = async (url, data, token) => {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return await res.json();
    };

    // Sign up test user (ignore errors if already exists)
    const signupData = {
      fullName: 'Test User',
      username: 'testuser123',
      password: 'TestPass123!',
      confirmPassword: 'TestPass123!'
    };
    try {
      const signupRes = await post(`${base}/api/auth/signup`, signupData);
      console.log('Signup response:', signupRes);
    } catch (e) {
      console.log('Signup likely failed (user may exist)');
    }

    // Login
    const loginRes = await post(`${base}/api/auth/login`, {
      username: 'testuser123',
      password: 'TestPass123!'
    });
    const token = loginRes.token;
    console.log('Logged in, token (first 20 chars):', token?.slice(0, 20) + '...');

    // Update profile
    const updateRes = await patch(`${base}/api/users/update-profile`, {
      fullName: 'Test User Updated',
      email: 'testupdated@example.com'
    }, token);
    console.log('Update response:', updateRes);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
})();
