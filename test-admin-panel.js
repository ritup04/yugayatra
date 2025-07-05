const fetch = require('node-fetch');

const PAYMENT_SERVER_URL = 'http://localhost:3000';
const MAIN_BACKEND_URL = 'http://localhost:5000';

async function testAdminPanel() {
  console.log('🧪 Testing Admin Panel Endpoints...\n');

  // Test 1: Payment Server Health
  console.log('1. Testing Payment Server Health...');
  try {
    const healthResponse = await fetch(`${PAYMENT_SERVER_URL}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Payment server is healthy:', healthData.message);
    } else {
      console.log('❌ Payment server health check failed');
      return;
    }
  } catch (error) {
    console.log('❌ Payment server is not accessible:', error.message);
    return;
  }

  // Test 2: Payment Stats
  console.log('\n2. Testing Payment Stats...');
  try {
    const statsResponse = await fetch(`${PAYMENT_SERVER_URL}/payment-stats`);
    const statsData = await statsResponse.json();
    
    if (statsData.success) {
      console.log('✅ Payment stats retrieved successfully');
      console.log(`   Total Orders: ${statsData.stats.totalOrders}`);
      console.log(`   Total Payments: ${statsData.stats.totalPayments}`);
      console.log(`   Total Amount: ₹${statsData.stats.totalAmount}`);
      console.log(`   Total Errors: ${statsData.stats.totalErrors}`);
    } else {
      console.log('❌ Failed to get payment stats:', statsData.error);
    }
  } catch (error) {
    console.log('❌ Payment stats failed:', error.message);
  }

  // Test 3: Payment Logs
  console.log('\n3. Testing Payment Logs...');
  try {
    const logsResponse = await fetch(`${PAYMENT_SERVER_URL}/payment-logs`);
    const logsData = await logsResponse.json();
    
    if (logsData.success) {
      console.log('✅ Payment logs retrieved successfully');
      console.log(`   Total Logs: ${logsData.logs.length}`);
      
      const successPayments = logsData.logs.filter(log => log.type === 'PAYMENT_SUCCESS');
      console.log(`   Successful Payments: ${successPayments.length}`);
      
      if (successPayments.length > 0) {
        console.log('   Recent Payment:', {
          orderId: successPayments[0].orderId,
          paymentId: successPayments[0].paymentId,
          timestamp: successPayments[0].timestamp
        });
      }
    } else {
      console.log('❌ Failed to get payment logs:', logsData.error);
    }
  } catch (error) {
    console.log('❌ Payment logs failed:', error.message);
  }

  // Test 4: Admin Dashboard
  console.log('\n4. Testing Admin Dashboard...');
  try {
    const dashboardResponse = await fetch(`${PAYMENT_SERVER_URL}/admin-dashboard`);
    const dashboardData = await dashboardResponse.json();
    
    if (dashboardData.success) {
      console.log('✅ Admin dashboard data retrieved successfully');
      console.log(`   Payment Stats: ${JSON.stringify(dashboardData.data.paymentStats)}`);
      console.log(`   Test Stats: ${JSON.stringify(dashboardData.data.testStats)}`);
      console.log(`   Application Stats: ${JSON.stringify(dashboardData.data.applicationStats)}`);
      console.log(`   Recent Activity: ${dashboardData.data.recentActivity?.length || 0} items`);
    } else {
      console.log('❌ Failed to get admin dashboard:', dashboardData.error);
    }
  } catch (error) {
    console.log('❌ Admin dashboard failed:', error.message);
  }

  // Test 5: Test Records
  console.log('\n5. Testing Test Records...');
  try {
    const testResponse = await fetch(`${PAYMENT_SERVER_URL}/test-records`);
    const testData = await testResponse.json();
    
    if (testData.success) {
      console.log('✅ Test records retrieved successfully');
      console.log(`   Total Test Records: ${testData.records.length}`);
      
      if (testData.records.length > 0) {
        console.log('   Sample Test Record:', {
          studentName: testData.records[0].studentName,
          email: testData.records[0].email,
          score: testData.records[0].score,
          percentage: testData.records[0].percentage
        });
      }
    } else {
      console.log('❌ Failed to get test records:', testData.error);
    }
  } catch (error) {
    console.log('❌ Test records failed:', error.message);
  }

  // Test 6: Main Backend Test Results
  console.log('\n6. Testing Main Backend Test Results...');
  try {
    const backendTestResponse = await fetch(`${MAIN_BACKEND_URL}/api/test-results`);
    const backendTestData = await backendTestResponse.json();
    
    if (backendTestData.success) {
      console.log('✅ Main backend test results retrieved successfully');
      console.log(`   Total Test Results: ${backendTestData.records.length}`);
    } else {
      console.log('❌ Failed to get main backend test results:', backendTestData.message);
    }
  } catch (error) {
    console.log('❌ Main backend test results failed:', error.message);
  }

  console.log('\n🎉 Admin Panel Test Completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Open http://localhost:3000/admin.html in your browser');
  console.log('2. Check if all data is loading correctly');
  console.log('3. Test the different tabs (Overview, Payments, Tests, Applications)');
}

// Run the test
testAdminPanel().catch(console.error); 