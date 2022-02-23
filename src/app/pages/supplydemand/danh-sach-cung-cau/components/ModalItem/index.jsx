import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import { Row, Col,Form, Button, Input, InputNumber, Typography, Select, Modal, Upload, Divider, DatePicker, Spin, notification, Cascader } from 'antd';


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
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const { modalId, modalVisible, setModalId, setUpdate, update, setModalVisible } = props;
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ''
    const [loading, setLoading] = useState(true)

    const [logoList, setLogoList] = useState([])
    const [imageList, setImageList] = useState([])
    const [category, setCategory] = useState([])

    const [dataCategory, setDataCategory] = useState([]);
    const [dataAttribute, setDataAttribute] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataCompany, setDataCompany] = useState(null);

    const [dataProvince, setDataProvince] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [dataCommune, setDataCommune] = useState([]);

    const layout = {
        labelCol: { xl: 7, md: 24 },
        wrapperCol: { xl: 17, md: 24 },
    };
    const layout_1 = {
        labelCol: { xl: 5, md: 24 },
        wrapperCol: { xl: 19, md: 24 },
    };
    const fetchCategory = async () => {
        var res = await requestGET(`${HOST_API}/EcommerceCategory?pageNumber=0&pageSize=3000`)
        if (res && res.succeeded && res.data) {
            var data1 = res.data.filter(i => i.level == 1)
            var data2 = res.data.filter(i => i.level == 2)
            var data3 = res.data.filter(i => i.level == 3)
            var data4 = res.data.filter(i => i.level == 4)
            var total3 = []
            data3 && data3.length > 0 && data3.map(i => {
                var item = { ...i }
                var temp = data4.filter(it => it.parentId == i.id)
                if (temp && temp.length > 0) {
                    item.children = temp ? temp : []
                }
                total3.push(item)
            })
            var total2 = []
            data2 && data2.length > 0 && data2.map(i => {
                var item = { ...i }
                var temp = total3.filter(it => it.parentId == i.id)
                if (temp && temp.length > 0) {
                    item.children = temp ? temp : []
                }
                total2.push(item)
            })

            var total1 = []
            data1 && data1.length > 0 && data1.map(i => {
                var item = { ...i }
                var temp = total2.filter(it => it.parentId == i.id)
                if (temp && temp.length > 0) {
                    item.children = temp ? temp : []
                }
                total1.push(item)
            })
            var total = total1.length > 0 ? total1 : []
            setDataCategory(total)
        }
    }
    const fetchData = async () => {
        var res = await requestGET(`${HOST_API}/Product/${modalId}`)
        let _data = res?.data ?? []
        if (_data.fromDate) {
            _data.fromDate = moment(_data.fromDate)
        }
        if (_data.toDate) {
            _data.toDate = moment(_data.toDate)
        }
        if (_data && _data.images) {
            setImageList(handleImage(_data?.images ?? '', HOST_FILE));
        }
        if (_data.provinceId) {
            handleGetData(2, _data.provinceId, setDataDistrict)
        }
        if (_data.districtId) {
            handleGetData(3, _data.districtId, setDataCommune)
        }
        if (_data.categories && _data.categories.length > 0) {
            var temp = []
            _data.categories.map(it => temp.push(it.id))
            _data.categories = temp
        }
        form.setFieldsValue(_data);
    }
    useEffect(() => {
        if (modalVisible) {
            if (modalId) {
                fetchData()
            } else {
                fetchCurrent()
            }
            fetchCompany()
            fetchCategory()
            fetchProvince()
            fetchBrand()
            setLoading(false)
        }
        return () => { }
    }, [modalId, modalVisible])
    const fetchCurrent = async () => {
        var init = null
        var res = await requestGET(`${HOST_API}/Company/current-company`)
        if (res && res.succeeded && res.data) {
            form.setFieldsValue({ companyId: res?.data?.id ?? '' })
            init = res.data?.place ?? null
        } else {
            var _res = await requestGET(`${HOST_API}/identity/user-infor`)
            if (_res && _res.succeeded && _res.data) {
                init = _res?.data ?? null
                form.setFieldsValue({ userName: init?.userName })
            }
        }
        if (init) {
            if (init?.provinceId) {
                form.setFieldsValue({ provinceId: init?.provinceId })
                handleGetData(2, init?.provinceId, setDataDistrict)
            }
            if (init?.districtId) {
                form.setFieldsValue({ districtId: init?.districtId })
                handleGetData(3, init?.districtId, setDataCommune)
            }
            if (init?.communeId) {
                form.setFieldsValue({ communeId: init?.communeId })
            }
        }

    }
    const fetchCompany = async () => {
        var res = await requestGET(`${HOST_API}/Company?pageNumber=0&pageSize=1000`)
        if (res && res.succeeded && res.data) {
            setDataCompany(res?.data ?? [])
        }
    }
    const fetchBrand = async () => {
        var res = await requestGET(`${HOST_API}/Brand?pageNumber=0&pageSize=1000`);
        if (res && res.succeeded && res.data) {
            setDataBrand(res.data)
        }
    }
    const fetchProvince = async () => {
        var res = await requestGET(`${HOST_API}/Area?level=1&pageNumber=0&pageSize=100`);
        if (res && res.succeeded && res.data) {
            setDataProvince(res.data)
        }
    }

    const handleGetData = async (level, val, handleSet) => {
        var url = `${HOST_API}/Area?level=${level}&parentId=${val}&pageNumber=0&pageSize=100`
        var res = await requestGET(url);
        if (res && res.succeeded && res.data) {
            handleSet(res.data)
        }
    }

    const handleChangeProvince = (val) => {
        if (val) {
            handleGetData(2, val, setDataDistrict)
        }
        form.resetFields(['districtId', 'communeId']);
    };
    const handleChangeDistrict = (val) => {
        if (val) {
            handleGetData(3, val, setDataCommune)
        }
        form.resetFields(['communeId']);
    };

    const handleChangeCompany = (val) => {
        var img = dataCompany.find(i => i.id == val)
        form.setFieldsValue({ image: img?.image ?? '' })
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const formData = form.getFieldsValue(true);
            if (imageList.length > 0) {
                var images = convertImage(imageList)
                formData.images = images
                formData.image = imageList[0]?.response?.data[0]?.url ?? imageList[0].path
            }
            if (formData.categories) {
                var temp = []
                formData.categories.length > 0 && formData.categories.map((it, ind) => {
                    temp.push({
                        id: it,
                        isPrimary: ind == formData.categories.length - 1 ? true : false
                    })
                })
                formData.categories = temp
            }
            modalId && modalId != 0 ? patchData(formData) : postData(formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const handleCancel = () => {
        form.resetFields()
        setModalId(null)
        setLogoList([])
        setImageList([])
        setModalVisible(false)
    }

    const postData = async (formData) => {
        formData.type = 2;
        if (!formData.companyId) { formData.userName = user.userName }
        var res = await requestPOST(`${HOST_API}/Product`, formData);
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
        var res = await requestPUT(`${HOST_API}/Product/${modalId}`, formData);
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

    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <Modal
            visible={modalVisible}
            title="Tin cung cầu cần mua"
            width='80%'
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
                    <Spin spinning={loading}/>
                </Row>
            ) : (
                <Form
                    layout='vertical'
                    form={form}
                >
                    <Row gutter={20}>
                        <Col xl={8} md={24} xs={24}>
                            <Form.Item
                                label="Công ty"
                                name="companyId"
                            >
                                <Select
                                    onChange={(val) => { handleChangeCompany(val) }}
                                    style={{ width: '100%', height: 32, borderRadius: 5 }}
                                >
                                    {dataCompany && dataCompany.map((item, index) => {
                                        return (
                                            <Option key={item.id} value={item.id}>{item.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Tiêu đề"
                                name="name"
                                initialValue=''
                                rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                            </Form.Item>
                            {/* <Form.Item
                                label="Mã SKU"
                                name="sku"
                                initialValue=''
                                rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                            </Form.Item> */}
                            <Form.Item
                                label="Danh mục"
                                name="categories"
                            >
                                <Cascader
                                    fieldNames={{
                                        label: 'name',
                                        value: 'id',
                                        children: 'children'
                                    }}
                                    placeholder='Chọn danh mục sản phẩm'
                                    expandTrigger="hover"
                                    options={dataCategory}
                                    changeOnSelect
                                />
                            </Form.Item>
                            <Form.Item
                                label="Thương hiệu"
                                name="brandId"
                            >
                                <Select
                                    placeholder='Chọn thương hiệu'
                                    style={{ width: '100%', height: 32, borderRadius: 5 }}
                                >
                                    {dataBrand.map((item, index) => {
                                        return (
                                            <Option key={item.id} value={item.id}>{item.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                initialValue=''
                            >
                                <InputNumber
                                    style={{ width: '100%', height: 32, borderRadius: 5 }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={8} md={24} xs={24}>

                            <Form.Item label="Tỉnh/Thành phố" name="provinceId"
                            //rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder={'Chọn tỉnh/thành phố'}
                                    filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                                    onChange={handleChangeProvince}>
                                    {dataProvince?.map((item) => {
                                        return (
                                            <Option key={item.id} value={item.id}>
                                                {item.nameWithType}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Quận/Huyện" name="districtId"
                            //rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder={'Chọn quận/huyện phố'}
                                    filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                                    onChange={handleChangeDistrict}>
                                    {dataDistrict?.map((item) => {
                                        return (
                                            <Option key={item.id} value={item.id}>
                                                {item.nameWithType}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Phường/Xã" name="communeId"
                            //rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder={'Chọn phường/xã phố'}
                                    filterOption={(input, option) => ToSlug(option.children.toLowerCase()).indexOf(ToSlug(input.toLowerCase())) >= 0}
                                >
                                    {dataCommune?.map((item) => {
                                        return (
                                            <Option key={item.id} value={item.id}>
                                                {item.nameWithType}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="placeName"
                                initialValue=''
                            // rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
                            </Form.Item>
                            <Form.Item
                                label="TG đăng tin"
                            >
                                <Row justify='start' gutter={10}>
                                    <Col xl={11} md={24} xs={24}>
                                        <Form.Item
                                            name="fromDate"
                                        >
                                            <DatePicker format={"DD/MM/YYYY"} placeholder="Ngày đăng" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={2} md={24} xs={24}>
                                        <span
                                            style={{ display: 'inline-block', lineHeight: '32px', textAlign: 'center' }}
                                        >
                                            Đến
                                        </span>
                                    </Col>
                                    <Col xl={11} md={24} xs={24}>
                                        <Form.Item
                                            name="toDate"
                                        >
                                            <DatePicker format={"DD/MM/YYYY"} placeholder="Ngày Kết thúc" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
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
                                {/* <Form.Item
                                        label="Giới thiệu"
                                        name="shortDescription"
                                    >
                                        <TextArea rows={3} style={{ width: '100%', height: 'auto', borderRadius: 5 }} />
                                    </Form.Item> */}
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                            >
                                <SunEditor
                                    setContents={form.getFieldValue('description') ? form.getFieldValue('description') : ''}
                                    setOptions={optionsEditor}
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