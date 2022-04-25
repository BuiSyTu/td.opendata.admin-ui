import * as auth from 'src/app/modules/auth'

import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import datasetFileConfigSlice from './slices/datasetFileConfig'
import datasetSlice from './slices/dataset'
import {globalSlice} from './global/Slice'

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  auth: auth.reducer,
  dataset: datasetSlice,
  datasetFileConfig: datasetFileConfigSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
