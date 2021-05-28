import axios from "axios";
import {
  GET_COLLECTION_PHOTO_PENDING,
  GET_COLLECTION_PHOTO_SUCCESS,
  GET_COLLECTION_PHOTO_ERROR,
  GET_MORE_COLLECTION_PHOTO_SUCCESS,
  GET_COLLECTION_PHOTO_END_DATA,
} from "./collectionPhotoTypes";

export const retrieveCollectionPhotos = (collectionid, page) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_COLLECTION_PHOTO_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/collections/${collectionid}/photos?page=${page}&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
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

export const fetchData = (collectionid, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COLLECTION_PHOTO_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/collections/${collectionid}/photos?page=${page}&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
    );
    if (data.length > 0) {
      dispatch({
        type: GET_MORE_COLLECTION_PHOTO_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_COLLECTION_PHOTO_END_DATA,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_COLLECTION_PHOTO_ERROR,
    });
  }
};
