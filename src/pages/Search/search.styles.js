import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubContainer = styled.div`
  width: calc(932px + 20px);

  @media (max-width: 780px) {
    width: 80vw;
    justify-content: center;
  }
`;

export const StyledDiv = styled.div`
  text-align: center;
  font-size: 24px;
`;

export const StyledSpan = styled.span`
  font-weight: bold;
  font-style: italic;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  width: calc(932px - 22px);
  margin-left: 22px;

  @media (max-width: 780px) {
    justify-content: center;
  }
`;

export const Users = styled.div`
  display: flex;
  flex-grow: 10;
`;

export const TabsSubContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

export const PhotosButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.resultsUnselected};
  cursor: pointer;
  text-align: right;
  font-size: 18px;
  margin-right: 10px;

  ${({ value, theme: { resultsSelected } }) =>
    value === 0 &&
    `
    font-weight: bold;
    color: ${resultsSelected};
  `}
`;

export const UsersButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.resultsUnselected};
  cursor: pointer;
  text-align: left;
  font-size: 18px;
  padding: 0px;

  ${({ value, theme: { resultsSelected } }) =>
    value === 2 &&
    `
    font-weight: bold;
    color: ${resultsSelected};
  `}
`;

export const CollectionsButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.resultsUnselected};
  cursor: pointer;
  text-align: right;
  padding: 0px;
  font-size: 18px;

  ${({ value, theme: { resultsSelected } }) =>
    value === 1 &&
    `
    font-weight: bold;
    color: ${resultsSelected};
  `}
`;
