import axios from 'axios';
import {
  WORD_LIST_MY_REQUEST,
  WORD_LIST_MY_SUCCESS,
  WORD_LIST_MY_FAIL,
  WORD_UPDATE_REQUEST,
  WORD_UPDATE_SUCCESS,
  WORD_UPDATE_FAIL,
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
  FAV_LIST_MY_REQUEST,
  FAV_LIST_MY_SUCCESS,
  FAV_LIST_MY_FAIL,
  FAV_UPDATE_REQUEST,
  FAV_UPDATE_SUCCESS,
  FAV_UPDATE_FAIL,
  FAV_LIST_REQUEST,
  FAV_LIST_SUCCESS,
  FAV_LIST_FAIL,
} from '../constants/wordConstants';
import { logout } from './userActions';

export const listMyWords = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORD_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/words/${userInfo._id}/mywords`, config);

    dispatch({
      type: WORD_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: WORD_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listUserWords = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORD_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/${userId}/words`, config);

    dispatch({
      type: WORD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: WORD_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateWords = (wordList) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORD_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/words/${userInfo._id}/mywords`,
      { words: wordList },
      config
    );

    dispatch({
      type: WORD_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: WORD_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: WORD_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const listMyFavs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAV_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/words/${userInfo._id}/myfavs`, config);

    dispatch({
      type: FAV_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: FAV_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listUserFavs = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAV_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/${userId}/favs`, config);

    dispatch({
      type: FAV_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: FAV_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateFavs = (favList) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAV_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/words/${userInfo._id}/myfavs`, favList, config);

    dispatch({
      type: FAV_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: FAV_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: FAV_UPDATE_FAIL,
      payload: message,
    });
  }
};
