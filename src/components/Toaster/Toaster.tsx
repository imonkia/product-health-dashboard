import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ToasterProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const ToasterContainer = styled.div<{ isVisible: boolean; type: 'success' | 'error' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  background: ${({ type }) => (type === 'success' ? '#4caf50' : '#f44336')};
  border-left: 4px solid ${({ type }) => (type === 'success' ? '#2e7d32' : '#d32f2f')};
  max-width: 300px;
  word-wrap: break-word;
`;

const ToasterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Message = styled.span`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  margin-left: 8px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const Toaster: React.FC<ToasterProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <ToasterContainer isVisible={isVisible} type={type}>
      <ToasterContent>
        <Icon>
          {type === 'success' ? '✓' : '✗'}
        </Icon>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>×</CloseButton>
      </ToasterContent>
    </ToasterContainer>
  );
};

export default Toaster; 