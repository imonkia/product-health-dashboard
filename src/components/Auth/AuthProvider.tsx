import React from 'react';
import { AuthKitProvider } from '@workos-inc/authkit-react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const workosClientId = process.env.REACT_APP_WORKOS_CLIENT_ID;
  
  if (!workosClientId) {
    console.error('REACT_APP_WORKOS_CLIENT_ID is not defined in environment variables');
    return <div>Missing WorkOS configuration</div>;
  }

  return (
    <AuthKitProvider
      clientId={workosClientId}
      redirectUri={window.location.origin}
    >
      {children}
    </AuthKitProvider>
  );
};

export default AuthProvider;
