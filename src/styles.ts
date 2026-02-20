import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-flow: column;
    > button {
      margin-top: 1em;
    }
  }
`;

export const Title = styled.h1`
  font-family: cocogoose_proregular;
  margin: 0;
  border-width: 1px;
  line-height: 72px;
  font-size: 3rem; // Adjust as needed
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 1.5rem; // Adjust as needed
  text-align: center;
  margin-bottom: 1rem;
  color: #666; // Or your preferred subtitle color
`;

export const Container = styled.div`
  padding-top: 15vh;
  padding: 2em;
  max-width: 768px;
  margin: auto;
`;
