import { Button, Modal, Spin, Typography } from 'antd'

const { Text } = Typography

type Props = {
  modalVisible: boolean,
  handleOk?: any,
  handleCancel?: any,
  isLoading?: any,
  typeModal?: any,
  buttonLoading?: any,
  title?: string,
}

const CRUDModal: React.FC<Props> = ({
  children,
  modalVisible,
  handleOk,
  handleCancel,
  isLoading,
  typeModal,
  buttonLoading,
  title,
}) => {
  const footer = [
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
  ]

  return (
    <Modal
      width={1200}
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>{title}</Text>}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
      footer={footer}
    >
      <Spin spinning={isLoading}>
        {children}
      </Spin>

    </Modal>
  )
}

export default CRUDModal