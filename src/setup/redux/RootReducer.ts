import * as auth from '../../app/modules/auth'

import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import datasetFileConfigSlice from './slices/datasetFileConfig'
import datasetSlice from './slices/dataset'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  dataset: datasetSlice,
  datasetFileConfig: datasetFileConfigSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
