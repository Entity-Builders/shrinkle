import { animated } from '@react-spring/web';
import { styled } from 'styled-components';

export const FormContainer = styled.div`
  padding: 2em;
  flex: 1;
  display: flex;
  margin: 0;
  border-radius: 8px;
  flex-flow: row;
  height: 40px;
  width: 100%;
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 10%;
`;

export const FormStyled = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-flow: column;
    > button {
      margin-top: 1em;
    }
  }
`;

export const Input = styled.input`
  display: block;
  margin-bottom: 16px;
  border-radius: 0.4em;
  border-width: 0px;
  padding: 16px;
  box-sizing: border-box; /* Include padding and border in the width */
  width: 100%;
  height: 40px;
  outline: none;
`;

export const BorderAnimated = styled(animated.div)`
  border-radius: 0.4em;
  border-width: 1px;
  border-style: solid;
  height: 40px;
  border-color: white;
  flex: 1;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    flex: unset;
  }
`;

export const Button = styled.button`
  background-color: black;
  color: white;
  margin-left: 1em;
  font-size: 12px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Icon = styled.div<{ inline?: boolean }>`
  background-image: ${(props) =>
    props.inline ? '' : `url("label-customize.svg")`};
  background-size: cover;
  border-width: 1px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
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
  font-size: 1.2rem; // Adjust as needed
  text-align: center;
  margin-bottom: 2rem;
  color: #666; // Or your preferred subtitle color
`;

export const Container = styled.div`
  padding-top: 15vh;
`;
