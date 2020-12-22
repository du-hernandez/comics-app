import { takeLatest, all, put } from 'redux-saga/effects';

import { comicActions } from './comicSlice'
import Api from '../../common/api';
import { message } from 'antd';

function* getComics() {
  const response = yield Api.get('/comic/all')

  console.log("RES", response)
  if (response.ok) {
    const data = {
      newComics: response.payload,
      reviewComics: [],
      approvedComics: []
    }
    yield put(comicActions.setComics(data))
  } else {
    yield put(comicActions.getComicsFail({ codigo: '', message: '' }))
  }
}
function* addComic({ payload }) {
  const { values, hide } = payload
  const response = yield Api.post('/comic', values)

  if (response.ok) {
    yield put(comicActions.getComics())
    hide()
    message.success("Comic registrado correctamente! ✅")
  } else {
    yield put(comicActions.getComicsFail({ codigo: '', message: response.payload.message }))
    message.error("Comic no registrado correctamente! 💔 " + response.payload.message)
  }
}

function* actionWatcher() {
  yield takeLatest(comicActions.getComics, getComics)
  yield takeLatest(comicActions.addComic, addComic)
}

export default function* comicsSaga() {
  yield all([actionWatcher()]);
}
