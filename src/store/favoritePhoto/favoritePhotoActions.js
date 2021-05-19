import axios from "axios";
import {
  GET_FAVORITE_PHOTOS_PENDING,
  GET_FAVORITE_PHOTOS_SUCCESS,
  GET_FAVORITE_PHOTOS_ERROR,
} from "./favoritePhotoTypes";

export const retrieveFavoritePhotos = () => async (dispatch, getState) => {
  const state = getState();
  const { favoritePhotos } = state.photo;
  try {
    dispatch({
      type: GET_FAVORITE_PHOTOS_PENDING,
    });
    const photos = await Promise.all(
      Object.values(favoritePhotos).map(async (photo) => {
        const { data } = await axios(
          `${process.env.REACT_APP_API_BASE_URL}/photos/${photo}?client_id=${process.env.REACT_APP_API_KEY}`
        );
        return data;
      })
    );
    dispatch({
      type: GET_FAVORITE_PHOTOS_SUCCESS,
      payload: photos,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_PHOTOS_ERROR,
    });
  }
};
