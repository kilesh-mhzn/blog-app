import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../Reducers'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['post']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const Persistor = persistStore(store)
export {Persistor}
export default store