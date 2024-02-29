import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  font-family: Inter;
  font-size: 24px;
`;

export const Content = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 600px;
  padding: 60px;
  border-radius: 20px;
`;

export const ContainerInput = styled.div``;

export const Label = styled.label`
  font-size: 30px;
  padding: 0.5rem 0 1.5rem;
  color: #676767;
 

`;

export const Label1 = styled.label`
  font-size: 25px;
  color: #676767;
  
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const Input = styled.input`
  font-size: 17px;
  border: none;
  width: 20rem;
  border-bottom: 1px solid black;
  padding: 0.5rem 0 0.5rem;

`;

export const NTinput = styled.input`
  font-size: 17px;
  border: none;
  border-bottom: 1px solid black;
  width: 3.8rem;
  padding: 0.5rem 0 0.5rem;

`;


export const Img = styled.img`
`;


export const DtCheck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  padding: 1rem 0 2rem;

  .date-input {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  label {
    margin-bottom: 0;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;
  padding: 0 0 1rem;
`;

export const LabelSignin = styled.label`
  color: #676767;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;