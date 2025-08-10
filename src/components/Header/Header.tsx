import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderProps {
  appName: string;
  appId?: string;
  variant: 'appView' | 'editApp';
  isCompliant?: boolean;
  nonComplianceInfo?: string;
  nonCompliantDays?: number;
  lastUpdates?: string;
  loading?: boolean;
  error?: string | null;
}

const HEADER_HEIGHT = 72;
const GREEN = '#22b14c';
const RED = '#e74c3c';
const BLUE = '#1976d2';

const HeaderBar = styled.header<{ variant: 'appView' | 'editApp'; isCompliant?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ variant, isCompliant }) => {
    if (variant === 'editApp') return BLUE;
    return isCompliant ? GREEN : RED;
  }};
  color: white;
  padding: ${({ variant }) => variant === 'editApp' ? '20px 32px' : '0 2.5rem'};
  height: ${({ variant }) => variant === 'editApp' ? 'auto' : `${HEADER_HEIGHT}px`};
  min-height: ${({ variant }) => variant === 'editApp' ? 'auto' : `${HEADER_HEIGHT}px`};
  position: relative;
  font-weight: 500;
  font-size: 22px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  z-index: 20;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const AppName = styled.span`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const EditLink = styled(Link)`
  font-size: 16px;
  color: rgba(255,255,255,0.85);
  margin-left: 8px;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 400;
  &:hover {
    color: rgba(255,255,255,1);
  }
`;

const StatusArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 22px;
  font-weight: 600;
`;

const LastUpdates = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(255,255,255,0.7);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
`;

const Popover = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT + 8}px;
  right: 0;
  min-width: 240px;
  background: white;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  padding: 1rem;
  z-index: 100;
  font-size: 16px;
  font-weight: 400;
`;

const LoadingMessage = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: #ffebee;
`;

const Header: React.FC<HeaderProps> = ({
  appName,
  appId,
  variant,
  isCompliant,
  nonComplianceInfo,
  nonCompliantDays,
  lastUpdates,
  loading,
  error,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  if (variant === 'editApp') {
    return (
      <HeaderBar variant="editApp">
        <div>
          <AppName>{appName}</AppName>
          {loading && <LoadingMessage>Loading...</LoadingMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <LastUpdates>{lastUpdates || 'Last_Updates'}</LastUpdates>
      </HeaderBar>
    );
  }

  // AppView variant
  const statusText = isCompliant
    ? 'Compliant'
    : `Not Compliant${typeof nonCompliantDays === 'number' ? ` for ${nonCompliantDays} day${nonCompliantDays === 1 ? '' : 's'}` : ''}`;

  return (
    <HeaderBar variant="appView" isCompliant={isCompliant}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <AppName>{appName}</AppName>
        <EditLink to={`/admin?appId=${appId}&appName=${encodeURIComponent(appName)}`}>edit</EditLink>
      </div>
      <StatusArea>
        {!isCompliant && (
          <InfoIcon
            onClick={() => setPopoverOpen((open) => !open)}
            title="Why not compliant?"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2" fill="none"/>
              <text x="10" y="15" textAnchor="middle" fontSize="13" fill="white" fontFamily="Arial" fontWeight="bold">i</text>
            </svg>
          </InfoIcon>
        )}
        <span>{statusText}</span>
        {!isCompliant && popoverOpen && (
          <Popover onClick={() => setPopoverOpen(false)}>
            {nonComplianceInfo || 'This app is not compliant. Please review the issues.'}
          </Popover>
        )}
      </StatusArea>
    </HeaderBar>
  );
};

export default Header;
