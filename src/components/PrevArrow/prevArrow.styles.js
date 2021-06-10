import styled from "styled-components";

export const MainContainer = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 10px;
  z-index: 15;
  font-size: 30px;
  color: ${(props) => props.theme.color};

  &.slick-prev::before {
    content: "";
  }

  svg {
    border-radius: 50%;
  }
`;
