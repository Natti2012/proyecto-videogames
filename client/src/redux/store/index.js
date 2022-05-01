// import {legacy_createStore, applyMiddleware, compose} from 'redux';
//  import {thunk} from 'redux-thunks';
//  import reducer from '../reducer'

//  const composeEnhacers = 
//  (typeof windows !== undefined &&
//     windows.__REDUX_DEVTOOL_EXTENCION_COMPOSE__) || 
//     compose;

//     const store = legacy_createStore(reducer, composeEnhacers(applyMiddleware(thunk)))

//     export default store;
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;