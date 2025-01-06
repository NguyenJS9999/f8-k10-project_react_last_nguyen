import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../../services/productServices";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (params) => {
	return await getAllProducts(params);
});

export const fetchProductById = createAsyncThunk( "products/fetchProductById", async (id) => {
	// console.log("fetchProductById id: ", id);
	return await getOneProduct(id);
}
);

export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
	return await addProduct(product);
});

export const editProduct = createAsyncThunk("products/editProduct", async ({ id, product }) => {
	return await updateProduct(id, product);
});

export const removeProduct = createAsyncThunk("products/removeProduct", async (id) => {
	await deleteProduct(id);
	return id;
});
