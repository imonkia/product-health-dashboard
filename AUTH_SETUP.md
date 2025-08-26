# WorkOS AuthKit Setup Guide

This guide explains how to set up WorkOS AuthKit authentication for the Product Health Dashboard.

## Prerequisites

1. A WorkOS account (sign up at [workos.com](https://workos.com))
2. Node.js and npm installed

## Setup Steps

### 1. Install Dependencies

The `@workos-inc/authkit-react` package is already installed in this project.

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# WorkOS Configuration
REACT_APP_WORKOS_CLIENT_ID=your_workos_client_id_here
```

### 3. Get Your WorkOS Client ID

1. Go to [WorkOS Dashboard](https://dashboard.workos.com/)
2. Navigate to "AuthKit" in the sidebar
3. Create a new AuthKit application or use an existing one
4. Copy the Client ID from the application settings

### 4. Configure Redirect URIs

In your WorkOS AuthKit application settings, add the following redirect URI:
```
http://localhost:3000
```

For production, add your production domain as well.

**Note**: You'll need to configure these and other redirects, for both development and production environments, in your [WorkOS Dashboard](https://dashboard.workos.com/get-started).

### 5. Start the Application

```bash
npm run dev
```

## How It Works

### Authentication Flow

1. **Login**: Users click "Sign In" and are redirected to WorkOS authentication
2. **Authentication**: WorkOS handles the authentication (SSO, SAML, etc.)
3. **Callback**: User is redirected back to the app with authentication tokens
4. **Protected Routes**: All routes are now protected and require authentication

### Components

- **AuthProvider**: Wraps the entire app and provides authentication context
- **ProtectedRoute**: Protects all routes from unauthorized access
- **Login**: Displays the login screen for unauthenticated users
- **UserProfile**: Shows user information and logout button in the sidebar

### User Information

The app will have access to the following user information:
- `user.email` - User's email address
- `user.firstName` - User's first name
- `user.lastName` - User's last name
- `user.id` - Unique user identifier

## Customization

### Styling

All authentication components use styled-components and can be customized by modifying the styled components in:
- `src/components/Auth/Login.tsx`
- `src/components/Auth/UserProfile.tsx`

### Authentication Methods

WorkOS AuthKit supports multiple authentication methods:
- SSO (Single Sign-On)
- SAML
- OAuth
- Magic Links
- Password-based authentication

Configure these in your WorkOS dashboard.

## Troubleshooting

### Common Issues

1. **"Missing WorkOS configuration" error**
   - Ensure `.env` file exists with `REACT_APP_WORKOS_CLIENT_ID`
   - Restart the development server after adding environment variables

2. **Authentication not working**
   - Check that redirect URIs are correctly configured in WorkOS dashboard
   - Verify the Client ID is correct

3. **CORS errors**
   - Ensure your redirect URI matches exactly what's configured in WorkOS

### Debug Mode

To enable debug logging, add this to your `.env` file:
```bash
REACT_APP_DEBUG=true
```

## Security Considerations

- Never expose your WorkOS API keys in client-side code
- Use environment variables for all sensitive configuration
- Implement proper session management
- Consider adding role-based access control (RBAC) if needed

## Next Steps

After setting up authentication, you may want to:
1. Add role-based access control
2. Implement user management
3. Add audit logging
4. Set up organization-specific access
5. Configure multi-factor authentication (MFA)
