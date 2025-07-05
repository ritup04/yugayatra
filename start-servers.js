const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting YugaYatra servers...\n');

// Start main backend server (port 5000)
const mainBackend = spawn(process.platform === 'win32' ? 'cmd' : 'node',
  process.platform === 'win32'
    ? ['/c', 'set', 'PORT=5000', '&&', 'node', 'index.js']
    : ['index.js'],
  {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    env: { ...process.env, PORT: '5000' }
  }
);

console.log('📡 Main backend server starting on port 5000...');

// Start payment server (port 3000)
const paymentServer = spawn(process.platform === 'win32' ? 'cmd' : 'node',
  process.platform === 'win32'
    ? ['/c', 'set', 'PORT=3000', '&&', 'node', 'paymentServer.js']
    : ['paymentServer.js'],
  {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000' }
  }
);

console.log('💳 Payment server starting on port 3000...\n');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  mainBackend.kill();
  paymentServer.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down servers...');
  mainBackend.kill();
  paymentServer.kill();
  process.exit(0);
});

// Handle server crashes
mainBackend.on('close', (code) => {
  console.log(`❌ Main backend server exited with code ${code}`);
  paymentServer.kill();
  process.exit(code);
});

paymentServer.on('close', (code) => {
  console.log(`❌ Payment server exited with code ${code}`);
  mainBackend.kill();
  process.exit(code);
});

console.log('✅ Both servers are starting up...');
console.log('📊 Main Backend: http://localhost:5000');
console.log('💳 Payment Server: http://localhost:3000');
console.log('🎯 Frontend: http://localhost:5173 (run npm run dev in YY directory)\n'); 