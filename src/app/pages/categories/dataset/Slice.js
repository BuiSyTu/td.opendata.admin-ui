import { createSlice } from '@reduxjs/toolkit'

const initalState = {
  tabKey: 'information',
  modalId: '',
  typeModal: '',
  modalVisible: false,
  disableDataTab: true,
  dataTypeCode: '',
  disableTablePreview: true,
  dataPreview: [],
  columnPreview: [],
  disableTableMetadata: true,
  dataMetadata: [],
  columnMetadata: [],
}

export const datasetSlice = createSlice({
  name: 'dataset',
  initialState: initalState,
  reducers: {
    setTabKey(state, action) {
      state.tabKey = action.payload ?? 'information'
    },
    setModalVisible(state, action) {
      state.modalVisible = action.payload ?? false
    },
    setDisableDataTab(state, action) {
      state.disableDataTab = action.payload ?? true
    },
    setDataTypeCode(state, action) {
      state.dataTypeCode = action.payload ?? ''
    },
    handleModal(state, action) {
      const { modalId, typeModal, modalVisible, disableDataTab, tabKey } = action.payload
      state.modalId = modalId ?? ''
      state.typeModal = typeModal ?? ''
      state.modalVisible = modalVisible ?? false
      state.disableDataTab = disableDataTab ?? true
      state.tabKey = tabKey ?? 'information'
    },
    setDisableTablePreview(state, action) {
      state.disableTablePreview = action.payload ?? true
    },
    setDataPreview(state, action) {
      state.dataPreview = action.payload ?? []
    },
    setColumnPreview(state, action) {
      state.columnPreview = action.payload ?? []
    },
    setDisableTableMetadata(state, action) {
      state.disableTableMetadata = action.payload ?? true
    },
    setDataMetadata(state, action) {
      state.dataMetadata = action.payload ?? []
    },
    setColumnMetata(state, action) {
      state.columnMetadata = action.payload ?? []
    }
  }
})

const { actions, reducer } = datasetSlice
export const {
  setTabKey,
  setModalVisible,
  setDisableDataTab,
  setDataTypeCode,
  handleModal,
  setDisableTablePreview,
  setColumnPreview,
  setDataPreview,
  setDisableTableMetadata,
  setColumnMetata,
  setDataMetadata
} = actions
export default reducer