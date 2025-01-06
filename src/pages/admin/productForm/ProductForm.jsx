import './ProductForm.scss';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaProduct } from '../../../schemas/productShemas';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, editProduct, fetchProductById } from '../../../features/products/productActions';
import { ToastContainer, toast } from 'react-toastify';
import AtomLoading from '../../../compoents/atoms/AtomLoading/atomLoading';

const ProductForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { loading, error, message } = useSelector((state) => state.products);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(schemaProduct),
        defaultValues: {
            title: '',
            price: 0,
            description: '',
        },
    });

    useEffect(() => {
        if (id) {
            (async () => {
                const data = await dispatch(fetchProductById(id)).unwrap();
                reset(data);
            })();
        }
    }, [dispatch, id, reset]);

/*************  ✨ Codeium Command ⭐  *************/
/******  f9cebd30-07bd-473d-9b4e-b42cac900fd9  *******/
    function handleProductForm(dataBody) {
        try {
            if (id) {
                dispatch(editProduct({ id, ...dataBody }));
                toast.success(message || 'Update success!');
                setTimeout(() => {
                    nav('/admin/products');
                }, 2000);
            } else {
                dispatch(createProduct(dataBody));
                toast.success(message || 'Add success!');
                reset();
            }
        } catch (error) {
            console.log('handleProductForm error', error);
        }
    }

    if (error) {
        if (typeof error === 'string') {
            toast.error(error);
        } else {
            toast.error(error || 'An error occurred');
        }
    }

    function handleResetForm() {
        reset({
            title: '',
            price: 0,
            description: '',
        });
    }

    return (
        <div className='product-form-page'>
            <h1>{id ? 'Cập nhật' : 'Thêm mới'} sản phẩm</h1>

            {loading && <AtomLoading />}

            <form onSubmit={handleSubmit(handleProductForm)} className='product-form'>
                <div className='form-group mt-2'>
                    <label htmlFor='title' className='form-label'>
                        Title
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        id='title'
                        placeholder='Title'
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p className='text-danger'>{errors.title?.message}</p>}
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor='price' className='form-label'>
                        Price
                    </label>
                    <input
                        className='form-control'
                        type='number'
                        id='price'
                        placeholder='Price'
                        step='any'
                        {...register('price', { required: true, valueAsNumber: true })}
                    />
                    {errors.price && <p className='text-danger'>{errors.price?.message}</p>}
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor='description' className='form-label'>
                        Description
                    </label>
                    <textarea
                        className='form-control'
                        id='description'
                        cols="50"
                        placeholder='Description'
                        {...register('description', { required: true })}
                    />
                </div>

                <div className='product-form-action form-group mt-2'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={handleResetForm}
                    >
                        Nhập lại
                    </button>
                    <button type='submit' className='btn btn-primary'>
                        {id ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductForm;
