import { Button, Typography } from 'antd'

import { TypeModal } from 'src/setup/redux/slices/dataset'

const { Text } = Typography

const FooterModal = (props: any) => {
  const { typeModal, handleOk, handleCancel, buttonLoading } = props 

  return (
    typeModal === TypeModal.view ? (
      <></>
    ) : (
    <>
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
        onClick={handleOk}
        loading={buttonLoading}
      >
        <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
      </Button>

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
        onClick={handleCancel}
      >
        <Text style={{ color: '#757575', paddingLeft: 5 }}>
          {' '}
          {typeModal === TypeModal.view ? 'Đóng' : 'Hủy'}
        </Text>
      </Button>
    </>)
  )
}

export default FooterModal