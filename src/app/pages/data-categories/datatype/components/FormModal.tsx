import { Form, Input, notification } from 'antd'
import { memo, useEffect, useState } from 'react'

import { CRUDModal } from 'src/app/components'
import { DataType } from 'src/app/models'
import { dataTypeApi } from 'src/app/apis'

const { TextArea } = Input

type Props = {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    modalId: string
    setModalId: React.Dispatch<React.SetStateAction<string>>
    typeModal: string
    setTypeModal: React.Dispatch<React.SetStateAction<string>>
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalCategory: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
    modalId,
    setModalId,
    typeModal,
    setTypeModal,
    setUpdate,
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
            setIsLoading(true)
            const [status, res] = await dataTypeApi.getById(modalId)
            if (status === 200) {
                form.setFieldsValue(res?.data)
            } else {
                notification.error({
                    message: 'Lấy dữ liệu không thành công!',
                    description: 'Có lỗi xảy ra trong quá trình lấy dữ liệu',
                })
            }
            setIsLoading(false)
        }
        setDisable(typeModal === 'view' ? true : false)
        if (modalId !== '') {
            fetchData()
        }
        return () => {}
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

    const postData = async (data: DataType) => {
        setButtonLoading(true)
        const [status] = await dataTypeApi.add(data)
        if (status === 200) {
            notification.success({
                message: 'Thêm mới thành công!',
                duration: 1,
            })
        } else {
            notification.error({
                message: 'Thêm không thành công!',
                description: 'Có lỗi xảy ra khi thêm dữ liệu!',
            })
        }

        setButtonLoading(false)
        setUpdate(true)
        handleCancel()
    }

    const putData = async (data: DataType) => {
        setButtonLoading(true)
        const [status] = await dataTypeApi.update(modalId, data)
        if (status !== 200) {
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
            title='Loại dữ liệu'
            typeModal={typeModal}
        >
            <Form {...layout} form={form}>
                <Form.Item
                    label='Tên'
                    name='name'
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                >
                    <Input
                        disabled={disable}
                        style={{ width: '100%', height: 32, borderRadius: 5 }}
                    />
                </Form.Item>
                <Form.Item
                    label='Mã'
                    name='code'
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                >
                    <Input
                        disabled={disable}
                        style={{ width: '100%', height: 32, borderRadius: 5 }}
                    />
                </Form.Item>
                <Form.Item label='Mô tả' name='description'>
                    <TextArea
                        disabled={disable}
                        rows={3}
                        style={{ width: '100%', borderRadius: 5 }}
                    />
                </Form.Item>
            </Form>
        </CRUDModal>
    )
}

export default memo(ModalCategory)
