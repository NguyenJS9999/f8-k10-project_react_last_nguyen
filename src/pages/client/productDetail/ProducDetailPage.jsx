
import { useParams } from 'react-router-dom';
import './ProductForm.scss';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../../features/products/productActions';
import { useDispatch, useSelector } from 'react-redux';
import AtomLoading from '../../../compoents/atoms/AtomLoading/atomLoading';
import { toast, ToastContainer } from 'react-toastify';
// import { getOneProduct } from '../../../services/productServices';

const ProducDetailPage = () => {
	const dispatch = useDispatch();

	const [quantity, setQuantity] = useState(1);

	const { id } = useParams(); // Lấy ID từ URL

	useEffect(() => {
		dispatch(fetchProductById(id));
		// console.log('productDetail id: ', id);
	}, [id, dispatch]);

	const { product, loading } = useSelector(state => state.products); // error, statusCode, message

	// useEffect(() => {
	// 	console.log('productDetail product: ', product);
	// }, [product]);

	const handleIncrease = () => {
		setQuantity(prev => prev + 1);
	};

	const handleDecrease = () => {
		if (quantity > 1) setQuantity(prev => prev - 1);
	};

	const handleAddToCart = () => {
		toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
	};



	return (
		<div className="container mx-auto p-4">

            {loading && <AtomLoading />}
			<div className="flex flex-col md:flex-row gap-8">
				{/* Hình ảnh sản phẩm */}
				<div className="flex-1">
					<img
						src={product?.featured_image}
						alt={product?.title}
						className="w-full h-96 object-cover rounded shadow-md"
					/>
				</div>

				{/* Thông tin sản phẩm */}
				<div className="flex-1">
					<div className="text-3xl font-semibold mb-4">
						{product?.title}
					</div>
					{/* <p className="text-gray-500 mb-6">{product?.description}</p> */}
					<p className="text-xl font-bold text-red-600 mb-6">
						{new Intl.NumberFormat('vi-VN', {
							style: 'currency',
							currency: 'VND'
						}).format(product?.price)}
					</p>

					{/* Chọn số lượng */}
					<div className="flex items-center gap-4 mb-6">
						<button
							onClick={handleDecrease}
							className="w-8 h-8 bg-gray-300 text-gray-700 rounded flex items-center justify-center hover:bg-gray-400"
						>
							-
						</button>
						<span className="text-lg font-medium">{quantity}</span>
						<button
							onClick={handleIncrease}
							className="w-8 h-8 bg-gray-300 text-gray-700 rounded flex items-center justify-center hover:bg-gray-400"
						>
							+
						</button>
					</div>

					{/* Nút Thêm vào giỏ hàng */}
					<button
						onClick={handleAddToCart}
						className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
					>
						Thêm vào giỏ hàng
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default ProducDetailPage;
