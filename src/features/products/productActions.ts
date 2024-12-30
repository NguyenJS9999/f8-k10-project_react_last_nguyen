import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services";
import { IProduct } from "../../interfaces/IProduct";

export const fetchProducts = createAsyncThunk<IProduct[]>("/products/fetchProducts", async () => {
	const { data } = await instance.get("/products");
	return data;
});

export const fetchProductById = createAsyncThunk<IProduct, number | string>( "products/fetchProductById", async (id) => {
		const { data } = await instance.get(`/products/${id}`);
		return data;
	}
);

export const createProduct = createAsyncThunk<IProduct, IProduct>("/products/credaasn vafo 1 magnr bvaf bonjc usse routeeateProduct", async (product) => {
	const res = await instance.post("/products", product);
	const data = res.data;
	if (res.status) {
		data.statusText = res.statusText || "Add product successfully";
		data.status = res.status;
	}
	return data;
});


export const editProduct = createAsyncThunk<IProduct, IProduct>( "/products/editProduct", async ({ id, ...product }) => {
		const res = await instance.patch<IProduct>(`/products/${id}`, product);
		const data = res.data;
		if (res.status) {
			data.statusText = res.statusText || "Update product successfully";
			data.status = res.status;
		}
        return data;
    }
);

export const removeProduct = createAsyncThunk<number, number>("/products/removeProduct", async (id) => {
	const res = await instance.delete(`/products/${id}`);
	const data = res.data;
	if (res.status) {
		data.statusText = res.statusText || "Update product successfully";
		data.status = res.status;
	}
	return data;
});
