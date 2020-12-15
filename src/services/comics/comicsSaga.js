import { takeLatest, all, put } from 'redux-saga/effects';
import * as ComicsTypes from './comicTypes';
import {Api } from '../../common/api';
import Comics from '../../containers/Comics/Comics';

const fetchComics = async () => await Api()
  .then(res => res.json())
  .catch(err => {
    console.error("-----> ", err);
    return err;
  });


function* getComics(action) {
  console.log('Llega')
  const response = yield fetchComics();
  console.log(response);

  if (response) {
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
}

export default function* comicsSaga() {
  yield all([ actionWatcher() ]);
}


