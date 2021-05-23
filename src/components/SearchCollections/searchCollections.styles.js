import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const Container = styled.div`
  border-radius: 5px;
  text-align: center;
  position: relative;
  margin: 10px 0px;
`;

export const CollectionLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
  cursor: pointer;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
  width: 223px;
  height: 223px;
  object-fit: cover;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const StatsOverlay = styled.div`
  width: 224px;
  height: 224px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Stats = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
