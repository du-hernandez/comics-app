import { createStore, applyMiddleware, compose } from 'redux';
import reduxSaga from 'redux-saga';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = reduxSaga();

const middleware = [ sagaMiddleware ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);
