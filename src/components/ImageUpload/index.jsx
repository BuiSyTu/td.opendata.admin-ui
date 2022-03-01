import { useState } from 'react'
import { Modal, Upload } from 'antd'
import { FaPlus } from 'react-icons/fa'
import { getBase64 } from '../../utils/basicAPI'

const ImageUpload = (props) => {
  const { URL, fileList, onChange, headers, multiple, disabled } = props
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }

  const handleCancelImage = () => setPreviewVisible(false)

  return (
    <>
      <Upload
        multiple={multiple}
        name="files"
        accept="image/*"
        action={`${URL}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
        headers={headers}>
        {(!!multiple || (fileList && fileList.length < 1)) && !disabled && (
          <div>
            <FaPlus />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal visible={previewVisible} title={''} footer={null} onCancel={handleCancelImage}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default ImageUpload
