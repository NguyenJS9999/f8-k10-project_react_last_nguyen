import { AxiosResponse } from "axios";
import instance from ".";
import { IProduct } from "../interfaces/IProduct";

export const getAllProducts = async () => {
	const { data } = await instance.get("/products");
	return data;
};

export const addProduct = async (product: IProduct): Promise<IProduct> => {
	const { data } = await instance.post("/products", product);
	return data;
};

export const deleteProduct = async (id: number) => {
	const res: AxiosResponse = await instance.delete(`/products/${id}`);
	return res;
};

export const updateProduct = async (id: number, product: IProduct) => {
	const { data } = await instance.patch(`/products/${id}`, product);
	return data;
};
