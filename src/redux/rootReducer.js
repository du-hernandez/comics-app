import { combineReducers } from 'redux';
import ComicsReducer from '../services/comics/comicsReducer';

export default combineReducers({
  comics: ComicsReducer,
});