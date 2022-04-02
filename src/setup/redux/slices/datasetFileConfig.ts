import { Slice, createSlice } from '@reduxjs/toolkit'

export interface DatasetState {
  fileType?: string,
  fileName?: string,
  fileUrl?: string,
}


const initalState: DatasetState = {
  fileType: '',
  fileName: '',
  fileUrl: '',
}

export const datasetFileConfigSlice:Slice = createSlice({
  name: 'datasetFileConfig',
  initialState: initalState,
  reducers: {
    setFileType(state, action) {
      state.fileType = action.payload ?? ''
    },
    setFileName(state, action) {
      state.fileName = action.payload ?? ''
    },
    setFileUrl(state, action) {
      state.fileUrl = action.payload ?? ''
    },
  }
})

const { actions, reducer } = datasetFileConfigSlice
export const {
  setFileType,
  setFileName,
  setFileUrl,
} = actions
export default reducer