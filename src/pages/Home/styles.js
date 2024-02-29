import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  padding-left: 5rem;
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
  max-width: 650px;
  padding: 60px;
  border-radius: 20px;
`;

export const Title = styled.h2`
  font-size: 60px;
  margin: 1rem 4rem 0 2rem;
  padding-right: 5rem;
  `;

  export const Input = styled.input`
  font-size: 20px;
  border: none;
  width: 15rem;
  border-bottom: 1px solid black; 
  padding: 0.5rem 0 0.5rem;
  margin: 0 0 1rem;
  border-radius: 0.8rem;
  `;

  export const Logo = styled.img`
  margin: 1rem 4rem;
  width: 15rem;
  ;
  `;

export const table = styled.table`
  font-size: 20px;
  margin: 2rem 0 2rem 0;
  width: 45rem;
  border-collapse: collapse;
  text-align: center;
`;

export const thead = styled.thead`
  background-color: #f2f2f2;
`;

export const tr = styled.tr``;


export const th = styled.th`
  padding: 2px;
  text-align: center;
`;

export const tbody = styled.tbody``;

export const td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Otd = styled.td`
  border-bottom: 1px solid #ddd;

`;

export const StyledSelect = styled.select`
  border-radius: 10px; 
  padding: 5px; 
  font-size: 16px; 
`;