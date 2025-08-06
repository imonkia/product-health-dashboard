# Product Health Dashboard Server

This is the backend server for the Product Health Dashboard application. It provides REST API endpoints that serve the data needed by the React frontend, with MongoDB as the persistent data store.

## Features

- **RESTful API**: Complete CRUD operations for applications and operational data
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Real-time Data**: Live data updates from database
- **Environment Configuration**: Flexible configuration via environment variables
- **Database Seeding**: Automated data population for development
- **Error Handling**: Comprehensive error handling and logging

## Technology Stack

- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for data persistence
- **CORS** for cross-origin resource sharing
- **Moment.js** for date/time utilities
- **UUID** for unique identifier generation
- **dotenv** for environment variable management

## Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env file with your MongoDB URI
   echo "MONGODB_URI=mongodb://localhost:27017/product-health-dashboard" > .env
   echo "PORT=3001" >> .env
   echo "NODE_ENV=development" >> .env
   ```

3. **Seed the Database:**
   ```bash
   npm run seed
   ```
   > **Note**: This command should only be run during initial setup or when you want to reset the database to a clean state. Once seeded, data persists across server restarts and normal development. Only run this again if you need to clear all data and start fresh.

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will run on `http://localhost:3001` by default.

### Database Setup

1. **Install MongoDB:**
   - **Local**: Download and install MongoDB Community Server
   - **Cloud**: Create a MongoDB Atlas cluster

2. **Configure Connection:**
   - Update `MONGODB_URI` in `.env` file
   - Format: `mongodb://username:password@host:port/database`

3. **Seed the Database:**
   ```bash
   npm run seed
   ```

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

## Database Schema

### Applications Collection
Stores basic application information and associated links.

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
  ],
  createdAt: Date,      // Mongoose timestamp
  updatedAt: Date       // Mongoose timestamp
}
```

### OpexData Collection
Stores detailed operational excellence data for each application.

```javascript
{
  id: String,           // Application identifier
  name: String,         // Application name
  compliance: {         // Compliance information
    compliant: Boolean,
    complianceSince: String
  },
  issues: [...],        // Array of issues with full details
  vulnerabilities: [...], // Array of security vulnerabilities
  patching: [...],      // Array of patching information
  downtime: [...],      // Array of downtime events
  majorIncident: [...], // Array of major incidents
  groupName: String,
  gatehouseCheckin: Boolean,
  gatehouseCheckinDate: String,
  createdAt: Date,      // Mongoose timestamp
  updatedAt: Date       // Mongoose timestamp
}
```

## Data Models

### Application Model (`models/Application.js`)
- Handles application data and associated links
- Includes validation for required fields
- Supports nested link schema

### OpexData Model (`models/OpexData.js`)
- Manages operational excellence data
- Includes nested schemas for issues, vulnerabilities, patching, and downtime
- Supports complex data structures with proper validation

## Database Operations

### Seeding
Populate the database with initial data:
```bash
npm run seed
```

> **When to run seeding:**
> - **Initial setup**: First time after installing MongoDB
> - **Fresh database**: When starting with an empty database
> - **Reset data**: When you want to clear all data and start fresh
> - **Development**: When you need consistent test data
>
> **When NOT to run seeding:**
> - Normal development (data persists across restarts)
> - Server restarts (MongoDB data is persistent)
> - Application updates (data remains intact)

### Manual Database Operations
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use product-health-dashboard

# View collections
show collections

# Query applications
db.applications.find()

# Query opex data
db.opexdata.find()
```

### Backup and Restore
```bash
# Backup database
mongodump --db product-health-dashboard --out ./backup

# Restore database
mongorestore --db product-health-dashboard ./backup/product-health-dashboard
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/product-health-dashboard` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |

## Development

### Adding New Models
1. Create new model file in `models/`
2. Define schema with proper validation
3. Export the model
4. Update routes to use the new model

### Adding New Endpoints
1. Create new route file in `routes/`
2. Define endpoints with proper error handling
3. Import and use in `server.js`

### Database Migrations
1. Update model schemas in `models/`
2. Handle data migration in route handlers
3. Test with existing data

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Verify MongoDB is running
   - Check connection string format
   - Ensure network connectivity
   - Check firewall settings

2. **Database Empty**
   - Run `npm run seed` to populate data
   - Check MongoDB connection
   - Verify database name in URI

3. **Schema Validation Errors**
   - Check model definitions
   - Verify data format
   - Review required fields

4. **Performance Issues**
   - Add database indexes
   - Optimize queries
   - Monitor connection pool

### Debug Mode

Enable detailed logging:
```bash
NODE_ENV=development npm run dev
```

Check server logs for:
- MongoDB connection status
- API request/response logs
- Error stack traces

## Production Deployment

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
PORT=3001
```

### Security Considerations
- Use environment variables for sensitive data
- Implement proper authentication
- Add rate limiting
- Use HTTPS in production
- Regular database backups

### Monitoring
- Monitor MongoDB connection status
- Track API response times
- Log database operations
- Set up health checks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test database operations
5. Submit a pull request

## License

This project is licensed under the ISC License. 