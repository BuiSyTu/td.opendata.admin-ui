import { Button, notification } from 'antd'
import { ClockCircleOutlined, DatabaseOutlined } from '@ant-design/icons'
import { setColumnMetata, setColumnPreview, setDataMetadata, setDataPreview, setDisableTableMetadata, setDisableTablePreview } from '../Slice'
import { useDispatch, useSelector } from 'react-redux'

import ForwardApi from '../../../../apis/ForwardApi'
import { toObject } from '../../../../utils/common'

const forwardApi = new ForwardApi()

const FunctionalButton = (props) => {
  const dispatch = useDispatch()
  const dataTypeCode = useSelector(state => state.dataset.dataTypeCode)

  const { form, dataExcel } = props

  const handleClickPreview = () => {
    const handlePreview = dataSource => {
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

      const dataTemp = dataSource[0]
      const columns = Object.keys(dataTemp).map(key => ({
        key,
        title: key,
        dataIndex: key,
      }))

      dispatch(setColumnPreview(columns))
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
      case 'webapi':
        handleWebApi();
        break;
      case 'excel':
        handleExcel();
        break;
      default:
        break;
    }
  }

  const handleClickMetadata = () => {
    const handleMetadata = (dataSource) => {
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
        DataType: typeof dataTemp[key],
        Title: key,
        Description: key,
        IsDisplay: true,
      }))
      dispatch(setDataMetadata(metadata))
      console.log({metadata})

      const columnMetadata = [
        {key: 'Data', title: 'Data', dataIndex: 'Data'},
        {key: 'DataType', title: 'DataType', dataIndex: 'DataType'},
        {key: 'Title', title: 'Title', dataIndex: 'Title'},
        {key: 'Description', title: 'Description', dataIndex: 'Description'},
        {key: 'IsDisplay', title: 'IsDisplay', dataIndex: 'IsDisplay'},
      ]
      dispatch(setColumnMetata(columnMetadata))
      console.log({columnMetadata})
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
      handleMetadata(dataSource)
    }

    const handleExcel = () => {
      handleMetadata(dataExcel)
    }

    switch (dataTypeCode) {
      case 'webapi':
        handleWebApi();
        break;
      case 'excel':
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
          type: 'primary',
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
          type: 'primary',
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