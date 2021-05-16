import axios from "axios";
import {
  COLLECTIONS_FETCH_COLLECTION_DATA_SUCCESS,
  COLLECTIONS_FETCH_COLLECTION_DATA_ERROR,
  COLLECTIONS_FETCH_COLLECTION_DATA_PENDING,
  GET_FAVORITES_DATA,
} from "./collectionTypes";

export const getCollectionData = (collectionid) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COLLECTIONS_FETCH_COLLECTION_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/collections/${collectionid}?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: COLLECTIONS_FETCH_COLLECTION_DATA_SUCCESS,
      payload: data,
    });
    dispatch(setFavoritesData);
  } catch (error) {
    dispatch({
      type: COLLECTIONS_FETCH_COLLECTION_DATA_ERROR,
    });
  }
};

export const setFavoritesData = () => {
  return {
    type: GET_FAVORITES_DATA,
    payload: JSON.parse(localStorage.getItem("favoriteCollections")) || {},
  };
};

export const getFavoritesData = (id) => (dispatch, getState) => {
  const state = getState();
  if (state.collections.favoriteCollections[id]) {
    const favoritesList = state.collections.favoriteCollections;
    delete favoritesList[id];
    dispatch({
      type: GET_FAVORITES_DATA,
      payload: favoritesList,
    });
  } else {
    const newFavoritesList = {
      ...state.collections.favoriteCollections,
      [id]: id,
    };
    dispatch({
      type: GET_FAVORITES_DATA,
      payload: newFavoritesList,
    });
  }
};
