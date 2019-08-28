import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import Reducers from '../reducers/Reducers';

const middleware = applyMiddleware(logger, thunk, promise);

// const reducers = combineReducers({
//     accounts : AccountReducer,
//     wallets : WalletReducer
// });

const store = createStore(Reducers, middleware);

export default store;