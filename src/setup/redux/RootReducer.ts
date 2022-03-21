import * as auth from '../../app/modules/auth'

import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import datasetSlice from '../../app/pages/categories/dataset/Slice'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  dataset: datasetSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
