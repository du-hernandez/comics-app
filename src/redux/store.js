import { createStore, applyMiddleware, compose } from 'redux';
import reduxSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = reduxSaga();

const middleware = [
  ...getDefaultMiddleware({ thunk: false })
    .concat(sagaMiddleware)
    .concat(logger)
]

export const store = configureStore({
  reducer: rootReducer,
  middleware
});

sagaMiddleware.run(rootSaga);
