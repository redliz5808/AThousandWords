import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 932px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 932px;
`;

export const UserName = styled.div`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const Bio = styled.div`
  margin: 10px 0px;
  text-align: center;
  width: 500px;

  @media (max-width: 780px) {
    width: 80vw;
  }
`;

export const InstagramUser = styled.a`
  text-decoration: none;
  color: #8c8c8c;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
`;

export const StyledDiv = styled.div`
  text-align: center;
  margin: 32px 37px 17px 37px;
`;

export const StyledNumbers = styled.div`
  font-weight: bold;
`;

export const Verified = styled.span`
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 3px;
`;
