import axios from "axios";
import { getFavoriteCollections } from "./collectionReducer";
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
  } catch (error) {
    dispatch({
      type: COLLECTIONS_FETCH_COLLECTION_DATA_ERROR,
      payload: error,
    });
  }
};

export const getFavoritesData = (id) => (dispatch, getState) => {
  const state = getState();
  const favoriteCollections = getFavoriteCollections(state);
  if (favoriteCollections[id]) {
    delete favoriteCollections[id];
    dispatch({
      type: GET_FAVORITES_DATA,
      payload: favoriteCollections,
    });
  } else {
    const newFavoritesList = {
      ...favoriteCollections,
      [id]: id,
    };
    dispatch({
      type: GET_FAVORITES_DATA,
      payload: newFavoritesList,
    });
  }
};
