/**
 * Hàm tạo object lỗi theo format của Ant Design Form
 * @param fields - tên trường bị lỗi (string hoặc mảng string)
 * @param errorMessages - thông báo lỗi (string hoặc mảng string)
 * @returns object lỗi theo format của Ant Design
 */
export function createAntdError(fields: string, errorMessages: string[]) {
  return {
    name: fields,
    errors: errorMessages,
  };
}
