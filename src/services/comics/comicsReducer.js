import * as ComicTypes from './comicTypes';

const initialState = {
  comics: [],
  loading: false,
  error: null,
  idBuscado: null,
  comicSelected: null,
  newComics: [],
};

const ComicReducer = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case ComicTypes.GET_COMICS:
      console.log(action);
      return {...state, loading: true};

    case ComicTypes.GET_COMICS_BY_ID:
      return { ...state, idBuscado: payload.id };
    
    case ComicTypes.GET_COMICS_SUCCESS:
      return { ...state, comics: payload.comics, loading: false };
    
    case ComicTypes.GET_COMICS_FAIL:
      return { ...state, error, loading: false };
    
    case ComicTypes.SELECT_COMIC:
      return { ...state, comicSelected: payload.comic }
    
    case ComicTypes.ADD_COMIC:
      return {...state, newComics: [...state.newComics, payload.comic]}
    
    default:
      return state;
  }
}

export default ComicReducer;