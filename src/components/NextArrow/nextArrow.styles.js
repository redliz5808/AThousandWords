import styled from "styled-components";

export const MainContainer = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  z-index: 15;
  font-size: 30px;
  color: ${(props) => props.theme.color};

  &.slick-next::before {
    content: "";
  }

  svg {
    border-radius: 50%;
  }
`;
