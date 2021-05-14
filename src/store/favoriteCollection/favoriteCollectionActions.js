import axios from "axios";
import {
  GET_FAVORITE_COLLECTION_ERROR,
  GET_FAVORITE_COLLECTION_SUCCESS,
  GET_FAVORITE_COLLECTION_PENDING,
} from "./favoriteCollectionTypes";

export const retrieveFavoriteCollections = (favoriteCollections) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_FAVORITE_COLLECTION_PENDING,
    });
    const collections = await Promise.all(
      Object.values(favoriteCollections).map(async (collection) => {
        const { data } = await axios(
          `${process.env.REACT_APP_API_BASE_URL}/collections/${collection}?client_id=${process.env.REACT_APP_API_KEY}`
        );
        return data;
      })
    );
    dispatch({
      type: GET_FAVORITE_COLLECTION_SUCCESS,
      payload: collections,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_COLLECTION_ERROR,
    });
  }
};
