import { Form, Input, Upload, message, notification } from 'antd'
import { useEffect, useState } from 'react'

import { CRUDModal } from 'src/app/components'
import { Category } from 'src/app/models'
import { InboxOutlined } from '@ant-design/icons';
import { categoryApi } from 'src/app/apis'
import { v4 as uuidv4 } from 'uuid'

const { TextArea } = Input
const { Dragger } = Upload

type Props = {
  modalVisible: boolean,
  setModalVisible: any,
  modalId: string,
  setModalId: any,
  typeModal: string,
  setTypeModal: any,
  setUpdate: any,
}

const ModalCategory: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  modalId,
  setModalId,
  typeModal,
  setTypeModal,
  setUpdate
}) => {
  const [form] = Form.useForm()
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        var res = await categoryApi.getById(modalId)
        if (res?.data) {
          const category = res?.data
          form.setFieldsValue(category)

          setFileList([{
            url: `${process.env.REACT_APP_FILE_URL}/${res?.data?.imageUrl}`,
            name: res?.data?.name,
            uid: uuidv4()
          }])
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    setDisable(typeModal === 'view' ? true : false)
    if (modalId !== '') {
      fetchData()
    }
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalId])

  const handleCancel = () => {
    form.resetFields()
    setTypeModal('')
    setModalId('')
    setModalVisible(false)
  }

  const handleOk = async () => {
    try {
      await form.validateFields()
      const formData = form.getFieldsValue(true)

      handleImageUrl(formData)
      console.log(formData)

      typeModal === 'edit' ? putData(formData) : postData(formData)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const postData = async (data: Category) => {
    try {
      setButtonLoading(true)
      var res = await categoryApi.add(data)
      if (res) {
        notification.success({
          message: 'Thêm mới thành công!',
          duration: 1,
        })
      } else {
        notification.error({
          message: `Lỗi ${res}`,
          description: `${res}`,
        })
      }
      setButtonLoading(false)
    } catch (error) {
      setButtonLoading(false)
    }
    setUpdate(true)
    handleCancel()
  }

  const putData = async (data: Category) => {
    try {
      setButtonLoading(true)
      var res = await categoryApi.update(modalId, data)
      if (res) {
        notification.success({
          message: 'Cập nhập thành công!',
          duration: 1,
        })
      } else {
        notification.error({
          message: 'Thất bại!',
          description: 'Xảy ra lỗi trong quá trình thực hiện!',
        })
      }
      setButtonLoading(false)
    } catch (error) {
      setButtonLoading(false)
    }
    setUpdate(true)
    handleCancel()
  }

  const handleImageUrl = (data: Category) => {
    debugger
    const imageUrlResponseData = data?.imageUrlResponse?.file?.response?.data

    if (imageUrlResponseData && Array.isArray(imageUrlResponseData)) {
      data.imageUrl = imageUrlResponseData[0]?.url ?? ''
    }
  }

  const handleChangeDragger = (info: any) => {
    setFileList(info.fileList)
    message.success(`${info.file.name} file uploaded successfully.`)
  }

  const handlePreview = async (file: any) => {
    if (file.url) {
      window.open(file.url, '_blank')
    }
  }

  const handleDrop = (e: any) => console.log('Dropped files', e.dataTransfer.files)

  return (
    <CRUDModal
      modalVisible={modalVisible}
      buttonLoading={buttonLoading}
      handleOk={handleOk}
      handleCancel={handleCancel}
      isLoading={isLoading}
      title='Lĩnh vực'
      typeModal={typeModal}
    >
      <Form {...layout} form={form}>
        <Form.Item
          label='Tên'
          name='name'
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
        </Form.Item>
        <Form.Item
          label='Mã'
          name='code'
        >
          <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
        </Form.Item>
        <Form.Item
          label='Icon'
          name='icon'
        >
          <Input disabled={disable} style={{ width: '100%', height: 32, borderRadius: 5 }} />
        </Form.Item>
        <Form.Item label='File đính kèm' name='imageUrlResponse'>
          <Dragger
            name='files'
            maxCount={1}
            multiple={false}
            action={`${process.env.REACT_APP_FILE_URL}/api/v1/attachments`}
            headers={{
              TDAuthorization: process.env?.REACT_APP_DEFAULT_TDAUTHORIZATION ?? '',
            }}
            onChange={handleChangeDragger}
            onDrop={handleDrop}
            onPreview={handlePreview}
            fileList={fileList}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Kéo hoặc thả file để tải lên</p>
          </Dragger>
        </Form.Item>
        <Form.Item label='Mô tả' name='description'>
          <TextArea disabled={disable} rows={3} style={{ width: '100%', borderRadius: 5 }} />
        </Form.Item>
      </Form>
    </CRUDModal >
  )
}

export default ModalCategory
