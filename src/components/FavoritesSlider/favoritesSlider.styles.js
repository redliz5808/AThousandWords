import styled from "styled-components";
import Slider from "react-slick";
import { favoritesBlur } from "assets";

export const StyledSlider = styled(Slider)`
  margin-bottom: 40px;
  height: 100%;
  padding: 20px 0px;
  background-image: url(${favoritesBlur});
  background-repeat: repeat;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.img`
  width: 395px;
  height: 395px;
  object-fit: cover;
  border-radius: 50%;
`;

export const StyledH2 = styled.h2`
  margin-left: 20px;
`;
