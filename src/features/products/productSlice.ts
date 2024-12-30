import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, createProduct, editProduct, removeProduct } from "./productActions";
import { IProduct } from "../../interfaces/IProduct";

type ProductState = {
	products: IProduct[];
	loading: boolean;
	error?: string | null;
	message?: string | null;
	status?: number;

};

const initialState: ProductState = {
	products: [],
	loading: false,
	error: null,
	message: '',
	status: 0,
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
			.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// ADD
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(createProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
				state.loading = false;
				state.products.push(action.payload);
				state.message = action.payload.statusText || "Add product successfully";
				state.status = action.payload.status || 0;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Add product error";
			})
			// UPDATE
			.addCase(editProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(editProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
				console.log("editProduct action: ", action);

				state.loading = false;
				const index = state.products.findIndex((product) => product.id === action.payload.id);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
				state.message = action.payload.statusText || "Update product successfully";
				state.status = action.payload.status || 0;
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Update product error";
			})
			// DEL
			.addCase(removeProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeProduct.fulfilled, (state, action: PayloadAction<number>) => {
				state.loading = false;
				state.products = state.products.filter((product) => product.id !== action.payload);
				state.message = "Delete product successfully";

			})
			.addCase(removeProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Delete product error";
			});
	},
});

const productReducer = productSlice.reducer;

export default productReducer;
