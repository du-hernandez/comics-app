import { takeLatest, all, put } from 'redux-saga/effects';
import * as ComicsTypes from './comicTypes';
import {Api } from '../../common/api';

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
    yield put({
      type: ComicsTypes.GET_COMICS_SUCCESS,
      payload: {comics: response.data.results},
    });
  } else {
    yield put({
      type: ComicsTypes.GET_COMICS_FAIL,
      error: {
        codigo: '',
        message: ''
      }
    });
  }
}

function* actionWatcher() {
  yield takeLatest(ComicsTypes.GET_COMICS, getComics);
  // yield takeLatest(ComicsTypes.GET_FILMS, getFilms);
}

export default function* comicsSaga() {
  yield all([ actionWatcher() ]);
}
