import { takeLatest, all, put } from 'redux-saga/effects';
import { Api } from '../../common/api';
import { comicActions } from './comicSlice'

const fetchComics = async () => await Api()
  .then(res => res.json())
  .catch(err => {
    console.error("-----> ", err);
    return err;
  });

function* getComics() {
  const response = yield fetchComics();

  if (response) {
    const data = {
      newComics: response.data.results,
      reviewComics: [],
      approvedComics: []
    }
    yield put(comicActions.setComics(data))
  } else {
    yield put(comicActions.getComicsFail({ codigo: '', message: '' }))
  }
}

function* actionWatcher() {
  yield takeLatest(comicActions.getComics, getComics);
  // yield takeLatest(ComicsTypes.GET_FILMS, getFilms);
}

export default function* comicsSaga() {
  yield all([actionWatcher()]);
}
