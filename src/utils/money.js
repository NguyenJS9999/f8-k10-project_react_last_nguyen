/**
 * Chuyển đổi số tiền sang định dạng hiển thị.
 * @param {number} amount - Giá trị số tiền gốc (VD: 4750000000).
 * @param {string} unit - Đơn vị tiền tệ cần hiển thị (VD: "VND", "triệu").
 * @returns {string} Chuỗi tiền tệ đã được định dạng.
 */
export const formatPrice = (amount, unit = 'VND') => {
	if (!amount || isNaN(amount)) return 'N/A'; // Kiểm tra dữ liệu không hợp lệ

	switch (unit) {
		case 'VND':
			// Định dạng tiền với dấu phân cách hàng nghìn và đơn vị VNĐ
			return `${amount.toLocaleString('vi-VN')} ₫`;

		case 'triệu':
			// Chuyển đổi sang đơn vị triệu đồng
			return `${(amount / 1_000_000).toLocaleString('vi-VN')} triệu ₫`;

		default:
			return amount.toLocaleString('vi-VN'); // Mặc định chỉ định dạng số
	}
};
