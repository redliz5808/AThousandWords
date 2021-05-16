import styled from "styled-components";
import { Link } from "react-router-dom";

export const ModalMainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalSubContainer = styled.div`
  background-color: white;
  border-radius: 5px;
`;

export const ModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;

export const ModalStatsContainer = styled.div`
  background-color: white;
  width: 100%;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
  max-height: 75vh;
  max-width: 80vw;
`;

export const StyledDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #6958f2;
`;

export const ModalUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const UserInfo = styled.div`
  display: flex;
`;

export const UserImage = styled.img`
  border-radius: 3px;
  margin: 5px;
`;

export const Username = styled.div`
  display: inline-block;
`;

export const CloseButton = styled.button`
  background-color: white;
  color: #6958f2;
  cursor: pointer;
  font-size: 20px;
  border-radius: 3px;
  border: none;
  margin: 5px;
`;
