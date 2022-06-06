import { Slice, createSlice } from '@reduxjs/toolkit'

export interface DatasetState {
  tabKey: TabKey,
  modalId: string,
  typeModal: TypeModal,
  modalVisible: boolean,
  disableDataTab: boolean,
  dataTypeCode: DataTypeCode,
  dataPreview: any[],
  columnPreview: any[],
  dataMetadata: any[],
  columnMetadata: any[],
  dataUpload: any[],
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
  file = 'file',
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
  dataPreview: [],
  columnPreview: [],
  dataMetadata: [],
  columnMetadata: [],
  dataUpload: [],
}

export const datasetSlice: Slice = createSlice({
  name: 'dataset',
  initialState: initalState,
  reducers: {
    setTabKey(state: any, action: any) {
      state.tabKey = action.payload ?? TabKey.information
    },
    setModalId(state: any, action: any) {
      state.modalId = action.payload ?? ''
    },
    setTypeModal(state: any, action: any) {
      state.typeModal = action.payload ?? TypeModal.none
    },
    setModalVisible(state: any, action: any) {
      state.modalVisible = action.payload ?? false
    },
    setDisableDataTab(state: any, action: any) {
      state.disableDataTab = action.payload ?? true
    },
    setDataTypeCode(state: any, action: any) {
      state.dataTypeCode = action.payload ?? DataTypeCode.none
    },
    setDataPreview(state: any, action: any) {
      state.dataPreview = action.payload ?? []
    },
    setColumnPreview(state: any, action: any) {
      state.columnPreview = action.payload ?? []
    },
    setDataMetadata(state: any, action: any) {
      state.dataMetadata = action.payload ?? []
    },
    setColumnMetata(state: any, action: any) {
      state.columnMetadata = action.payload ?? []
    },
    setDataUpload(state: any, action: any) {
      state.dataUpload = action.payload ?? []
    }
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
  setColumnPreview,
  setDataPreview,
  setColumnMetata,
  setDataMetadata,
  setDataUpload,
} = actions
export default reducer