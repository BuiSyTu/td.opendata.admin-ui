import { CodeSandboxOutlined, CopyOutlined, DatabaseOutlined } from '@ant-design/icons'

import { Button } from 'antd'
import ForwardApi from '../../../../apis/ForwardApi'
import { toObject } from '../../../../utils/common'

const forwardApi = new ForwardApi()

const FunctionalButton = (props) => {
  const { dataTypeCode, form, setColumnPreview, setDataPreview } = props

  const handleClickPreview = () => {
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
      if (dataSource.length > 3) dataSource = dataSource.slice(0, 3)
      console.log(dataSource)
      setDataPreview(dataSource)

      const dataTemp = dataSource[0]
      const columns = Object.keys(dataTemp).map((key) => ({
        key,
        title: key,
        dataIndex: key,
      }))

      setColumnPreview(columns)
    }

    const handleExcel = () => {
      console.log('excel')
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

  const handleClickCopy = () => {
    const handleWebApi = () => {
      const formData = form.getFieldsValue(true)
      console.log(formData)
      console.log('webapi')
    }

    const handleExcel = () => {
      console.log('excel')
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
      {/* <Button
        icon={<CodeSandboxOutlined />}
        style={{
          type: 'primary',
          background: '#5867dd',
          color: '#ffffff',
          minWidth: '130px',
          borderRadius: 5,
          padding: '5px 12px',
        }}
        onClick={() => handleClickMetaData()}
      >
        Metadata
      </Button> */}
      <Button
        icon={<DatabaseOutlined />}
        style={{
          type: 'primary',
          background: '#ffb822',
          color: '#111111',
          minWidth: '130px',
          borderRadius: 5,
          padding: '5px 12px',
        }}
        onClick={() => handleClickPreview()}
      >
        Preview
      </Button>
      <Button
        icon={<CopyOutlined />}
        style={{
          type: 'primary',
          background: '#34bfa3',
          color: '#ffffff',
          minWidth: '130px',
          borderRadius: 5,
          padding: '5px 12px',
        }}
        onClick={() => handleClickCopy()}
      >
        Copy
      </Button>
    </>
  )
}
export default FunctionalButton