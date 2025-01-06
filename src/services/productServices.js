import instance from '.';

const handleRequest = async (callback) => {
	try {
		const res = await callback();
		return res.data; // Trả về dữ liệu
	} catch (error) {
		// console.log('handleRequest error:', error);
		if (error.response) {
			// console.error('Request error response:', error.response.data);
			return error.response; // Trả về dữ liệu lỗi
		} else {
			// console.error('Request error:', error.message);
			return { message: error.message }; // Trả về dữ liệu lỗi
		}
		// throw error;
	}
};

export const getAllProducts = (params = {}) => handleRequest(() => instance.get('/products', { params }));
export const getOneProduct = (id) => handleRequest(() => instance.get(`/products/${id}`));
export const addProduct = (product) => handleRequest(() => instance.post('/products', product));
export const updateProduct = (id, product) => handleRequest(() => instance.patch(`/products/${id}`, product));
export const deleteProduct = (id) => handleRequest(() => instance.delete(`/products/${id}`));
