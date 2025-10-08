/**
 * Chuyển đổi chuỗi ngày dạng dd/mm/yyyy sang đối tượng Date.
 * @param dateStr Chuỗi ngày dạng dd/mm/yyyy
 * @returns Đối tượng Date hoặc null nếu không hợp lệ
 */
export function parseBankDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1000
  ) {
    return null;
  }
  // Lưu ý: Tháng trong JS Date bắt đầu từ 0
  const date = new Date(year, month - 1, day);
  // Kiểm tra lại ngày/tháng/năm hợp lệ
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}
