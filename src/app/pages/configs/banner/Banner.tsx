import { useEffect, useState } from 'react'
import { Button, Form, Input, Typography, notification } from 'antd'

// import { BannerConfig } from 'src/app/models'
import { PageTitle } from 'src/_metronic/layout/core'
import { bannerConfigApi } from 'src/app/apis'

const { Text } = Typography

const BannerConfigPage = () => {
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        const fetchBannerConfig = async () => {
            const [status, res] = await bannerConfigApi.get()

            if (status === 200) {
                form.setFieldsValue(res?.data)
            }
        }

        fetchBannerConfig()
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

        const [status] = await bannerConfigApi.update(formData)
        if (status === 200) {
            notification.success({
                message: 'Cập nhật thành công!',
                duration: 1,
            })
        } else {
            notification.error({
                message: `Không thành công`,
                description: `Đã có lỗi xảy ra trong quá trình thực hiện!`,
            })
        }
        setButtonLoading(false)
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>Cấu hình footer</PageTitle>
            <div className='card mb-5 mt-5 mb-xl-12 p-10 mw-1000px'>
                <Form className='mt-5' {...layout} form={form}>
                    <Form.Item label='Dòng 1' name='line1'>
                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                    </Form.Item>
                    <Form.Item label='Dòng 2' name='line2'>
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

export default BannerConfigPage
