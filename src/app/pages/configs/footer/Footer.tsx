import { useEffect, useState } from 'react'
import { Button, Form, Input, Typography, notification } from 'antd'

import { footerConfigApi } from 'src/app/apis/footerConfig'
import { PageTitle } from 'src/_metronic/layout/core'

const { Text } = Typography

const FooterConfig = () => {
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        const fetchFooterConfig = async () => {
            const [status, res] = await footerConfigApi.get()

            if (status === 200) {
                form.setFieldsValue(res?.data)
            }
        }

        fetchFooterConfig()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    const handleOk = async () => {
        setButtonLoading(true)
        await form.validateFields()
        const formData = form.getFieldsValue(true)
        const [status] = await footerConfigApi.update(formData)
        if (status !== 200) {
            notification.success({
                message: 'Cập nhật thành công!',
                duration: 1,
            })
        } else {
            notification.error({
                message: 'Cập nhật không thành công!',
                duration: 1,
            })
        }
        setButtonLoading(false)
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>Cấu hình footer</PageTitle>
            <div className='card mb-5 mt-5 mb-xl-12 p-10 mw-1000px'>
                <Form className='mt-5' {...layout} form={form}>
                    <Form.Item label='Tên phần mềm' name='softwareName'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Tên công ty' name='companyName'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Địa chỉ' name='address'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Số điện thoại' name='phoneNumber'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Fax' name='fax'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Hotline' name='hotLine'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>

                    <div className='ant-modal-footer'>
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
                    </div>
                </Form>
            </div>
        </>
    )
}

export default FooterConfig
