import { Button } from 'antd'
import { CodeSandboxOutlined, DatabaseOutlined, CopyOutlined } from '@ant-design/icons'

const FunctionalButton = (props) => {
  const { dataTypeCode } = props

  const handleClickMetaData = () => {
    const handleWebApi = () => {
      console.log('webapi')
    }

    const handleExcel = () => {
      console.log('excel')
    }

    switch(dataTypeCode) {
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

  const handleClickPreview = () => {
    const handleWebApi = () => {
      console.log('webapi')
    }

    const handleExcel = () => {
      console.log('excel')
    }

    switch(dataTypeCode) {
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
      console.log('webapi')
    }

    const handleExcel = () => {
      console.log('excel')
    }

    switch(dataTypeCode) {
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

  return(
    <>
      <Button
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
      </Button>
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