import instance from ".";

export const getAllProducts = async () => {
	const { data } = await instance.get("/products");
	return data;
};

export const addProduct = async (product) => {
	const { data } = await instance.post("/products", product);
	return data;
};

export const deleteProduct = async (id) => {
	const res = await instance.delete(`/products/${id}`);
	// Logic return sẽ thay đổi sau khi thay đổi services
	return res.ok;
};

export const updateProduct = async (id, product) => {
	const { data } = await instance.patch(`/products/${id}`, product);
	return data;
};
