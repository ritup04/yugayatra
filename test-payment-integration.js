const fetch = require('node-fetch');

const PAYMENT_SERVER_URL = 'http://localhost:3000';
const MAIN_BACKEND_URL = 'http://localhost:5000';

async function testPaymentIntegration() {
  console.log('🧪 Testing Payment Integration...\n');

  // Test 1: Check if servers are running
  console.log('1. Checking server availability...');
  
  try {
    const paymentHealth = await fetch(`${PAYMENT_SERVER_URL}/health`);
    if (paymentHealth.ok) {
      console.log('✅ Payment server is running');
    } else {
      console.log('❌ Payment server is not responding');
      return;
    }
  } catch (error) {
    console.log('❌ Payment server is not running');
    return;
  }

  try {
    const mainBackend = await fetch(MAIN_BACKEND_URL);
    if (mainBackend.ok) {
      console.log('✅ Main backend is running');
    } else {
      console.log('❌ Main backend is not responding');
      return;
    }
  } catch (error) {
    console.log('❌ Main backend is not running');
    return;
  }

  // Test 2: Test order creation
  console.log('\n2. Testing order creation...');
  
  try {
    const orderResponse = await fetch(`${PAYMENT_SERVER_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 500,
        currency: 'INR',
        customerInfo: {
          name: 'Test User',
          email: 'test@yugayatra.com',
          purpose: 'YugaYatra Internship Test Fee'
        }
      })
    });

    const orderData = await orderResponse.json();
    
    if (orderData.success && orderData.order) {
      console.log('✅ Order creation successful');
      console.log(`   Order ID: ${orderData.order.id}`);
      console.log(`   Amount: ${orderData.order.amount} paise`);
    } else {
      console.log('❌ Order creation failed:', orderData.error);
      return;
    }
  } catch (error) {
    console.log('❌ Order creation failed:', error.message);
    return;
  }

  // Test 3: Test payment stats
  console.log('\n3. Testing payment statistics...');
  
  try {
    const statsResponse = await fetch(`${PAYMENT_SERVER_URL}/payment-stats`);
    const statsData = await statsResponse.json();
    
    if (statsData.success) {
      console.log('✅ Payment stats retrieved');
      console.log(`   Total Orders: ${statsData.stats.totalOrders}`);
      console.log(`   Total Payments: ${statsData.stats.totalPayments}`);
      console.log(`   Total Amount: ₹${statsData.stats.totalAmount}`);
    } else {
      console.log('❌ Failed to get payment stats');
    }
  } catch (error) {
    console.log('❌ Payment stats failed:', error.message);
  }

  // Test 4: Test main backend communication
  console.log('\n4. Testing main backend communication...');
  
  try {
    const markPaidResponse = await fetch(`${MAIN_BACKEND_URL}/api/mark-paid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@yugayatra.com',
        paymentId: 'pay_test123',
        orderId: 'order_test123'
      })
    });

    const markPaidData = await markPaidResponse.json();
    
    if (markPaidData.success) {
      console.log('✅ User marked as paid successfully');
    } else {
      console.log('❌ Failed to mark user as paid:', markPaidData.message);
    }
  } catch (error) {
    console.log('❌ Main backend communication failed:', error.message);
  }

  // Test 5: Test attempts endpoint
  console.log('\n5. Testing attempts endpoint...');
  
  try {
    const attemptsResponse = await fetch(`${MAIN_BACKEND_URL}/api/attempts/test@yugayatra.com`);
    const attemptsData = await attemptsResponse.json();
    
    if (attemptsData.success) {
      console.log('✅ Attempts data retrieved');
      console.log(`   Payment Status: ${attemptsData.paymentStatus}`);
      console.log(`   Attempts Used: ${attemptsData.attemptsUsed}`);
      console.log(`   Remaining Attempts: ${attemptsData.remainingAttempts}`);
    } else {
      console.log('❌ Failed to get attempts data');
    }
  } catch (error) {
    console.log('❌ Attempts endpoint failed:', error.message);
  }

  console.log('\n🎉 Payment integration test completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start the frontend: cd YY && npm run dev');
  console.log('2. Test the complete payment flow in the browser');
  console.log('3. Check the admin dashboard: http://localhost:3000/admin.html');
}

// Run the test
testPaymentIntegration().catch(console.error); 