import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubContainer = styled.div`
  width: 753px;
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
  width: 100%;
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
  color: ${(props) => props.theme.results_unselected};
  cursor: pointer;
  text-align: right;
  font-size: 18px;

  ${({ value }) =>
    value === 0 &&
    `
    font-weight: bold;
    color: ${(props) => props.theme.results_selected};
  `}
`;

export const UsersButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.results_unselected};
  cursor: pointer;
  text-align: right;
  font-size: 18px;

  ${({ value }) =>
    value === 2 &&
    `
    font-weight: bold;
    color: ${(props) => props.theme.results_selected};
  `}
`;

export const CollectionsButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.results_unselected};
  cursor: pointer;
  text-align: right;
  font-size: 18px;

  ${({ value }) =>
    value === 1 &&
    `
    font-weight: bold;
    color: ${(props) => props.theme.results_selected};
  `}
`;
