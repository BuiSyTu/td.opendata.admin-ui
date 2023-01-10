import { Form, Input, notification } from 'antd'
import { memo, useEffect, useState } from 'react'

import { CRUDModal } from 'src/app/components'
import { Category } from 'src/app/models'
import { trinhDoHocVanApi } from 'src/app/apis'

const { TextArea } = Input

type Props = {
    modalVisible: boolean
    modalId: string
    typeModal: string
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setModalId: React.Dispatch<React.SetStateAction<string>>
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
            const [status, res] = await trinhDoHocVanApi.getById(modalId)
            if (status === 200) {
                form.setFieldsValue(res?.data)
            } else {
                notification.error({
                    message: 'Thất bại!',
                    description: 'Xảy ra lỗi trong quá trình thực hiện!',
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

            handleImageUrl(formData)
            console.log(formData)

            typeModal === 'edit' ? putData(formData) : postData(formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
        }
    }

    const postData = async (data: Category) => {
        setButtonLoading(true)
        const [status] = await trinhDoHocVanApi.add(data)
        if (status === 200) {
            notification.success({
                message: 'Cập nhập thành công!',
                duration: 1,
            })
        } else {
            notification.error({
                message: 'Thất bại!',
                description: 'Vui lòng kiểm tra lại!',
            })
        }
        setButtonLoading(false)
        setUpdate(true)
        handleCancel()
    }

    const putData = async (data: Category) => {
        setButtonLoading(true)
        const [status] = await trinhDoHocVanApi.update(modalId, data)
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

    const handleImageUrl = (data: Category) => {
        const imageUrlResponseData = data?.imageUrlResponse?.file?.response?.data

        if (imageUrlResponseData && Array.isArray(imageUrlResponseData)) {
            data.imageUrl = imageUrlResponseData[0]?.url ?? ''
        }
    }

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
