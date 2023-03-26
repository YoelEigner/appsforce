import { applyMiddleware, createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from './Reducer'




// const persistedReducer = (persistConfig, rootReducer)

export default () => {
  // let store = createStore(persistedReducer)
  const store = createStore(rootReducer, applyMiddleware(thunk));

  // let persistor = persistStore(store)
  return { store }
}