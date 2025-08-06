# Product Health Dashboard (Mockup)

This repository contains a mockup of a product health dashboard application I worked on during one of my internships. Due to the use of internal names, confidential information, and proprietary business logic in the original project, I am unable to share the actual code or specific details. This mockup demonstrates the general structure, design, and some of the features of the original dashboard, but all data, names, and implementation details have been changed or omitted for privacy and compliance reasons.

## Features

- **Dashboard Overview**: Main table showing all applications with compliance status and key metrics
- **App-Specific Views**: Detailed views for individual applications with tabbed interfaces
- **Operational Excellence**: Issues, vulnerabilities, patching, and downtime tracking
- **Collapsible Sections**: Organized data presentation with expandable sections
- **Administration**: Edit app configuration with form-based interface
- **Responsive Design**: Modern UI with styled-components
- **Real-time Data**: Connected to Node.js backend API with MongoDB persistence

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
- **MongoDB** with Mongoose ODM for data persistence
- **CORS** for cross-origin requests
- **Moment.js** for date calculations
- **UUID** for unique identifiers
- **dotenv** for environment configuration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or cloud service)

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

4. **Set up MongoDB**
   - Install MongoDB locally or use a cloud service (MongoDB Atlas)
   - Create a database for the application
   - Update the MongoDB URI in `server/.env`

5. **Configure environment variables**
   ```bash
   cd server
   # Update the .env file with your MongoDB URI
   echo "MONGODB_URI=your_mongodb_connection_string" > .env
   echo "PORT=3001" >> .env
   echo "NODE_ENV=development" >> .env
   ```

6. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```
   > **Note**: This command should only be run during initial setup or when you want to reset the database to a clean state. Once seeded, data persists across server restarts and normal development. Only run this again if you need to clear all data and start fresh.

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

The frontend is now connected to the Node.js backend API with MongoDB persistence. The application uses the following endpoints:

- `GET /api/v1/app/applications` - List all applications
- `GET /api/v1/app/applications/:id` - Get specific application with links
- `GET /api/v1/app/opex/:appId` - Get operational excellence data for an app
- `GET /api/v1/app/user` - Get user authentication info
- `GET /health` - Server health check

### Data Flow

1. **Dashboard**: Fetches application list and enriches with opex data from MongoDB
2. **App Views**: Loads detailed operational data for specific applications from database
3. **Real-time Updates**: All data is fetched from the server and persisted in MongoDB
4. **Administration**: Links data is dynamically loaded from MongoDB

## Database Schema

### Applications Collection
```javascript
{
  id: String,           // Unique application identifier
  name: String,         // Application name
  category: String,     // Application category
  groupName: String,    // Group name
  gatehouseCheckin: Boolean,
  gatehouseCheckinDate: String,
  links: [              // Array of application links
    {
      order: Number,
      category: String,
      linkName: String,
      linkUrl: String
    }
  ]
}
```

### OpexData Collection
```javascript
{
  id: String,           // Application identifier
  name: String,         // Application name
  compliance: {         // Compliance information
    compliant: Boolean,
    complianceSince: String
  },
  issues: [...],        // Array of issues
  vulnerabilities: [...], // Array of vulnerabilities
  patching: [...],      // Array of patching data
  downtime: [...],      // Array of downtime events
  majorIncident: [...], // Array of major incidents
  groupName: String,
  gatehouseCheckin: Boolean,
  gatehouseCheckinDate: String
}
```

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
│   ├── config/
│   │   └── database.js       # MongoDB connection configuration
│   ├── models/
│   │   ├── Application.js    # Application data model
│   │   └── OpexData.js       # Operational excellence data model
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── applications.js   # Application endpoints
│   │   └── opex.js          # Operational excellence endpoints
│   ├── scripts/
│   │   └── seedDatabase.js   # Database seeding script
│   ├── server.js             # Main server file
│   ├── .env                  # Environment variables
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
- Real-time data from MongoDB via server API
- Compliance status header with popover for non-compliant apps

### Administration
- Form-based app configuration
- Collapsible sections for KPIs and Links
- Nested checkbox relationships
- URL parameter integration for app selection
- Dynamic links loading from MongoDB

## Development

### Adding New Endpoints

1. **Backend**: Add new routes in `server/routes/`
2. **Frontend**: Add new methods in `src/services/api.ts`
3. **Components**: Use the API service in your components

### Database Operations

1. **Seeding**: Run `npm run seed` in server directory
2. **Migrations**: Update models in `server/models/`
3. **Queries**: Use Mongoose queries in route handlers

### Environment Configuration

The frontend automatically connects to `http://localhost:3001` for the API. To change this:

1. Create a `.env` file in the root directory
2. Add: `REACT_APP_API_URL=http://your-api-url`

The backend uses MongoDB. Update the connection string in `server/.env`:
```
MONGODB_URI=your_mongodb_connection_string
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**: 
   - Verify MongoDB is running
   - Check connection string in `.env`
   - Ensure network connectivity

2. **CORS Errors**: Ensure the backend server is running on port 3001
3. **API Connection Failed**: Check that the server is running and accessible
4. **Data Not Loading**: Verify the API endpoints are working correctly
5. **Database Empty**: Run `npm run seed` to populate initial data

### Debug Mode

Enable detailed logging by checking the browser console for API request/response logs and server console for MongoDB connection status.

## Disclaimer

This code is for demonstration and portfolio purposes only. It does not represent the actual product or any proprietary information from my internship. All data, business logic, and specific implementation details have been modified or removed to protect confidentiality and comply with non-disclosure agreements.

This project was developed with the assistance of AI tools (Cursor) for code generation.

## License

This project is licensed under the ISC License.