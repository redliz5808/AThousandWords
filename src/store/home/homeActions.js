import axios from "axios";
import {
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_ERROR,
  GET_ALL_PHOTOS_PENDING,
  GET_PARSED_DATA,
  GET_FAVORITES_DATA,
  SET_PAGE_NUMBER,
  SET_FAVORITE_IMAGE,
} from "./homeTypes";

export const getAllPhotos = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PHOTOS_PENDING,
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

export const getParsed = (parsed) => {
  return {
    type: GET_PARSED_DATA,
    payload: parsed,
  };
}

export const getFavorites = () => {
  return {
    type: GET_FAVORITES_DATA,
    payload: JSON.parse(localStorage.getItem("favoritePhotos")) || {},
  }
}

export const setPage = (button) => (dispatch, getState) => {
  const state = getState();
  if (button === "Previous" && state.page === 1) {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: 1,
    });
  } else if (button === "Previous" && state.page > 1) {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: state.page - 1,
    });
  } else if (button === "Next") {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: state.page + 1,
    });
  } else {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: Number(button),
    });
  }
}

export const setFavoriteImage = (id) => (dispatch, getState) => {
  const state = getState();
  if (state.home.favoritePhotos[id]) {
    const favoritesList = JSON.parse(localStorage.getItem("favoritePhotos"));
    delete favoritesList[id];
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: favoritesList,
    });
    localStorage.setItem("favoritePhotos", JSON.stringify(favoritesList));
  } else {
    const favoritesList = JSON.parse(localStorage.getItem("favoritePhotos"));
    const newFavoritesList = { ...favoritesList, [id]: id };
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: newFavoritesList,
    });
    localStorage.setItem("favoritePhotos", JSON.stringify(newFavoritesList));
  }
}