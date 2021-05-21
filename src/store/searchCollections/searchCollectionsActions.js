import axios from "axios";
import { getFavoriteList } from "./searchCollectionsReducer";
import {
  GET_COLLECTION_DATA_PENDING,
  GET_COLLECTION_DATA_SUCCESS,
  GET_COLLECTION_DATA_ERROR,
  SET_FAVORITE_COLLECTIONS,
  GET_MORE_COLLECTION_DATA_SUCCESS,
  SET_PAGE_NUMBER,
} from "./searchCollectionsTypes";

export const getCollectionData = (searchTerm, page) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_COLLECTION_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/search/collections?query=${searchTerm}&page=${page}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    const results = data.results;
    dispatch({
      type: GET_COLLECTION_DATA_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: GET_COLLECTION_DATA_ERROR,
    });
  }
};

export const addCollectionAsFavorite = (id) => (dispatch, getState) => {
  const state = getState();
  const favoriteCollections = getFavoriteList(state);
  if (favoriteCollections[id]) {
    delete favoriteCollections[id];
    dispatch({
      type: SET_FAVORITE_COLLECTIONS,
      payload: favoriteCollections,
    });
  } else {
    const newFavoritesList = {
      ...favoriteCollections,
      [id]: id,
    };
    dispatch({
      type: SET_FAVORITE_COLLECTIONS,
      payload: newFavoritesList,
    });
  }
};

export const fetchData = (searchTerm, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COLLECTION_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/search/collections?query=${searchTerm}&page=${page}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    const results = data.results;
    dispatch({
      type: GET_MORE_COLLECTION_DATA_SUCCESS,
      payload: results,
    });
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: page,
    });
  } catch (error) {
    dispatch({
      type: GET_COLLECTION_DATA_ERROR,
      payload: error,
    });
  }
};
