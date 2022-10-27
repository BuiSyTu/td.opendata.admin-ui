import { Form, Input, Modal, Button, Typography, Spin } from 'antd'
import { memo, useEffect, useState } from 'react'

import { syncHistoryApi } from 'src/app/apis'

const { Text } = Typography

type Props = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    modalId: string,
    setModalId: React.Dispatch<React.SetStateAction<string>>,
}

const ModalCategory: React.FC<Props> = ({
    modalVisible,
    setModalVisible,
    modalId,
    setModalId,
}) => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                var res = await syncHistoryApi.getById(modalId)
                if (res?.data) {
                    const formData = res?.data

                    formData.syncStatus = formData?.dataset?.isSynced ? 'Đã đồng bộ' : 'Đồng bộ lỗi'
                    form.setFieldsValue(res?.data)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }

        if (modalId !== '') {
            fetchData()
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalId])

    const handleCancel = () => {
        form.resetFields()
        setModalId('')
        setModalVisible(false)
    }

    const footer = [
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
                Đóng
            </Text>
        </Button>
    ]


    return (
        <Modal
            width={800}
            visible={modalVisible}
            title={<Text style={{ fontWeight: '500', color: '#fff' }}>Chi tiết đồng bộ</Text>}
            onCancel={handleCancel}
            closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
            footer={footer}
        >
            <Spin spinning={isLoading}>
                <Form {...layout} form={form}>
                    <Form.Item label='Mã tập dữ liệu' name='datasetId'>
                        <Input disabled style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Mã đồng bộ' name='id'>
                        <Input disabled style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Trạng thái đồng bộ' name='syncStatus'>
                        <Input disabled style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Thời gian đồng bộ' name='syncTime'>
                        <Input disabled style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Người đồng bộ' name='lastModifiedBy'>
                        <Input disabled style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                </Form>
            </Spin>

        </Modal>
    )
}

export default memo(ModalCategory)
