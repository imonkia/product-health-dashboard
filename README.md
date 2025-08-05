# Product Health Dashboard (Mockup)

This repository contains a mockup of a product health dashboard application I worked on during one of my internships. Due to the use of internal names, confidential information, and proprietary business logic in the original project, I am unable to share the actual code or specific details. This mockup demonstrates the general structure, design, and some of the features of the original dashboard, but all data, names, and implementation details have been changed or omitted for privacy and compliance reasons.

## Features

- **Dashboard Overview**: Main table showing all applications with compliance status and key metrics
- **App-Specific Views**: Detailed views for individual applications with tabbed interfaces
- **Operational Excellence**: Issues, vulnerabilities, patching, and downtime tracking
- **Collapsible Sections**: Organized data presentation with expandable sections
- **Administration**: Edit app configuration with form-based interface
- **Responsive Design**: Modern UI with styled-components
- **Real-time Data**: Connected to Node.js backend API

## Technology Stack

### Frontend
- **React 19** with TypeScript
- **React Router DOM** for navigation and routing
- **Styled Components** for CSS-in-JS styling
- **Recharts** for data visualization
- **Axios** for API communication
- **Moment.js** for date/time handling

### Backend
- **Node.js** with Express
- **CORS** for cross-origin requests
- **Moment.js** for date calculations
- **UUID** for unique identifiers

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-health-dashboard
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

### Running the Application

#### Option 1: Run Frontend and Backend Separately

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:3001`

2. **Start the frontend application** (in a new terminal)
   ```bash
   npm start
   ```
   The React app will run on `http://localhost:3000`

#### Option 2: Run Both with Concurrently (Recommended)

1. **Install concurrently globally**
   ```bash
   npm install -g concurrently
   ```

2. **Add a script to the root package.json**
   ```json
   {
     "scripts": {
       "dev": "concurrently \"npm start\" \"cd server && npm run dev\"",
       "server": "cd server && npm run dev"
     }
   }
   ```

3. **Run both frontend and backend**
   ```bash
   npm run dev
   ```

## API Integration

The frontend is now connected to the Node.js backend API. The application uses the following endpoints:

- `GET /api/v1/app/applications` - List all applications
- `GET /api/v1/app/opex/:appId` - Get operational excellence data for an app
- `GET /api/v1/app/user` - Get user authentication info
- `GET /health` - Server health check

### Data Flow

1. **Dashboard**: Fetches application list and enriches with opex data
2. **App Views**: Loads detailed operational data for specific applications
3. **Real-time Updates**: All data is fetched from the server instead of mock data

## Project Structure

```
product-health-dashboard/
├── src/
│   ├── components/
│   │   ├── AppView/           # Individual app views
│   │   ├── Dashboard/         # Main dashboard table
│   │   ├── Administration/    # Edit app forms
│   │   └── Sidebar/          # Navigation sidebar
│   ├── services/
│   │   └── api.ts            # API service layer
│   └── mockDashboardData.ts  # Legacy mock data (now unused)
├── server/
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── applications.js   # Application endpoints
│   │   └── opex.js          # Operational excellence endpoints
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
└── package.json              # Frontend dependencies
```

## Key Components

### Dashboard Table
- Displays all applications with compliance status
- Shows metrics for issues, vulnerabilities, patching, and downtime
- Filterable by category and status
- Clickable app names for navigation

### App View
- Tabbed interface for Issues, Vulnerabilities, Patching, Downtime
- Collapsible sections for organized data presentation
- Real-time data from server API
- Compliance status header with popover for non-compliant apps

### Administration
- Form-based app configuration
- Collapsible sections for KPIs and Links
- Nested checkbox relationships
- URL parameter integration for app selection

## Development

### Adding New Endpoints

1. **Backend**: Add new routes in `server/routes/`
2. **Frontend**: Add new methods in `src/services/api.ts`
3. **Components**: Use the API service in your components

### Environment Configuration

The frontend automatically connects to `http://localhost:3001` for the API. To change this:

1. Create a `.env` file in the root directory
2. Add: `REACT_APP_API_URL=http://your-api-url`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend server is running on port 3001
2. **API Connection Failed**: Check that the server is running and accessible
3. **Data Not Loading**: Verify the API endpoints are working correctly

### Debug Mode

Enable detailed logging by checking the browser console for API request/response logs.

## Disclaimer

This code is for demonstration and portfolio purposes only. It does not represent the actual product or any proprietary information from my internship. All data, business logic, and specific implementation details have been modified or removed to protect confidentiality and comply with non-disclosure agreements.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the ISC License.