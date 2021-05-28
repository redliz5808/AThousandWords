import axios from "axios";
import { getFavoritePhotos } from "./homeReducer";
import {
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_ERROR,
  GET_ALL_PHOTOS_PENDING,
  GET_MORE_PHOTOS_SUCCESS,
  SET_FAVORITE_IMAGE,
  SHOW_MODAL,
  GET_PHOTO_PENDING,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  SET_IMAGE_INDEX,
  GET_MORE_PHOTOS_END_DATA,
} from "./homeTypes";

export const getAllPhotos = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PHOTOS_PENDING,
    });
    dispatch({
      type: SHOW_MODAL,
      payload: false,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/photos?page=${page}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_ALL_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PHOTOS_ERROR,
    });
  }
};

export const fetchData = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PHOTOS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/photos?page=${page}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
    );
    if (data) {
      dispatch({
        type: GET_MORE_PHOTOS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_MORE_PHOTOS_END_DATA,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_PHOTOS_ERROR,
    });
  }
};

export const setFavoriteImage = (id) => (dispatch, getState) => {
  const state = getState();
  const favoritePhotos = getFavoritePhotos(state);
  if (favoritePhotos[id]) {
    delete favoritePhotos[id];
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: favoritePhotos,
    });
  } else {
    const newFavoritesList = { ...favoritePhotos, [id]: id };
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: newFavoritesList,
    });
  }
};

export const handleImageClick = (index) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SHOW_MODAL,
    payload: !state.home.showModal,
  });
  dispatch({
    type: SET_IMAGE_INDEX,
    payload: index,
  });
};

export const displayPhoto = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PHOTO_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/photos/${id}?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PHOTO_ERROR,
    });
  }
};

export const handleModalClose = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SHOW_MODAL,
    payload: !state.home.showModal,
  });
};
