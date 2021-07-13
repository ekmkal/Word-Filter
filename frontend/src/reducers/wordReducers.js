import {
  WORD_LIST_MY_REQUEST,
  WORD_LIST_MY_SUCCESS,
  WORD_LIST_MY_FAIL,
  WORD_LIST_MY_RESET,
  WORD_UPDATE_REQUEST,
  WORD_UPDATE_SUCCESS,
  WORD_UPDATE_FAIL,
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
  WORD_LIST_RESET,
  FAV_LIST_MY_REQUEST,
  FAV_LIST_MY_SUCCESS,
  FAV_LIST_MY_FAIL,
  FAV_LIST_MY_RESET,
  FAV_UPDATE_REQUEST,
  FAV_UPDATE_SUCCESS,
  FAV_UPDATE_FAIL,
  FAV_LIST_REQUEST,
  FAV_LIST_SUCCESS,
  FAV_LIST_FAIL,
  FAV_LIST_RESET,
} from '../constants/wordConstants';

export const wordListMyReducer = (state = { myWords: [] }, action) => {
  switch (action.type) {
    case WORD_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case WORD_LIST_MY_SUCCESS:
      return {
        loading: false,
        myWords: action.payload,
      };
    case WORD_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case WORD_LIST_MY_RESET:
      return { myWords: [] };
    default:
      return state;
  }
};

export const wordUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_UPDATE_REQUEST:
      return { loading: true };
    case WORD_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case WORD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wordListUserReducer = (state = { userWords: [] }, action) => {
  switch (action.type) {
    case WORD_LIST_REQUEST:
      return {
        loading: true,
      };
    case WORD_LIST_SUCCESS:
      return {
        loading: false,
        userWords: action.payload,
      };
    case WORD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case WORD_LIST_RESET:
      return { userWords: [] };
    default:
      return state;
  }
};

export const favListMyReducer = (state = { myFavs: [] }, action) => {
  switch (action.type) {
    case FAV_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case FAV_LIST_MY_SUCCESS:
      return {
        loading: false,
        myFavs: action.payload,
      };
    case FAV_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FAV_LIST_MY_RESET:
      return { myFavs: [] };
    default:
      return state;
  }
};

export const favUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FAV_UPDATE_REQUEST:
      return { loading: true };
    case FAV_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FAV_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const favListUserReducer = (state = { userFavs: [] }, action) => {
  switch (action.type) {
    case FAV_LIST_REQUEST:
      return {
        loading: true,
      };
    case FAV_LIST_SUCCESS:
      return {
        loading: false,
        userFavs: action.payload,
      };
    case FAV_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FAV_LIST_RESET:
      return { userFavs: [] };
    default:
      return state;
  }
};
