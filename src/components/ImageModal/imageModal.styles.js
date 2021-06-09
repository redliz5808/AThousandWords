import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";

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
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.main};
  width: 892px;
  height: 813px;
  border-radius: 5px;

  @media (max-width: 1600px) {
    height: calc(813px - 210px);
    width: calc(932px - 200px);
  }
  @media (max-width: 700px) {
    width: calc(892px - 500px);
    height: calc(932px - 500px);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 3px;
  z-index: 2;
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 20px;
  border: none;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 5px;
  text-align: right;
`;

export const CloseButtonImg = styled.img`
  width: 25px;
  height: 25px;
`;

export const ModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  margin: 0px 31px 0px 31px;
  background-color: ${(props) => props.theme.main};
  border-radius: 5px;
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 813px;

  @media (max-width: 1600px) {
    height: calc(813px - 210px);
  }
  @media (max-width: 700px) {
    height: calc(932px - 500px);
  }
`;

export const StyledSlider = styled(Slider)`
  height: 100%;
  width: 932px;
  margin: 0px;
  border-radius: 5px;
  .slick-active {
    width: 100%;
    ${SliderContainer} {
      width: 100%;
    }
  }
  .slick-list {
    height: 100%;
    border-radius: 5px;
  }
  @media (max-width: 1600px) {
    width: calc(932px - 200px);
  }
  @media (max-width: 700px) {
    width: calc(932px - 500px);
  }
`;

export const ModalUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0px 20px 15px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text};
`;

export const UserImage = styled.img`
  border-radius: 3px;
  margin-right: 18px;
`;

export const Username = styled.div`
  display: inline-block;
`;

export const ImageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageBackgroundDiv = styled.div`
  display: flex;
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

export const StyledImageLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};
`;

export const StyledImage = styled.img`
  border-radius: 5px;
  max-width: 852px;
  max-height: 600px;

  @media (max-width: 1600px) {
    max-width: calc(852px - 225px);
    max-height: calc(813px - 225px - 130px);
  }
  @media (max-width: 700px) {
    max-width: calc(852px - 500px);
    max-height: calc(813px - 520px);
  }
`;

export const ModalStatsContainer = styled.div`
  background-color: ${(props) => props.theme.main};
  margin: 5px 10px 10px 15px;
  width: calc(100% - 25px);
  display: flex;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
`;

export const HeartIcon = styled.img`
  display: inline;
`