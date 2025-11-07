const axios = require('axios');

(async () => {
  try {
    const res = await axios.get('https://automationexercise.com/api/getUserDetailByEmail', {
      params: { email: 'test@mail.com' },
      timeout: 15000
    });

    // Check HTTP status code
    if (res.status === 200) {
      console.log(' API responded with status 200');
      console.log('Response data:', res.data);
      process.exit(0);
    } else {
      console.error(' Unexpected status code:', res.status);
      process.exit(1);
    }
  } catch (err) {
    console.error(' API test failed:', err.message);
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
    }
    process.exit(1);
  }
})();
