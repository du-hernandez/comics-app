import * as ComicTypes from './comicTypes';

const initialState = {
  comics: [],
  loading: false,
  error: null,

  idBuscado: null,
};

const ComicReducer = (state = initialState, action) => {
  const { payload, error } = action;
  switch (action.type) {
    case ComicTypes.GET_COMICS:
      console.log(action);
      return {...state, loading: true};

    case ComicTypes.GET_COMICS_BY_ID:
      return { ...state, idBuscado: payload.id };
    
    case ComicTypes.GET_COMICS_SUCCESS:
      console.log('Llegó---------: ', action);
      return { ...state, comics: payload.comics, loading: false };
    
    case ComicTypes.GET_COMICS_FAIL:
      return { ...state, error };
    
    default:
      return state;
  }
}

export default ComicReducer;