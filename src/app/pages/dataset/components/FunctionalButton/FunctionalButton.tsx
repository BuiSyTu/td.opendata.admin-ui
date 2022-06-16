import { memo } from 'react'
import { Button } from 'antd'
import { ClockCircleOutlined, DatabaseOutlined } from '@ant-design/icons'

const FunctionalButton = (props: any) => {
  const { handleClickPreview, handleClickMetadata } = props

  return (
    <>
      <Button
        icon={<DatabaseOutlined />}
        style={{
          background: '#ffb822',
          color: '#111111',
          minWidth: '130px',
          borderRadius: 5,
          marginRight: '5px',
        }}
        onClick={handleClickPreview}
      >
        Xem trước
      </Button>
      <Button
        icon={<ClockCircleOutlined />}
        style={{
          background: '#34bfa3',
          color: '#ffffff',
          minWidth: '130px',
          borderRadius: 5,
        }}
        onClick={handleClickMetadata}
      >
        Xem metadata
      </Button>
    </>
  )
}
export default memo(FunctionalButton)