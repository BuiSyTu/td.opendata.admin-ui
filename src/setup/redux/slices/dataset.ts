import { Slice, createSlice } from '@reduxjs/toolkit'

export interface DatasetState {
  tabKey: TabKey,
  modalId: string,
  typeModal: TypeModal,
  modalVisible: boolean,
  disableDataTab: boolean,
  dataTypeCode: DataTypeCode,
  disableTablePreview: boolean,
  dataPreview: any[],
  columnPreview: any[],
  disableTableMetadata: boolean,
  dataMetadata: any[],
  columnMetadata: any[],
}

export enum TypeModal {
  view = 'view',
  edit = 'edit',
  add = 'add',
  none = '',
}

export enum TabKey {
  information = 'information',
  data = 'data',
}

export enum DataTypeCode {
  excel = 'excel',
  webapi = 'webapi',
  none = '',
}

export enum State {
  pending = 0,
  approved = 1,
  rejected = 2,
}

export class ColumnMetadata {
  key: string
  title: string
  dataIndex: string
  editable: boolean

  constructor(key: string, title: string, dataIndex: string, editable: boolean) {
    this.key = key
    this.title = title
    this.dataIndex = dataIndex
    this.editable = editable
  }
}

const initalState: DatasetState = {
  tabKey: TabKey.information,
  modalId: '',
  typeModal: TypeModal.none,
  modalVisible: false,
  disableDataTab: true,
  dataTypeCode: DataTypeCode.none,
  disableTablePreview: true,
  dataPreview: [],
  columnPreview: [],
  disableTableMetadata: true,
  dataMetadata: [],
  columnMetadata: [],
}

export const datasetSlice:Slice = createSlice({
  name: 'dataset',
  initialState: initalState,
  reducers: {
    setTabKey(state, action) {
      state.tabKey = action.payload ?? TabKey.information
    },
    setModalId(state, action) {
      state.modalId = action.payload ?? ''
    },
    setTypeModal(state, action) {
      state.typeModal = action.payload ?? TypeModal.none
    },
    setModalVisible(state, action) {
      state.modalVisible = action.payload ?? false
    },
    setDisableDataTab(state, action) {
      state.disableDataTab = action.payload ?? true
    },
    setDataTypeCode(state, action) {
      state.dataTypeCode = action.payload ?? DataTypeCode.none
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
    },
  }
})

const { actions, reducer } = datasetSlice
export const {
  setTabKey,
  setModalId,
  setTypeModal,
  setModalVisible,
  setDisableDataTab,
  setDataTypeCode,
  setDisableTablePreview,
  setColumnPreview,
  setDataPreview,
  setDisableTableMetadata,
  setColumnMetata,
  setDataMetadata,
} = actions
export default reducer