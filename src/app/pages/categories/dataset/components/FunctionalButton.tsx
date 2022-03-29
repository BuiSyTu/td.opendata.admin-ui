import { Button, notification } from 'antd'
import { ClockCircleOutlined, DatabaseOutlined } from '@ant-design/icons'
import { ColumnMetadata, DataTypeCode, setColumnMetata, setColumnPreview, setDataMetadata, setDataPreview, setDisableTableMetadata, setDisableTablePreview } from '../../../../../setup/redux/slices/dataset'
import { useDispatch, useSelector } from 'react-redux'

import ForwardApi from '../../../../apis/ForwardApi'
import { RootState } from '../../../../../setup'
import { toObject } from '../../../../../utils/common'

const forwardApi = new ForwardApi()

const FunctionalButton = (props: any) => {
  const dispatch = useDispatch()
  const dataTypeCode = useSelector((state: RootState) => state.dataset.dataTypeCode)
  const dataMetadata = useSelector((state: RootState) => state.dataset.dataMetadata)

  const { form, dataExcel } = props

  const handleClickPreview = () => {
    const handlePreview = (dataSource: any) => {
      if (!Array.isArray(dataSource)) {
        notification.info({
          message: 'Dữ liệu không hợp lệ',
          duration: 1,
        })

        return;
      }

      if (dataSource.length === 0) {
        notification.info({
          message: 'Chưa có dữ liệu',
          duration: 1,
        })

        return;
      }

      dispatch(setDisableTablePreview(false))
      dispatch(setDisableTableMetadata(true))

      if (dataSource.length > 5) dataSource = dataSource.slice(0, 5)
      dispatch(setDataPreview(dataSource))

      if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
        const columns = dataMetadata.map((metadata: any) => ({
          key: metadata.Data,
          title: metadata.Title,
          dataIndex: metadata.Data,
        }))

        dispatch(setColumnPreview(columns))
      } else {
        const dataTemp = dataSource[0]
        const columns = Object.keys(dataTemp).map(key => ({
          key,
          title: key,
          dataIndex: key,
        }))
  
        dispatch(setColumnPreview(columns))
      }
    }

    const handleWebApi = async () => {
      const formData = form.getFieldsValue(true)
      const { body, dataKey, headers, method, url } = formData

      const axiosOptions = {
        method,
        url,
        timeout: 15000,
        headers: JSON.stringify(Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}),
        data: JSON.stringify(body),
      }
      
      const res = await forwardApi.forward(axiosOptions);
      let dataSource = res[dataKey]
      handlePreview(dataSource)
    }

    const handleExcel = () => {
      handlePreview(dataExcel)
    }

    switch (dataTypeCode) {
      case DataTypeCode.webapi:
        handleWebApi()
        break;
      case DataTypeCode.excel:
        handleExcel()
        break;
      default:
        break;
    }
  }

  const handleClickMetadata = () => {
    const handleWithDataSource = (dataSource: any) => {
      if (!Array.isArray(dataSource)) {
        notification.info({
          message: 'Dữ liệu không hợp lệ',
          duration: 1,
        })

        return;
      }

      if (dataSource.length === 0) {
        notification.info({
          message: 'Chưa có dữ liệu',
          duration: 1,
        })

        return;
      }

      dispatch(setDisableTablePreview(true))
      dispatch(setDisableTableMetadata(false))

      const dataTemp = dataSource[0]
      const metadata = Object.keys(dataTemp).map(key => ({
        Data: key,
        DataType: typeof dataTemp[key] === 'object' ? 'string' : typeof dataTemp[key],
        Title: key,
        Description: key,
      }))
      dispatch(setDataMetadata(metadata))

      const columnMetadata = [
        new ColumnMetadata('Data', 'Data', 'Data', true),
        new ColumnMetadata('DataType', 'DataType', 'DataType', true),
        new ColumnMetadata('Title', 'Title', 'Title', true),
        new ColumnMetadata('Description', 'Description', 'Description', true),
      ]
      dispatch(setColumnMetata(columnMetadata))
    }

    const handleWithoutDataSource = () => {
      dispatch(setDisableTablePreview(true))
      dispatch(setDisableTableMetadata(false))
      dispatch(setDataMetadata(dataMetadata))

      const columnMetadata = [
        new ColumnMetadata('Data', 'Data', 'Data', true),
        new ColumnMetadata('DataType', 'DataType', 'DataType', true),
        new ColumnMetadata('Title', 'Title', 'Title', true),
        new ColumnMetadata('Description', 'Description', 'Description', true),
      ]
      dispatch(setColumnMetata(columnMetadata))
    }

    const handleWebApi = async () => {
      const formData = form.getFieldsValue(true)

      if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
        handleWithoutDataSource()
        return;
      }

      const { body, dataKey, headers, method, url } = formData

      const axiosOptions = {
        method,
        url,
        timeout: 15000,
        headers: JSON.stringify(Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}),
        data: JSON.stringify(body),
      }
      
      const res = await forwardApi.forward(axiosOptions);
      let dataSource = res[dataKey]
      handleWithDataSource(dataSource)
    }

    const handleExcel = () => {
      if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
        handleWithoutDataSource()
        return;
      }

      handleWithDataSource(dataExcel)
    }

    switch (dataTypeCode) {
      case DataTypeCode.webapi:
        handleWebApi();
        break;
      case DataTypeCode.excel:
        handleExcel();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Button
        icon={<DatabaseOutlined />}
        style={{
          background: '#ffb822',
          color: '#111111',
          minWidth: '130px',
          borderRadius: 5,
          marginRight: '5px',
        }}
        onClick={() => handleClickPreview()}
      >
        Xem trước
      </Button>
      <Button
        icon={<ClockCircleOutlined />}
        style={{
          background: '#34bfa3',
          color: '#ffffff',
          minWidth: '130px',
          borderRadius: 5,
        }}
        onClick={() => handleClickMetadata()}
      >
        Xem metadata
      </Button>
    </>
  )
}
export default FunctionalButton