import React from "react";
import { connect } from "react-redux";
import { FaHeart, FaEye } from "react-icons/fa";
import { Icon } from "components";
import { displayPhoto } from "store/home/homeActions";
import { setFavoriteImage } from "store/photo/photoActions";
import {
  ModalMainContainer,
  ModalSubContainer,
  ModalImageContainer,
  StyledImage,
  StyledDiv,
  ModalStatsContainer,
  StyledLink,
  ModalUserContainer,
  UserImage,
  Username,
  CloseButton,
  UserInfo,
} from "./imageModal.styles";

const ImageModal = (props) => {
  const { displayedImage } = props.home;
  const readyToLoad = props.showModal && displayedImage;

  const handleModalClose = () => {
    props.handleModalClose();
  }
  return (
    <>
      {readyToLoad && (
        <ModalMainContainer>
          <ModalSubContainer>
            <ModalUserContainer>
              <UserInfo>
              <StyledLink to={`/user/${displayedImage.user.id}`}>
                <UserImage
                  src={displayedImage.user.profile_image.small}
                  alt={displayedImage.user.name}
                />
                <Username>{displayedImage.user.name}</Username>
              </StyledLink>
              </UserInfo>
              <CloseButton onClick={handleModalClose}>X</CloseButton>
            </ModalUserContainer>
            <ModalImageContainer>
              <StyledLink to={`/photo/${displayedImage.id}`}>
                <StyledImage
                  src={displayedImage.urls.regular}
                  alt={displayedImage.alt_description}
                />
              </StyledLink>
              <ModalStatsContainer>
                <StyledDiv>
                  {props.photo.favoritePhotos[displayedImage.id] ? (
                    <Icon
                      id={displayedImage.id}
                      handleFavoriteClick={() =>
                        props.setFavoriteImage(displayedImage.id)
                      }
                      icon={<FaHeart />}
                      stats={displayedImage.likes}
                      color="#6958f2"
                    />
                  ) : (
                    <Icon
                      id={displayedImage.id}
                      handleFavoriteClick={() =>
                        props.setFavoriteImage(displayedImage.id)
                      }
                      icon={<FaHeart />}
                      stats={displayedImage.likes}
                      color="#000"
                    />
                  )}
                  <Icon icon={<FaEye />} stats={displayedImage.views} />
                </StyledDiv>
              </ModalStatsContainer>
            </ModalImageContainer>
          </ModalSubContainer>
        </ModalMainContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  home: state.home,
  photo: state.photo,
});

const mapDisptachToProps = {
  displayPhoto,
  setFavoriteImage,
};

export default connect(mapStateToProps, mapDisptachToProps)(ImageModal);
