# YugaYatra Admin Dashboard Features

## Overview
The YugaYatra admin dashboard provides comprehensive management capabilities for payments, test records, and internship applications. Access the dashboard at `http://localhost:3000/admin.html` or through the React app at `http://localhost:5173/admin`.

## Access Methods

### 1. Direct Access
- **URL**: `http://localhost:3000/admin.html`
- **Description**: Direct access to the admin dashboard served by the backend server

### 2. Through React App
- **URL**: `http://localhost:5173/admin`
- **Description**: Access through the React application (redirects to admin.html)

### 3. Navigation
- **Admin Button**: Located in the top navigation bar of the website
- **Mobile**: Available in the mobile menu

## Dashboard Features

### 📊 Overview Tab
**Real-time statistics and recent activity monitoring**

- **Payment Statistics**: Total payments, successful transactions, errors
- **Test Statistics**: Total tests taken, average scores, pass/fail rates
- **Application Statistics**: Total applications, pending reviews, accepted applications
- **Recent Activity**: Live feed of system activities
- **Quick Actions**: Refresh data and export functionality

### 💳 Payments Tab
**Complete payment management and monitoring**

**Statistics Cards:**
- Total Orders Created
- Successful Payments
- Total Amount Collected
- Payment Errors

**Payment Table Features:**
- Date and time of transactions
- Order ID and Payment ID tracking
- Amount details
- Payment status indicators
- Action buttons for detailed view

**Search & Filter:**
- Search payments by ID or details
- Filter by payment status (success/error)

### 📝 Test Records Tab
**Comprehensive test result management**

**Statistics Cards:**
- Total Tests Taken
- Average Score Percentage
- Passed Tests Count
- Failed Tests Count

**Test Records Table:**
- Test completion date
- Student name and email
- Score and percentage
- Attempts used vs. total attempts
- Associated payment ID

**Search & Filter:**
- Search by student name or email
- Filter by test results (passed/failed)

### 📋 Applications Tab
**Internship application management**

**Statistics Cards:**
- Total Applications Received
- Pending Review Count
- Reviewed Applications
- Accepted Applications

**Applications Table:**
- Application submission date
- Applicant details (name, email)
- Domain/field of interest
- Skills summary
- Application status
- Action buttons for management

**Search & Filter:**
- Search applications by name or email
- Filter by application status

## Backend API Endpoints

### Payment Management
- `GET /payment-stats` - Get payment statistics
- `GET /payment-logs` - Get detailed payment logs
- `POST /create-order` - Create new payment order
- `POST /verify-payment` - Verify payment completion

### Test Records
- `GET /test-records` - Get all test records
- `POST /save-test-result` - Save new test result

### Applications
- `GET /internship-applications` - Get all applications
- `POST /api/internships` - Save new application

### Combined Data
- `GET /admin-dashboard` - Get all dashboard data

## Data Storage

### Payment Logs
- **File**: `logs/payments.json`
- **Content**: All payment transactions, orders, and errors
- **Format**: JSON with timestamps and detailed information

### Test Records
- **File**: `logs/test-records.json`
- **Content**: All test results with student information
- **Format**: JSON with test scores, attempts, and payment correlation

### Applications
- **Database**: MongoDB (backend/index.js)
- **Model**: Internship schema with all application fields
- **Storage**: Persistent database storage

## Features

### 🔄 Real-time Updates
- Auto-refresh every 60 seconds on overview tab
- Manual refresh buttons on all tabs
- Live activity feed

### 🔍 Search & Filter
- Text search across all data tables
- Status-based filtering
- Date range filtering (planned)

### 📊 Data Export
- Export all dashboard data as JSON
- Downloadable files with timestamps
- Complete data backup functionality

### 📱 Responsive Design
- Mobile-friendly interface
- Adaptive layouts for all screen sizes
- Touch-optimized controls

### 🎨 Modern UI
- Gradient backgrounds and cards
- Smooth animations and transitions
- Professional color scheme
- Intuitive navigation

## Security Considerations

### Current Implementation
- No authentication required (development mode)
- Direct access to admin dashboard
- Sample data for demonstration

### Production Recommendations
- Implement user authentication
- Role-based access control
- API rate limiting
- HTTPS enforcement
- Database security measures

## Usage Instructions

### 1. Start the Servers
```bash
# Start backend server (payment server)
cd /path/to/project
npm install
node server.js

# Start React development server
cd YY
npm install
npm run dev
```

### 2. Access Admin Dashboard
- Navigate to `http://localhost:3000/admin.html`
- Or click the "Admin" button in the website navigation

### 3. Monitor Activities
- View real-time statistics on the Overview tab
- Check payment status and logs
- Review test results and scores
- Manage internship applications

### 4. Export Data
- Click "Export Data" button on Overview tab
- Download JSON file with all dashboard data
- Use for reporting and analysis

## Troubleshooting

### Common Issues

**Dashboard not loading:**
- Ensure backend server is running on port 3000
- Check browser console for CORS errors
- Verify all API endpoints are accessible

**No data showing:**
- Check if payment logs file exists: `logs/payments.json`
- Verify test records file: `logs/test-records.json`
- Ensure MongoDB is running for applications

**API errors:**
- Check server console for error messages
- Verify environment variables are set
- Ensure all dependencies are installed

### Error Messages
- **"Error loading dashboard data"**: Backend server not running
- **"No payment data found"**: No payments have been processed
- **"No test data found"**: No tests have been completed
- **"No application data found"**: No applications submitted

## Future Enhancements

### Planned Features
- User authentication and authorization
- Email notifications for new applications
- Advanced analytics and reporting
- Bulk operations for applications
- Test question management
- Payment refund processing
- Data visualization charts
- Automated status updates

### Technical Improvements
- Database integration for all data
- Real-time WebSocket updates
- Advanced search and filtering
- Data backup and recovery
- Performance optimization
- Mobile app integration

## Support

For technical support or feature requests:
- Check the server logs for detailed error information
- Review the API documentation
- Contact the development team

---

**Last Updated**: June 2025
**Version**: 1.0.0 