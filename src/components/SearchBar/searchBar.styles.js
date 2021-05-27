import styled from "styled-components";

export const StyledInput = styled.input`
  outline: none;
  background-color: white;
  color: #6958f2;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  font-size: 16px;
  padding: 10px;
  margin: 0px 35px;
  width: calc(709px - 187px);

  @media (max-width: 780px) {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 80%;
  }
`;
