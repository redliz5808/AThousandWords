import styled from "styled-components";

export const Container = styled.div`
  margin-left: 10px;
  @media (max-width: 768px) {
    margin-left: 30px;
  }
`;

export const Verified = styled.span`
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 3px;
`;

export const Followers = styled.div``;

export const InstagramUser = styled.a`
  text-decoration: none;
  color: black;
`;
