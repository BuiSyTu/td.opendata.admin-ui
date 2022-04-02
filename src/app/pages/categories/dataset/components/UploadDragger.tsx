import { Modal, Upload } from 'antd'

import { InboxOutlined } from '@ant-design/icons'
import { getBase64 } from 'src/utils/common'
import { useState } from 'react'

const { Dragger } = Upload

const UploadDragger = (props: any) => {
  const { onChange, fileList } = props
  const handleDrop = (e: any) => console.log('Dropped files', e.dataTransfer.files)

  const handlePreview = async (file: any) => {
    if (file.url) {
      window.open(file.url, '_blank')
    }
  }

  return (
    <>
      <Dragger
        name='files'
        multiple={false}
        action='https://192.168.2.169:5001/api/v1/attachments'
        onChange={onChange}
        onDrop={handleDrop}
        onPreview={handlePreview}
        fileList={fileList}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Kéo hoặc thả file để tải lên</p>
      </Dragger>
    </>
  )
}

export default UploadDragger