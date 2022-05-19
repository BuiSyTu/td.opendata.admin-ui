import {Modal, Upload} from 'antd'

import {useState} from 'react'

type Props = {
  URL?: any,
  fileList?: any,
  onChange?: any,
  headers?: any,
  multiple?: any,
  disabled?: any,
}

const ImageUpload: React.FC<Props> = ({
  URL,
  fileList,
  onChange,
  headers,
  multiple,
  disabled
}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }

  const handleCancelImage = () => setPreviewVisible(false)

  return (
    <>
      <Upload
        multiple={multiple}
        name='files'
        accept='image/*'
        action={`${URL}`}
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
        headers={headers}
      >
        {(!!multiple || (fileList && fileList.length < 1)) && !disabled && (
          <div>
            <i className='fas fa-plus'></i>
            <div style={{marginTop: 8}}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal visible={previewVisible} title={''} footer={null} onCancel={handleCancelImage}>
        <img alt='example' style={{width: '100%'}} src={previewImage} />
      </Modal>
    </>
  )
}

export default ImageUpload
