import { takeLatest, all, put } from 'redux-saga/effects';
import { Api } from '../../common/api';
import {comicActions} from './comicSlice'

const fetchComics = async () => await Api()
  .then(res => res.json())
  .catch(err => {
    console.error("-----> ", err);
    return err;
  });

function* getComics(action) {
  // const { payload } = action;
  const response = yield fetchComics();

  if (response) {
    // yield put({
    //   type: ComicsTypes.GET_FILMS,
    //   payload: {}
    // })
    yield put(comicActions.getComicsSuccess(response.data.results));
  } else {
    yield put(comicActions.getComicsFail( {
        codigo: '',
        message: ''
      }))
  }
}

function* actionWatcher() {
  yield takeLatest(comicActions.getComics, getComics);
  // yield takeLatest(ComicsTypes.GET_FILMS, getFilms);
}

export default function* comicsSaga() {
  yield all([ actionWatcher() ]);
}
