import React from 'react';
import styled from 'styled-components';
import { useAuth } from '@workos-inc/authkit-react';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const UserEmail = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`;

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ProfileContainer>
      <UserAvatar>
        {getInitials(user.firstName || user.email || 'U')}
      </UserAvatar>
      <UserInfo>
        <UserName>
          {user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}`
            : user.email
          }
        </UserName>
        {user.firstName && user.email && (
          <UserEmail>{user.email}</UserEmail>
        )}
      </UserInfo>
    </ProfileContainer>
  );
};

export default UserProfile;
