import styled from "styled-components";

export const StyledInput = styled.input`
  outline: none;
  border: 1px solid #6958f2;
  border-radius: 5px;
  color: #6958f2;
  font-size: 16px;
  padding: 7px;
  width: 300px;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;
