import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  margin-left: 35px;
`;

export const StyledImage = styled.img`
  background-color: #fff;
  border-radius: 5px 0px 0px 5px;
  margin: 5px 0px;
  padding-left: 5px;
`;

export const StyledInput = styled.input`
  outline: none;
  background-color: white;
  color: #474747;
  border: none;
  border-radius: 0px 5px 5px 0px;
  font-size: 16px;
  padding: 10px;
  margin: 5px 35px 5px 0px;
  width: calc(709px - 212px);

  @media (max-width: 780px) {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 80%;
  }
`;
