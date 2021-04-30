import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`

export const Container = styled.div`
  display: inline-block;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
`

export const PreviewPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Preview = styled.img`
  max-width: 100px;
  height: 100%;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`