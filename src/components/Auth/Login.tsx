import React from 'react';
import styled from 'styled-components';
import { useAuth } from '@workos-inc/authkit-react';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f4f6fa;
`;

const LoginCard = styled.div`
  background: white;
  padding: 48px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Logo = styled.h1`
  color: #1976d2;
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 1.5;
`;

const LoginButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Login: React.FC = () => {
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>Pulseboard</Logo>
        <Subtitle>
          Product Health Dashboard
        </Subtitle>
        <LoginButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </LoginButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
