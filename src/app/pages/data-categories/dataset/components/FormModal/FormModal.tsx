import styles from './FormModal.module.scss'
import * as XLSX from 'xlsx'

import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Spin,
    Table,
    Tabs,
    Typography,
    Upload,
    message,
    notification,
} from 'antd'
import {
    ClockCircleOutlined,
    DatabaseOutlined,
    InboxOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames/bind'

import { RootState } from 'src/setup'
import { toObject } from 'src/utils/common'
import {
    Category,
    Dataset,
    DataType,
    DatasetAPIConfig,
    DatasetFileConfig,
    License,
    Organization,
    ProviderType,
} from 'src/app/models'
import {
    categoryApi,
    dataTypeApi,
    datasetApi,
    forwardApi,
    licenseApi,
    organizationApi,
    providerTypeApi,
} from 'src/app/apis'
import {
    ColumnMetadata,
    DataTypeCode,
    TabKey,
    TypeModal,
    setColumnMetata,
    setColumnPreview,
    setDataMetadata,
    setDataPreview,
    setDataTypeCode,
    setDataUpload,
    setDisableDataTab,
    setTabKey,
} from 'src/setup/redux/slices/dataset'
import { setFileName, setFileType, setFileUrl } from 'src/setup/redux/slices/datasetFileConfig'
import MetadataTable from '../MetadataTable'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { Dragger } = Upload
const cx = classNames.bind(styles)

type Props = {
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    modalId: string
    setModalId: React.Dispatch<React.SetStateAction<string>>
    typeModal: TypeModal
    setTypeModal: React.Dispatch<React.SetStateAction<TypeModal>>
}

const ModalCategory: React.FC<Props> = ({
    setUpdate,
    modalVisible,
    setModalVisible,
    modalId,
    setModalId,
    typeModal,
    setTypeModal,
}) => {
    const dispatch = useDispatch()
    const userInfo = useSelector((state: RootState) => state.global.userInfo)

    const tabKey = useSelector((state: RootState) => state.dataset.tabKey)
    const disableDataTab = useSelector((state: RootState) => state.dataset.disableDataTab)
    const dataTypeCode = useSelector((state: RootState) => state.dataset.dataTypeCode)
    const dataPreview = useSelector((state: RootState) => state.dataset.dataPreview)
    const columnPreview = useSelector((state: RootState) => state.dataset.columnPreview)
    const dataMetadata = useSelector((state: RootState) => state.dataset.dataMetadata)
    const dataUpload = useSelector((state: RootState) => state.dataset.dataUpload)

    const fileName = useSelector((state: RootState) => state.datasetFileConfig.fileName)
    const fileType = useSelector((state: RootState) => state.datasetFileConfig.fileType)
    const fileUrl = useSelector((state: RootState) => state.datasetFileConfig.fileUrl)

    const [form] = Form.useForm()
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const [categories, setCategories] = useState<Category[]>([])
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [providerTypes, setProviderTypes] = useState<ProviderType[]>([])
    const [dataTypes, setDataTypes] = useState<DataType[]>([])
    const [licenses, setLicenses] = useState<License[]>([])
    const [fileList, setFileList] = useState<any[]>([])
    const [disableTablePreview, setDisableTablePreview] = useState<boolean>(true)
    const [disableTableMetadata, setDisableTableMetadata] = useState<boolean>(true)

    const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

    const layout = {
        labelCol: { span: 22 },
        wrapperCol: { span: 22 },
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const [status, res] = await categoryApi.getAll()
            if (status === 200 && res?.data) {
                setCategories(res?.data)
            }
        }

        const fetchOrganizations = async () => {
            const [status, res] = await organizationApi.getAll()
            if (status === 200) {
                setOrganizations(res?.data)
            }
        }

        const fetchProviderTypes = async () => {
            const [status, res] = await providerTypeApi.getAll()
            if (status === 200) {
                setProviderTypes(res?.data)
            }
        }

        const fetchDataTypes = async () => {
            const [status, res] = await dataTypeApi.getAll()
            if (status === 200) {
                setDataTypes(res?.data)
            }
        }

        const fetchLicenses = async () => {
            const [status, res] = await licenseApi.getAll()
            if (status === 200) {
                setLicenses(res?.data)
            }
        }

        fetchCategories()
        fetchOrganizations()
        fetchProviderTypes()
        fetchDataTypes()
        fetchLicenses()
        return () => {}
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const [status, res] = await datasetApi.getById(modalId)
            if (status !== 200) {
                setIsLoading(false)
                return
            }

            if (res?.data?.datasetAPIConfig) {
                res.data = {
                    ...res.data,
                    ...res.data.datasetAPIConfig,
                }

                try {
                    const headersObj = JSON.parse(res.data.datasetAPIConfig?.headers)
                    res.data.headers = Object.keys(headersObj).map((key) => ({
                        key: key,
                        value: headersObj[key],
                    }))
                } catch (err) {
                    console.error(err)
                }
            }

            if (res?.data?.datasetFileConfig) {
                res.data = {
                    ...res.data,
                    ...res.data.datasetFileConfig,
                }

                setFileList([
                    {
                        url: `${process.env.REACT_APP_API_URL}/${res.data.datasetFileConfig.fileUrl}`,
                        name: res.data.datasetFileConfig.fileName,
                        uid: uuidv4(),
                    },
                ])
            }

            if (res?.data) {
                form.setFieldsValue(res?.data)

                dispatch(setDataTypeCode(res?.data?.dataType?.code?.toLowerCase()))
                dispatch(setDataMetadata(JSON.parse(res?.data?.metadata)))
            }
            setIsLoading(false)
        }

        setDisable(typeModal === TypeModal.view ? true : false)

        if (modalId !== '') {
            fetchData()
        }
        return () => {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalId])

    const handleCancel = () => {
        form.resetFields()

        setDisableTablePreview(true)
        setDisableTableMetadata(true)
        setModalVisible(false)
        setModalId('')
        setTypeModal(TypeModal.none)

        dispatch(setDisableDataTab(true))
        dispatch(setTabKey(TabKey.information))
        dispatch(setColumnMetata([]))
        dispatch(setDataMetadata([]))
        dispatch(setColumnPreview([]))
        dispatch(setDataPreview([]))
        dispatch(setDataUpload([]))
    }

    const handleOk = async () => {
        try {
            await form.validateFields()
            const formData = form.getFieldsValue(true)

            const headerObject = Array.isArray(formData.headers)
                ? toObject(formData.headers, 'key', 'value')
                : {}

            if (dataTypeCode === DataTypeCode.file) {
                const datasetFileConfig: DatasetFileConfig = {
                    fileType,
                    fileName,
                    fileUrl,
                    sheetName: formData?.sheetName ?? '',
                }

                formData.datasetFileConfig = datasetFileConfig
            }

            if (dataTypeCode === DataTypeCode.webapi) {
                const datasetAPIConfig: DatasetAPIConfig = {
                    method: formData?.method ?? '',
                    url: formData?.url ?? '',
                    headers:
                        Object.keys(headerObject).length > 0 ? JSON.stringify(headerObject) : '',
                    dataKey: formData?.dataKey ?? '',
                    data: formData?.data ?? '',
                }

                formData.datasetAPIConfig = datasetAPIConfig
            }

            formData.metadata = JSON.stringify(dataMetadata)

            if (userInfo?.Info?.UserOffice) {
                const { GroupCode: officeCode, GroupName: officeName } = userInfo?.Info?.UserOffice
                formData.officeCode = officeCode
                formData.officeName = officeName
            }

            typeModal === TypeModal.edit ? putData(formData) : postData(formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
        }
    }

    const handleChangeDataType = (value: string, event: any) => {
        setDisableTablePreview(true)
        setDisableTableMetadata(true)

        dispatch(setDataTypeCode(event.code.toLowerCase()))
        dispatch(setDisableDataTab(false))
    }

    const postData = async (data: Dataset) => {
        if (!data.metadata) {
            notification.error({
                message: 'B???n ch??a t???o metadata',
                description: 'Vui l??ng t???o metadata tr?????c khi th??m',
            })

            return
        }

        setButtonLoading(true)
        const [status] = await datasetApi.add(data)
        if (status === 200) {
            notification.success({
                message: 'Th??m m???i th??nh c??ng!',
                duration: 1,
            })
        } else {
            notification.error({
                message: 'L???i khi th??m',
                description: 'Vui l??ng ki???m tra l???i!',
            })
        }
        setButtonLoading(false)
        setUpdate(true)
        handleCancel()
    }

    const putData = async (data: Dataset) => {
        setButtonLoading(true)
        const [status] = await datasetApi.update(modalId, data)
        if (status === 200) {
            notification.success({
                message: 'C???p nh???p th??nh c??ng!',
                duration: 1,
            })
        } else {
            notification.error({
                message: 'L???i khi th??m',
                description: 'Vui l??ng ki???m tra l???i!',
            })
        }
        setButtonLoading(false)
        setUpdate(true)
        handleCancel()
    }

    const handleTabClick = (key: string) => {
        dispatch(setTabKey(key))
    }

    const handleChangeDragger = (info: any) => {
        setFileList(info.fileList)
        const { response } = info.file

        // Check xem upload ???? xong hay ch??a
        if (!response) return

        const { name, type, url } = response.data[0]

        dispatch(setFileName(name))
        dispatch(setFileType(type))
        dispatch(setFileUrl(url))

        let reader = new FileReader()

        reader.onload = (e: any) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })

            const firstSheetName = workbook.SheetNames[0]
            const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])
            const json_object = JSON.stringify(XL_row_object)
            dispatch(setDataUpload(JSON.parse(json_object)))
        }

        reader.readAsBinaryString(info.file.originFileObj)

        message.success(`${info.file.name} file uploaded successfully.`)
    }

    const handleClickPreview = () => {
        const handlePreview = (dataSource: any) => {
            if (!Array.isArray(dataSource)) {
                notification.info({
                    message: 'D??? li???u kh??ng h???p l???',
                    duration: 1,
                })

                return
            }

            if (dataSource.length === 0) {
                notification.info({
                    message: 'Ch??a c?? d??? li???u',
                    duration: 1,
                })

                return
            }

            setDisableTablePreview(false)
            setDisableTableMetadata(true)

            if (dataSource.length > 5) dataSource = dataSource.slice(0, 5)
            dispatch(setDataPreview(dataSource))

            if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
                const columns = dataMetadata.map((metadata: any) => ({
                    key: metadata.Data,
                    title: metadata.Title,
                    dataIndex: metadata.Data,
                }))

                dispatch(setColumnPreview(columns))
            } else {
                const dataTemp = dataSource[0]
                const columns = Object.keys(dataTemp).map((key) => ({
                    key,
                    title: key,
                    dataIndex: key,
                }))

                dispatch(setColumnPreview(columns))
            }
        }

        const handleWebApi = async () => {
            const formData = form.getFieldsValue(true)
            const { body, dataKey, headers, method, url } = formData

            const axiosOptions = {
                method,
                url,
                timeout: 15000,
                headers: JSON.stringify(
                    Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}
                ),
                data: JSON.stringify(body),
            }

            const res = await forwardApi.forward(axiosOptions)

            if (res) {
                const dataSource = res[dataKey]
                handlePreview(dataSource)
            }
        }

        const handleExcel = () => {
            handlePreview(dataUpload)
        }

        switch (dataTypeCode) {
            case DataTypeCode.webapi:
                handleWebApi()
                break
            case DataTypeCode.file:
                handleExcel()
                break
            default:
                break
        }
    }

    const handleClickMetadata = () => {
        const columnMetadata = [
            new ColumnMetadata('Data', 'Data', 'Data', true),
            new ColumnMetadata('DataType', 'DataType', 'DataType', true),
            new ColumnMetadata('Title', 'Title', 'Title', true),
            new ColumnMetadata('Description', 'Description', 'Description', true),
        ]

        const handleWithDataSource = (dataSource: any) => {
            if (!Array.isArray(dataSource)) {
                notification.info({
                    message: 'D??? li???u kh??ng h???p l???',
                    duration: 1,
                })

                return
            }

            if (dataSource.length === 0) {
                notification.info({
                    message: 'Ch??a c?? d??? li???u',
                    duration: 1,
                })

                return
            }

            setDisableTablePreview(true)
            setDisableTableMetadata(false)

            const dataTemp = dataSource[0]
            const metadata = Object.keys(dataTemp).map((key) => ({
                Data: key,
                DataType: typeof dataTemp[key] === 'object' ? 'string' : typeof dataTemp[key],
                Title: key,
                Description: key,
            }))
            dispatch(setDataMetadata(metadata))
            dispatch(setColumnMetata(columnMetadata))
        }

        const handleWithoutDataSource = () => {
            setDisableTablePreview(true)
            setDisableTableMetadata(false)

            dispatch(setDataMetadata(dataMetadata))
            dispatch(setColumnMetata(columnMetadata))
        }

        const handleWebApi = async () => {
            const formData = form.getFieldsValue(true)

            if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
                handleWithoutDataSource()
                return
            }

            const { body, dataKey, headers, method, url } = formData

            const axiosOptions = {
                method,
                url,
                timeout: 15000,
                headers: JSON.stringify(
                    Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}
                ),
                data: JSON.stringify(body),
            }

            const res = await forwardApi.forward(axiosOptions)

            if (res) {
                let dataSource = res[dataKey]
                handleWithDataSource(dataSource)
            }
        }

        const handleExcel = () => {
            if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
                handleWithoutDataSource()
                return
            }

            handleWithDataSource(dataUpload)
        }

        switch (dataTypeCode) {
            case DataTypeCode.webapi:
                handleWebApi()
                break
            case DataTypeCode.file:
                handleExcel()
                break
            default:
                break
        }
    }

    const handleDrop = (e: any) => console.log('Dropped files', e.dataTransfer.files)

    const handlePreview = async (file: any) => {
        if (file.url) {
            window.open(file.url, '_blank')
        }
    }

    const footer = [
        typeModal === 'view' ? (
            <></>
        ) : (
            <Button
                key='Ok'
                type='primary'
                htmlType='submit'
                size='middle'
                className={cx('ok-btn')}
                icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
                onClick={() => {
                    handleOk()
                }}
                loading={buttonLoading}
            >
                <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'L??u'}</Text>
            </Button>
        ),
        <Button
            key='Cancel'
            type='primary'
            size='middle'
            className={cx('cancel-btn')}
            icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
            onClick={() => {
                handleCancel()
            }}
        >
            <Text style={{ color: '#757575', paddingLeft: 5 }}>
                {' '}
                {typeModal === 'view' ? '????ng' : 'H???y'}
            </Text>
        </Button>,
    ]

    return (
        <Modal
            width={1200}
            visible={modalVisible}
            title={<Text className={cx('text-modal')}>T???p d??? li???u</Text>}
            onOk={handleOk}
            onCancel={handleCancel}
            closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
            footer={footer}
        >
            <Spin spinning={isLoading}>
                <Form layout='vertical' {...layout} form={form}>
                    <Tabs activeKey={tabKey} onTabClick={(key) => handleTabClick(key)}>
                        <TabPane tab='Th??ng tin' key='information'>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label='T??n'
                                        name='name'
                                        rules={[
                                            { required: true, message: 'Kh??ng ???????c ????? tr???ng!' },
                                        ]}
                                    >
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='M??' name='code'>
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item label='Ti??u hi???n th???' name='title'>
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Tag' name='tags'>
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item label='L??nh v???c' name='categoryId'>
                                        <Select showSearch placeholder='Ch???n l??nh v???c'>
                                            {categories.map((category) => (
                                                <Option key={category.id} value={category.id}>
                                                    {category.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='T??? ch???c' name='organizationId'>
                                        <Select showSearch placeholder='Ch???n t??? ch???c'>
                                            {organizations.map((organization) => (
                                                <Option
                                                    key={organization.id}
                                                    value={organization.id}
                                                >
                                                    {organization.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item label='H??nh th???c cung c???p' name='providerTypeId'>
                                        <Select showSearch placeholder='Ch???n h??nh th???c cung c???p'>
                                            {providerTypes.map((providerType) => (
                                                <Option
                                                    key={providerType.id}
                                                    value={providerType.id}
                                                >
                                                    {providerType.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Gi???y ph??p' name='licenseId'>
                                        <Select showSearch placeholder='Ch???n gi???y ph??p'>
                                            {licenses.map((license) => (
                                                <Option key={license.id} value={license.id}>
                                                    {license.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label='Lo???i d??? li???u'
                                        name='dataTypeId'
                                        rules={[
                                            { required: true, message: 'Kh??ng ???????c ????? tr???ng!' },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder='Ch???n lo???i d??? li???u'
                                            onChange={(value, event) =>
                                                handleChangeDataType(value, event)
                                            }
                                        >
                                            {dataTypes.map((dataType) => (
                                                <Option
                                                    key={dataType.id}
                                                    value={dataType.id}
                                                    code={dataType.code}
                                                >
                                                    {dataType.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item name='visibility' valuePropName='checked'>
                                <Checkbox>Xu???t b???n l??n c???ng</Checkbox>
                            </Form.Item>

                            <Form.Item label='M?? t???' name='description'>
                                <TextArea
                                    disabled={disable}
                                    rows={3}
                                    style={{ width: '100%', borderRadius: 5 }}
                                />
                            </Form.Item>
                        </TabPane>

                        <TabPane tab='D??? li???u' disabled={disableDataTab} key='data'>
                            {dataTypeCode === DataTypeCode.webapi ? (
                                <>
                                    <Row>
                                        <Col span={3}>
                                            <Form.Item label='Ph????ng th???c' name='method'>
                                                <Select placeholder='Http action'>
                                                    {httpMethods.map((httpMethod) => (
                                                        <Option key={httpMethod} value={httpMethod}>
                                                            {httpMethod}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item label='Data Key' name='dataKey'>
                                                <Input placeholder='Nh???p data key' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={9}>
                                            <Form.Item label='?????a ch???' name='url'>
                                                <Input placeholder='Enter request URL' />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <p className='mb-2'>Headers</p>
                                            <Form.List name='headers'>
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map(
                                                            ({ key, name, ...restField }) => (
                                                                <Space
                                                                    key={key}
                                                                    style={{
                                                                        display: 'flex',
                                                                        marginBottom: 8,
                                                                    }}
                                                                    align='baseline'
                                                                >
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'key']}
                                                                    >
                                                                        <Input placeholder='Key' />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'value']}
                                                                    >
                                                                        <Input placeholder='Value' />
                                                                    </Form.Item>
                                                                    <MinusCircleOutlined
                                                                        onClick={() => remove(name)}
                                                                    />
                                                                </Space>
                                                            )
                                                        )}
                                                        <Form.Item>
                                                            <Button
                                                                type='dashed'
                                                                onClick={() => add()}
                                                                block
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Th??m header
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Col>
                                    </Row>

                                    <Divider />

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label='Body' name='body'>
                                                <TextArea
                                                    disabled={disable}
                                                    rows={5}
                                                    style={{ width: '100%', borderRadius: 5 }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <>
                                    <Form.Item label='File ????nh k??m' name='fileUrl'>
                                        <Dragger
                                            name='files'
                                            maxCount={1}
                                            multiple={false}
                                            action={`${process.env.REACT_APP_FILE_URL}/api/v1/attachments`}
                                            headers={{
                                                TDAuthorization:
                                                    process.env
                                                        ?.REACT_APP_DEFAULT_TDAUTHORIZATION ?? '',
                                            }}
                                            onChange={handleChangeDragger}
                                            onDrop={handleDrop}
                                            onPreview={handlePreview}
                                            fileList={fileList}
                                        >
                                            <p className='ant-upload-drag-icon'>
                                                <InboxOutlined />
                                            </p>
                                            <p className='ant-upload-text'>
                                                K??o ho???c th??? file ????? t???i l??n
                                            </p>
                                        </Dragger>
                                    </Form.Item>

                                    <Col span={9}>
                                        <Form.Item label='T??n sheet / data key' name='sheetName'>
                                            <Input placeholder='??i???n t??n sheet / data key' />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                            <div className='mb-5'>
                                <Button
                                    icon={<DatabaseOutlined />}
                                    className={cx('preview-btn')}
                                    onClick={handleClickPreview}
                                >
                                    Xem tr?????c
                                </Button>
                                <Button
                                    icon={<ClockCircleOutlined />}
                                    className={cx('metadata-btn')}
                                    onClick={handleClickMetadata}
                                >
                                    Xem metadata
                                </Button>
                            </div>

                            {!disableTableMetadata && <MetadataTable />}
                            {!disableTablePreview && (
                                <Table dataSource={dataPreview} columns={columnPreview} />
                            )}
                        </TabPane>
                    </Tabs>
                </Form>
            </Spin>
        </Modal>
    )
}

export default memo(ModalCategory)
