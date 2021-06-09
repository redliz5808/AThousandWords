import { useLocation } from "react-router-dom";
import { MainContainer, SubContainer, StyledLink } from "./notFound.styles";

const NotFound = (props) => {
  const location = useLocation();
  return (
    <MainContainer>
      <SubContainer>
        {props.errorMessage ? (
          <>
            <h1>404: Not Found</h1>
            <p>{props.errorMessage.message}</p>
            <StyledLink href="/">
              Click here to be taken to the home page.
            </StyledLink>
          </>
        ) : (
          <>
            <h1>404: Not Found</h1>
            <p>{location.pathname} is not a valid URL.</p>
            <StyledLink href="/">
              Click here to be taken to the home page.
            </StyledLink>
          </>
        )}
      </SubContainer>
    </MainContainer>
  );
};

export default NotFound;
