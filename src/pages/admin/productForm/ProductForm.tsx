import './ProductForm.scss';
import React,{ useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaProduct } from "../../../schemas/productShemas";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { createProduct,editProduct,fetchProductById } from '../../../features/products/productActions';
// import { number } from 'zod';
import { IProduct } from '../../../interfaces/IProduct';
import AtomLoading from '../../components/atoms/atomLoading/AtomLoading';
// import useProducts from "../../hooks/useProducts";
import { ToastContainer, toast } from 'react-toastify';

interface ProductFormValues {
    title: string;
    price: number;
    description: string;
}

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const nav = useNavigate();
    const { loading, error, message } = useSelector((state: RootState) => state.products);

    // const { createProduct, updateProduct } = useProducts();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(schemaProduct),
        defaultValues: {
            title: "",
            price: 0,
            description: "",
        },
    });

    useEffect(() => {
        id &&
            (async () => {
                const data = await dispatch(fetchProductById(id)).unwrap();
                reset(data);
            })();
    },[dispatch, id, reset]);

    function handleProductForm(dataBody: IProduct) {
        try {
            if (id) {
                dispatch(editProduct({ id, ...dataBody }));
                toast.success(`${message || "Update success!"}`);
                setTimeout(() => {  nav("/admin/products") }, 2000);
            } else {
                dispatch(createProduct(dataBody));
                toast.success(`${message || "Add success!"}`);
                reset();
            }
        } catch (error) {
            console.log('handleProductForm error', error);
        }
    }

    if (error) {
        // Nếu error là chuỗi
        if (typeof error === 'string') {
            toast.error(error);
        } else {
            // Nếu error là đối tượng có thuộc tính message
            toast.error(error || 'An error occurred');
        }
    }

   function hadnleResetForm() {
        reset({
            title: "",
            price: 0,
            description: "",
        });
   }

    return (
        <div className='product-form-page'>
            <h1>{id ? "Cập nhật" : "Thêm mới"} sản phẩm</h1>

            {loading && <AtomLoading />}

            <form onSubmit={handleSubmit(handleProductForm)}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        placeholder="Title"
                        {...register("title",{ required: true })}
                    />
                    {errors.title && (
                        <p className="text-danger">{errors.title?.message}</p>
                    )}
                </div>

                <div className="form-group">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						className="form-control"
						type="number"
						id="price"
						placeholder="Price"
						step="any"  // Cho phép nhập số thập phân
						{...register("price", { required: true, valueAsNumber: true })}
					/>
					{errors.price && <p className="text-danger">{errors.price?.message}</p>}
				</div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        {...register("description",{ required: true })}
                    />
                </div>

                <div className="product-form-action form-group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => hadnleResetForm()}
                    >
                        Nhập lại
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {id ? "Cập nhật" : "Thêm mới"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductForm;
