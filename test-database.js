const fetch = require('node-fetch');

// Test data for saving a test result
const testResultData = {
  studentName: "Test Student",
  email: "test@example.com",
  score: 8,
  totalQuestions: 10,
  attemptsUsed: 1,
  totalAttempts: 3,
  paymentId: "pay_test123",
  orderId: "order_test123",
  timeTaken: "15 mins 30 secs",
  startedOn: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  completedOn: new Date().toISOString(),
  questions: [
    {
      question: "What is the capital of India?",
      selectedAnswer: "Delhi",
      correctAnswer: "Delhi",
      isCorrect: true
    },
    {
      question: "Which language is used for web apps?",
      selectedAnswer: "JavaScript",
      correctAnswer: "All of the above",
      isCorrect: false
    }
  ]
};

async function testDatabase() {
  console.log('🧪 Testing Database Functionality...\n');

  try {
    // Test 1: Save test result
    console.log('1. Testing save test result...');
    const saveResponse = await fetch('http://localhost:3000/save-test-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testResultData)
    });

    const saveData = await saveResponse.json();
    console.log('Save response:', saveData);

    if (saveData.success) {
      console.log('✅ Test result saved successfully!');
      console.log('Record ID:', saveData.record._id);
    } else {
      console.log('❌ Failed to save test result:', saveData.error);
      return;
    }

    // Test 2: Fetch test records
    console.log('\n2. Testing fetch test records...');
    const fetchResponse = await fetch('http://localhost:3000/test-records');
    const fetchData = await fetchResponse.json();
    console.log('Fetch response:', fetchData);

    if (fetchData.success) {
      console.log('✅ Test records fetched successfully!');
      console.log('Total records:', fetchData.total);
      console.log('Latest record:', fetchData.records[0]);
    } else {
      console.log('❌ Failed to fetch test records:', fetchData.error);
    }

    // Test 3: Fetch specific test record
    if (saveData.success && saveData.record._id) {
      console.log('\n3. Testing fetch specific test record...');
      const specificResponse = await fetch(`http://localhost:5000/api/test-results/${saveData.record._id}`);
      const specificData = await specificResponse.json();
      console.log('Specific record response:', specificData);

      if (specificData.success) {
        console.log('✅ Specific test record fetched successfully!');
        console.log('Record details:', specificData.record);
      } else {
        console.log('❌ Failed to fetch specific test record:', specificData.message);
      }
    }

    // Test 4: Admin dashboard data
    console.log('\n4. Testing admin dashboard data...');
    const dashboardResponse = await fetch('http://localhost:3000/admin-dashboard');
    const dashboardData = await dashboardResponse.json();
    console.log('Dashboard response:', dashboardData);

    if (dashboardData.success) {
      console.log('✅ Admin dashboard data fetched successfully!');
      console.log('Test stats:', dashboardData.data.testStats);
    } else {
      console.log('❌ Failed to fetch admin dashboard data:', dashboardData.error);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run the test
testDatabase(); 