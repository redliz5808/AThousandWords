import React from "react";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { Icon } from "components";
import { displayPhoto, handleModalClose } from "store/home/homeActions";
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

const ImageModal = ({
  home: { showModal, index, data },
  handleModalClose,
  photo,
  setFavoriteImage,
}) => {
  const readyToLoad = showModal && data.length;
  const selectedPhoto = data[index];

  return (
    <>
      {readyToLoad && (
        <ModalMainContainer>
          <ModalSubContainer>
              <ModalUserContainer>
                <UserInfo>
                  <StyledLink to={`/user/${selectedPhoto.user.username}`}>
                    <UserImage
                      src={selectedPhoto.user.profile_image.small}
                      alt={selectedPhoto.user.name}
                    />
                    <Username>{selectedPhoto.user.name}</Username>
                  </StyledLink>
                </UserInfo>
                <CloseButton onClick={handleModalClose}>X</CloseButton>
              </ModalUserContainer>
              <ModalImageContainer>
                <StyledLink to={`/photo/${selectedPhoto.id}`}>
                  <StyledImage
                    src={selectedPhoto.urls.regular}
                    alt={selectedPhoto.alt_description}
                  />
                </StyledLink>
                <ModalStatsContainer>
                  <StyledDiv>
                    {photo.favoritePhotos[selectedPhoto.id] ? (
                      <Icon
                        id={selectedPhoto.id}
                        icon={<FaHeart />}
                        handleClick={() => setFavoriteImage(selectedPhoto.id)}
                        stats={selectedPhoto.likes}
                        color="#6958f2"
                      />
                    ) : (
                      <Icon
                        id={selectedPhoto.id}
                        icon={<FaHeart />}
                        handleClick={() => setFavoriteImage(selectedPhoto.id)}
                        stats={selectedPhoto.likes}
                        color="#000"
                      />
                    )}
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
  handleModalClose,
};

export default connect(mapStateToProps, mapDisptachToProps)(ImageModal);
