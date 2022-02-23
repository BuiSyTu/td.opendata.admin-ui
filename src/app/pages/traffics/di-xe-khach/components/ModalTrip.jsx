

// import React, { useEffect, useState } from 'react';
// import {
//   Row,
//   Col,
//   Form,
//   Button,
//   Input,
//   notification,
//   Typography,
//   Select,
//   Modal,
//   Checkbox,
//   Divider,
//   DatePicker,
//   FormModal,
//   Spin,
//   Empty,
//   Image,
//   Popconfirm
// } from 'antd';
// import { HOST_API, requestGET, requestPOST, requestPUT, HOST_FILE, requestDELETE, HOST_API_Image } from '../../../../utils/basicAPI';
// import Cookies from 'js-cookie';
// import TableList from '../../../../components/TableList';
// import { handleImage, convertImage } from '../../../../../utils/utils';
// import ImageUpload from '../../../../components/ImageUpload';
// const ModalCategory = (props) => {
// const columns = [
//     {
//       title: 'STT',
//       dataIndex: '',
//       key: '',
//       align: 'center',
//       render: (text, record, index) => {
//         return (
//           <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             {index + 1}
//           </Text>
//         );
//       },
//       width: '5%',
//     },
//     {
//       title: 'Tên chuyến đi',
//       dataIndex: 'name',
//       key: 'name',
//       width: '15%',
//     },
//     {
//       title: 'Giá',
//       dataIndex: 'companyName',
//       key: 'companyName',
//       width: '20%',
//     },
//     {
//       title: 'Thời gian khởi hành',
//       dataIndex: 'timeStart',
//       key: 'timeStart',
//       width: '20%',
//     },
//     {
//       title: 'Thời gian di chuyển',
//       dataIndex: 'duration',
//       key: 'duration',
//       width: '10%',
//     },
//     {
//       title: 'Thao tác',
//       width: '15%',
//       dataIndex: '',
//       key: '',
//       align: 'center',
//       render: (text, record) => (
//         <div>
//           <a
//             className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
//             data-toggle='m-tooltip'
//             title='Xem'
//             onClick={() => {
//               handleViewTrip(Number(record.id));
//             }}
//           >
//             <i className='la la-eye' style={{ marginLeft: -7 }}></i>
//           </a>
//           <a
//             style={{ marginLeft: 10 }}
//             className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
//             data-toggle='m-tooltip'
//             title='Sửa'
//             onClick={() => {
//               handleEditTrip(Number(record.id));
//             }}
//           >
//             <i className='la la-edit' style={{ marginLeft: -7 }}></i>
//           </a>
//           <Popconfirm
//             title='Xóa dữ liệu？'
//             okText='Ok'
//             cancelText='Hủy'
//             onConfirm={() => {
//               handleDeleteTrip(Number(record.id));
//             }}
//           >
//             <a
//               style={{ marginLeft: 10 }}
//               className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
//               data-toggle='m-tooltip'
//               title='Xóa'
//             >
//               <i className='la la-trash' style={{ marginLeft: -7 }}></i>
//             </a>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   const handleEditTrip = (id) => {
//     setModalIdTrip(id);
//     setTypeModalTrip('edit');
//     setModalVisibleTrip(true);
//   };

//   const handleViewTrip = (id) => {
//     setModalIdTrip(id);
//     setTypeModalTrip('view');
//     setModalVisibleTrip(true);
//   };

//   const handleDeleteTrip = async (id) => {
//     var res = await requestDELETE(`${HOST_API}/trip/${id}`);
//     if (res) {
//       notification.success({
//         message: 'Xóa thành công!',
//         duration: 1,
//         placement: 'bottomRight',
//       });
//       setUpdateTrip(true);
//     } else {
//       notification.error({
//         message: `Thất bại!`,
//         description: 'Xóa không thành công.',
//       });
//     }
//   };

//   return (   <Modal
//     visible={modalVisible}
//     title={<Text style={{ fontWeight: '500', color: '#fff' }}>Phương tiện</Text>}
//     width='100%'
//     onOk={handleOk}
//     onCancel={handleCancel}
//     closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
//     footer={[
//       typeModal == 'view' ? (
//         <></>
//       ) : (
//         <Button
//           key='Ok'
//           type='primary'
//           htmlType='submit'
//           size='middle'
//           style={{
//             borderRadius: 5,
//             padding: '5px 12px',
//             backgroundColor: '#34bfa3',
//             borderColor: '#34bfa3',
//           }}
//           icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
//           onClick={() => {
//             handleOkTrip();
//           }}
//           loading={buttonLoading}
//         >
//           <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
//         </Button>
//       ),
//       <Button
//         key='Cancle'
//         type='primary'
//         size='middle'
//         style={{
//           borderRadius: 5,
//           padding: '5px 12px',
//           backgroundColor: '#FAFAFA',
//           borderColor: '#BDBDBD',
//         }}
//         icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
//         onClick={() => {
//           handleCancelTrip();
//         }}
//       >
//         <Text style={{ color: '#757575', paddingLeft: 5 }}>
//           {' '}
//           {typeModal == 'view' ? 'Đóng' : 'Hủy'}
//         </Text>
//       </Button>,
//     ]}
//   >
//     <Spin spinning={isLoading}>
//       <Form layout='vertical' labelAlign='left' form={form}>
//         <div className='row'>
//           <div className='col-4'>
//             <Form.Item
//               label='Tên'
//               name='name'
//               rules={[{ required: true, message: 'Không được để trống!' }]}
//             >
//               <Input style={{ width: '100%', height: 32, borderRadius: 5 }} />
//             </Form.Item>
//           </div>
        
//         </div>
//       </Form>
//     </Spin>
//   </Modal>)
// }
// export default ModalCategory;