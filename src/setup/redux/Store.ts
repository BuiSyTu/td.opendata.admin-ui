import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer, rootSaga } from './RootReducer'

import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { reduxBatch } from '@manaflair/redux-batch'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
]

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store
