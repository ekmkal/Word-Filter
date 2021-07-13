import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  wordListMyReducer,
  wordUpdateReducer,
  wordListUserReducer,
  favListMyReducer,
  favUpdateReducer,
  favListUserReducer,
} from './reducers/wordReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  wordListMy: wordListMyReducer,
  wordUpdate: wordUpdateReducer,
  wordListUser: wordListUserReducer,
  favListMy: favListMyReducer,
  favUpdate: favUpdateReducer,
  favListUser: favListUserReducer,
});

const middleware = [thunk];

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
