import { fork, all } from 'redux-saga/effects';
import ComicsSaga from '../services/comics/comicsSaga';

export default function* rootSaga() {
  yield all([
    fork(ComicsSaga)
  ]);
}