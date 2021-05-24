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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.body};
  width: 932px;
  border-radius: 5px;
`;

export const ModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: calc(100% - 62px);
  margin: 0px 31px 27px 31px;
  background-color: ${props => props.theme.body};
  border-radius: 5px;
`;

export const ModalStatsContainer = styled.div`
  background-color: ${props => props.theme.body};
  width: 100%;
  margin-top: 20px;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
  max-height: 75vh;
  max-width: 80vw;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${props => props.theme.text};
`;

export const ModalUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 62px);
  margin: 27px 31px 20px 31px;
`;

export const UserInfo = styled.div`
  display: flex;
`;

export const UserImage = styled.img`
  border-radius: 3px;
  margin-right: 18px;
`;

export const Username = styled.div`
  display: inline-block;
`;

export const CloseButton = styled.button`
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 20px;
  border-radius: 3px;
  border: none;
`;
