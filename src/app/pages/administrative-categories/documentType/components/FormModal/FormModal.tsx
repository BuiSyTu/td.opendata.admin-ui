import { Form, Input, notification } from 'antd'
import { useEffect, useState } from 'react'

import { CRUDModal } from 'src/app/components'
import { DocumentType } from 'src/app/models'
import { documentTypeApi } from 'src/app/apis'

const { TextArea } = Input

type Props = {
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modalId: string,
  setModalId: React.Dispatch<React.SetStateAction<string>>,
  typeModal: string,
  setTypeModal: React.Dispatch<React.SetStateAction<string>>,
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
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

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        var res = await documentTypeApi.getById(modalId)
        if (res?.data) {
          form.setFieldsValue(res?.data)
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
      typeModal === 'edit' ? putData(formData) : postData(formData)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const postData = async (data: DocumentType) => {
    try {
      setButtonLoading(true)
      var res = await documentTypeApi.add(data)
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

  const putData = async (data: DocumentType) => {
    try {
      setButtonLoading(true)
      var res = await documentTypeApi.update(modalId, data)
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

  return (
    <CRUDModal
      modalVisible={modalVisible}
      buttonLoading={buttonLoading}
      handleOk={handleOk}
      handleCancel={handleCancel}
      isLoading={isLoading}
      title='Từ khóa'
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
        <Form.Item label='Mô tả' name='description'>
          <TextArea disabled={disable} rows={3} style={{ width: '100%', borderRadius: 5 }} />
        </Form.Item>
      </Form>
    </CRUDModal>
  )
}

export default ModalCategory
