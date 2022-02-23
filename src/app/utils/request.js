/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import {extend} from 'umi-request';
import {notification} from 'antd';

const codeMessage = {
  200: 'Máy chủ trả về thành công dữ liệu',
  201: 'Dữ liệu mới hoặc được sửa đổi thành công',
  202: 'Một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ)',
  204: 'Dữ liệu đã được xóa thành công.',
  400: 'Đã xảy ra lỗi trong yêu cầu được gửi và máy chủ không tạo hoặc sửa đổi dữ liệu.',
  401: 'Người dùng không có quyền (mã thông báo, tên người dùng, mật khẩu bị sai).',
  403: 'Người dùng được phép, nhưng quyền truy cập bị cấm.',
  404: 'Yêu cầu được gửi dành cho một bản ghi không tồn tại và máy chủ không hoạt động.',
  406: 'Định dạng được yêu cầu không có sẵn.',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa',
  422: 'Khi tạo một đối tượng, một lỗi xác thực đã xảy ra',
  500: 'Đã xảy ra lỗi trong máy chủ, vui lòng kiểm tra máy chủ',
  502: 'Lỗi cổng',
  503: 'Dịch vụ không khả dụng và máy chủ tạm thời bị quá tải hoặc được bảo trì',
  504: 'Cổng vào đã hết thời gian.',
};
/** 异常处理程序 */

const errorHandler = (error) => {
  const {response} = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, url} = response;
    notification.error({
      message: `Yêu cầu lỗi ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Mạng của bạn không bình thường và bạn không thể kết nối với máy chủ',
      message: 'Mạng bất thường',
    });
  }

  return response;
};
/** 配置request请求时的默认参数 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
export default request;
