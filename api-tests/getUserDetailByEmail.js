const axios = require('axios'); // HTTP client for making API requests

(async () => {
  try {
    // Send GET request with query parameters
    const res = await axios.get('https://automationexercise.com/api/getUserDetailByEmail', {
      params: { email: 'test@mail.com' },
      timeout: 15000 // 15-second timeout for safety
    });

    //  Check HTTP status code
    if (res.status === 200) {
      console.log('✅ API responded with status 200');
      console.log('Response data:', res.data);
      process.exit(0); // Exit with success
    } else {
      console.error('❌ Unexpected status code:', res.status);
      process.exit(1); // Exit with error
    }

  } catch (err) {
    console.error('❌ API test failed:', err.message);

    // If server responded but not with 200, log extra info
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
    }

    process.exit(1); // Exit with failure
  }
})();