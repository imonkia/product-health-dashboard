import React, { useState } from 'react';
import styled from 'styled-components';

interface HeaderProps {
  appName: string;
  isCompliant: boolean;
  nonComplianceInfo?: string;
  nonCompliantDays?: number;
  onEditClick?: () => void;
}

const HEADER_HEIGHT = 72;
const GREEN = '#22b14c';
const RED = '#e74c3c';

const HeaderBar = styled.header<{ isCompliant: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ isCompliant }) => (isCompliant ? GREEN : RED)};
  color: white;
  padding: 0 2.5rem;
  height: ${HEADER_HEIGHT}px;
  min-height: ${HEADER_HEIGHT}px;
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

const EditLink = styled.span`
  font-size: 16px;
  color: rgba(255,255,255,0.85);
  margin-left: 8px;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 400;
`;

const StatusArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 22px;
  font-weight: 600;
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

const Header: React.FC<HeaderProps> = ({
  appName,
  isCompliant,
  nonComplianceInfo,
  nonCompliantDays,
  onEditClick,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const statusText = isCompliant
    ? 'Compliant'
    : `Not Compliant${typeof nonCompliantDays === 'number' ? ` for ${nonCompliantDays} day${nonCompliantDays === 1 ? '' : 's'}` : ''}`;

  return (
    <HeaderBar isCompliant={isCompliant}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <AppName>{appName}</AppName>
        <EditLink onClick={onEditClick}>edit</EditLink>
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