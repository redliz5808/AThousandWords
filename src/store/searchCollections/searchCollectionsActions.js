import axios from "axios";
import {
  GET_COLLECTION_DATA_PENDING,
  GET_COLLECTION_DATA_SUCCESS,
  GET_COLLECTION_DATA_ERROR,
  SET_FAVORITE_COLLECTIONS,
} from "./searchCollectionsTypes";

export const getCollectionData = (searchTerm) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COLLECTION_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/search/collections?query=${searchTerm}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_COLLECTION_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COLLECTION_DATA_ERROR,
    });
  }
};

export const setFavoriteCollections = () => {
  return {
    type: SET_FAVORITE_COLLECTIONS,
    payload: JSON.parse(localStorage.getItem("favoriteCollections")) || {},
  };
};

export const addCollectionAsFavorite = (id) => (dispatch, getState) => {
  const state = getState();
  if (state.searchCollections.favoriteCollections[id]) {
    const favoritesList = JSON.parse(
      localStorage.getItem("favoriteCollections")
    );
    delete favoritesList[id];
    dispatch({
      type: SET_FAVORITE_COLLECTIONS,
      payload: favoritesList,
    });
    localStorage.setItem("favoriteCollections", JSON.stringify(favoritesList));
  } else {
    const favoritesList = JSON.parse(
      localStorage.getItem("favoriteCollections")
    );
    const newFavoritesList = { ...favoritesList, [id]: id };
    dispatch({
      type: SET_FAVORITE_COLLECTIONS,
      payload: newFavoritesList,
    });
    localStorage.setItem(
      "favoriteCollections",
      JSON.stringify(newFavoritesList)
    );
  }
};
