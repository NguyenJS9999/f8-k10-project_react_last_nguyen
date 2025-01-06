import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, createProduct, editProduct, removeProduct, fetchProductById } from "./productActions";

const initialState = {
	products: [],
	totalProducts: null,
	product: {},
	loading: false,
	error: null,
	statusCode: null,
	message: '',
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				// console.log("fetchProducts.fulfilled action.payload: ", action.payload);
				state.products = action.payload;
				state.totalProducts = action.payload.length;
				state.statusCode = action.payload.status || 200;
				state.message = action.payload.statusText || action.payload.message || "Success";
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.statusCode = action.payload.status || null; // chưa rõ lắm
				state.message = action.payload.statusText || action.payload.message || "Failed";

			})

			.addCase(fetchProductById.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.loading = false;
				console.log("fetchProductById.fulfilled action.payload: ", action.payload);
				state.product = action.payload;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})


			.addCase(createProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})


			.addCase(editProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				state.loading = false;
				console.log("editProduct.fulfilled action.payload.id: ", action.payload.id);

				const index = state.products.findIndex((product) => product.id === action.payload.id);
				const product = state.products.find((product) => String(product.id) === String(action.payload.id));
				console.log("editProduct.fulfilled index: ", index);
				console.log("editProduct.fulfilled product: ", product);

				if (index !== -1) {
					state.products[index] = action.payload;
				}
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})


			.addCase(removeProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter((product) => product.id !== action.payload);
			})
			.addCase(removeProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});


	},
});

const productReducer = productSlice.reducer;

export default productReducer;
