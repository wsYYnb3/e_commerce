import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const ClerkForm = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
  }
`;
