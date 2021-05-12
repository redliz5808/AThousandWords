import axios from "axios";
import {
  GET_COLLECTION_PHOTO_PENDING,
  GET_COLLECTION_PHOTO_SUCCESS,
  GET_COLLECTION_PHOTO_ERROR,
} from "./collectionPhotoTypes";

export const retrieveCollectionPhotos = (collectionid) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_COLLECTION_PHOTO_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/collections/${collectionid}/photos?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_COLLECTION_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COLLECTION_PHOTO_ERROR,
    });
  }
};
