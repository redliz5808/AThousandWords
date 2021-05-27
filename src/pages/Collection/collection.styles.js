import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubContainer = styled.div`
  width: 932px;
  text-align: center;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

export const CollectionName = styled.div`
  font-weight: bold;
  font-size: 28px;
`;

export const Description = styled.div`
  text-align: center;
  font-style: italic;
  margin: 20px 0px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  text-decoration: none;
  color: ${(props) => props.theme.text};
`;

export const TagLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
`;

export const Tags = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserPhoto = styled.img`
  border-radius: 5px;
`;

export const UserName = styled.span`
  margin-left: 5px;
`;
