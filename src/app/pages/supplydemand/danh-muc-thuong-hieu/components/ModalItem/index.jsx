import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Row, Col, Form, Button, Input, InputNumber, Typography, Select, Modal, Upload, Divider, DatePicker, Spin, notification, Cascader } from 'antd';


import { requestPOST, requestGET, requestPUT, HOST_API, getBase64, HOST_API_Image, HOST_FILE } from '../../../../../../utils/basicAPI'
import { ToSlug } from '../../../../../../utils/slug'
import ImageUpload from '../../../../../../components/ImageUpload'
import { handleImage, convertImage } from '../../../../../../utils/utils';
import SunEditor, { buttonList } from "suneditor-react";
import '../../../../../../assets/suneditor.min.css';
import moment from 'moment'
import Cookies from 'js-cookie';
import './style.less'
const { Text } = Typography;
const { Search, TextArea } = Input;
const { Option } = Select;

const dataType = [
    {
        id: 1,
        name: 'Cần mua'
    },
    {
        id: 2,
        name: 'Cần bán'
    }
]
const optionsEditor = {
    "mode": "classic",
    "rtl": false,
    "katex": "window.katex",
    "height": "250px",
    "imageWidth": "50%",
    "imageHeight": "50%",
    "tabDisable": false,
    "buttonList": [
        [
            "undo",
            "redo",
            "font",
            "fontSize",
            "bold",
            "underline",
            "italic",
            "fontColor",
            "outdent",
            "indent",
            "list",
            "link",
            "image",
        ]
    ],
}



const ModalItem = (props) => {
    const [form] = Form.useForm();
    const accessToken = useSelector((state) => state.auth.accessToken)
    const { modalId, modalVisible, setModalId, setUpdate, update, setModalVisible } = props;
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ''
    const [loading, setLoading] = useState(true)
    const [imageList, setImageList] = useState([])
    const [image, setImage] =  useState('')
    const fetchData = async () => {
        var res = await requestGET(`${HOST_API}/Brand/${modalId}`)
        let _data = res?.data ?? []
        console.log(_data.image)
        if (_data && _data.image) {
            setImageList(handleImage(_data?.image ?? '', HOST_FILE));
        }
        console.log(handleImage(_data?.image ?? '', HOST_FILE))
        form.setFieldsValue(_data);
    }

    useEffect(() => {
        if (modalVisible) {
            if (modalId) {
                fetchData()
            } 
            setLoading(false)
        }
        return () => { }
    }, [modalId, modalVisible])



    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formData = form.getFieldsValue(true);
            if (imageList.length > 0) {
                var images = convertImage(imageList)
                formData.images = images
                formData.image = imageList[0]?.response?.data[0]?.url ?? imageList[0].path
            }
            modalId && modalId != 0 ? patchData(formData) : postData(formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const handleCancel = () => {
        form.resetFields()
        setModalId(null)
        setImageList([])
        setModalVisible(false)
    }

    const postData = async (formData) => {
        formData.type = 2;
        if (!formData.companyId) { formData.userName = user.userName }
        var res = await requestPOST(`${HOST_API}/Brand`, formData);
        if (res) {
            notification.success({
                message: 'Thêm mới thành công!',
                duration: 1,
                placement: 'bottomRight',
            });
            setUpdate(!update);
            handleCancel();
        } else {
            notification.error({
                message: `Lỗi ${res}`,
                description: `${res}`,
            });
        }

    }
    const patchData = async (formData) => {
        var res = await requestPUT(`${HOST_API}/Brand/${modalId}`, formData);
        if (res) {
            notification.success({
                message: 'Cập nhật thành công!',
                duration: 1,
                placement: 'bottomRight',
            });
            setUpdate(!update);
            handleCancel();
        } else {
            notification.error({
                message: `Lỗi ${res}`,
            });
        }

    };

    return (
        <Modal
            visible={modalVisible}
            title="Danh mục thương hiệu"
            width='50%'
            onCancel={handleCancel}
            footer={[
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
                        handleOk();
                    }}
                >
                    <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
                </Button>,
                <Button
                    key="Cancle"
                    type="primary"
                    size="middle"
                    style={{ borderRadius: 5, padding: '5px 10px' }}
                    onClick={() => {
                        handleCancel();
                    }}
                    danger
                >
                    Đóng
                </Button>,
            ]}
        >
            {loading ? (
                <Row style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Spin spinning={loading} />
                </Row>
            ) : (
                <Form
                    layout='vertical'
                    form={form}
                >
                    <Row gutter={20}>
                        <Col xl={16} md={24} xs={24}>
                            <Row justify='start' gutter={10}>
                                <Col xl={24} md={24} xs={24}>
                                    <Form.Item
                                        label="Tên"
                                        name="name"
                                        initialValue=''
                                        rules={[{ required: true, message: 'Không được để trống!' }]}
                                    >
                                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                                    </Form.Item>
                                </Col>
                                <Col xl={24} md={24} xs={24}>
                                    <Form.Item
                                        label="Mã"
                                        name="code"
                                        initialValue=''
                                    >
                                        <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                                    </Form.Item>
                                </Col>
                                <Col xl={24} md={24} xs={24}>
                                    <Form.Item
                                        label="Mô tả"
                                        name="description"
                                        initialValue=''
                                    >
                                        <TextArea rows={4} style={{ width: '100%', borderRadius: 5 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={8} md={24} xs={24}>
                        <Form.Item
                                label="Hình ảnh"
                            >
                                <ImageUpload
                                    disabled={props.typeModal == 2 ? true : false}
                                    multiple={true}
                                    URL={`${HOST_API_Image}`}
                                    fileList={imageList}
                                    onChange={(e) => setImageList(e.fileList)}
                                    headers={{
                                        Authorization: `Bearer ${accessToken}`,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            )}
        </Modal>
    );
}

export default ModalItem;