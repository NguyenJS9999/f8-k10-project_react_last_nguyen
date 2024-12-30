import * as z from 'zod';

export const schemaProduct = z.object({
	title: z
		.string()
		.trim()
		.min(1, { message: 'Tên sản phẩm cần tối thiểu 1 ký tự' }),

	price: z
		.number()
		.positive({ message: 'Giá phải là số dương' })
		.refine(value => value === value && !isNaN(value), {
			// Kiểm tra để loại bỏ NaN
			message: 'Giá không hợp lệ'
		}),

	description: z.string().trim().optional()
});
