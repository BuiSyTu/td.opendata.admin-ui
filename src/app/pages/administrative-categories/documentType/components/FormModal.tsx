import { Button, Form, Input, Modal, Spin, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'

import { DocumentType } from 'src/app/models'
import { documentTypeApi } from 'src/app/apis'

const { TextArea } = Input
const { Text } = Typography

interface CategoryProps {
  modalVisible: boolean,
  setModalVisible: any,
  modalId: string,
  setModalId: any,
  typeModal: string,
  setTypeModal: any,
  setUpdate: any,
}

const ModalCategory = (props: CategoryProps) => {
  const { modalVisible, setModalVisible, modalId, setModalId, typeModal, setTypeModal, setUpdate } = props
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
    <Modal
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>Nguồn khai thác</Text>}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
      footer={[
        typeModal === 'view' ? (
          <></>
        ) : (
          <Button
            key='Ok'
            type='primary'
            htmlType='submit'
            size='middle'
            style={{
              borderRadius: 5,
              padding: '5px 12px',
              backgroundColor: '#34bfa3',
              borderColor: '#34bfa3',
            }}
            icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
            onClick={() => {
              handleOk()
            }}
            loading={buttonLoading}
          >
            <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
          </Button>
        ),
        <Button
          key='Cancel'
          type='primary'
          size='middle'
          style={{
            borderRadius: 5,
            padding: '5px 12px',
            backgroundColor: '#FAFAFA',
            borderColor: '#BDBDBD',
          }}
          icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
          onClick={() => {
            handleCancel()
          }}
        >
          <Text style={{ color: '#757575', paddingLeft: 5 }}>
            {' '}
            {typeModal === 'view' ? 'Đóng' : 'Hủy'}
          </Text>
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
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
      </Spin>
    </Modal>
  )
}

export default ModalCategory
