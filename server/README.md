# Product Health Dashboard Server

This is the backend server for the Product Health Dashboard application. It provides REST API endpoints that serve the data needed by the React frontend.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### Authentication
- `GET /api/v1/app/user` - Get current user information

### Applications
- `GET /api/v1/app/applications` - Get list of all applications
- `GET /api/v1/app/applications/:id` - Get specific application by ID

### Operational Excellence
- `GET /api/v1/app/opex/:appId` - Get operational excellence data for a specific app
- `GET /api/v1/app/appdata/:appId/vulns/:qid/hosts` - Get host data for a specific vulnerability

### Health Check
- `GET /health` - Server health check

## Data Structure

### Application Data
Each application contains:
- Basic info (id, name, category)
- Compliance status
- Issues, vulnerabilities, patching, downtime data
- Gatehouse information

### Mock Data
The server currently uses mock data that matches the frontend's expected structure. In a production environment, this would be replaced with database queries.

## Development

The server uses:
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Moment.js** - Date/time utilities
- **UUID** - Unique identifier generation

## Environment Variables

- `PORT` - Server port (default: 3001)

## Error Handling

All endpoints include proper error handling and will return appropriate HTTP status codes:
- `200` - Success
- `404` - Not found
- `500` - Server error 