import './CategoriesPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import { fetchProducts, fetchProductById } from '../../../features/products/productActions';
import AtomLoading from '../../../compoents/atoms/AtomLoading/atomLoading';
import { formatPrice } from '../../../utils/money';
import { getAllProducts  } from '../../../services/productServices';

// import React from 'react'

function CategoriesPage() {
	const { slug } = useParams();
	const dispatch = useDispatch();
    const nav = useNavigate();
	const [selectedFilters, setSelectedFilters] = useState([]); // Để sau lọc theo hãng

	const [params, setParams] = useState({
		_page: 1, // Trang hiện tại
		_limit: 10, // Số lượng sản phẩm mỗi trang
		_sort: '', // Trường thông tin sắp xếp
		_order: '', // Kiểu sắp xếp (asc/desc)
		q: '' // Từ khóa tìm kiếm
		// Các bộ lọc khác nếu cần
	});
	const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
	const [totalPages, setTotalPages] = useState(0); // Tổng số trang
	const [itemsPerPage] = useState(10); // Số sản phẩm mỗi trang
	const [count, setCount] = useState(0); // Số sản phẩm mỗi trang

	const { products, totalProducts, loading } = useSelector(
		state => state.products
	); // error, statusCode, message

	useEffect(() => {
		(async () => {
			// console.log('CategoriesPage slug: ', slug);
			// setProduct(data);
		})();
	}, [slug]);

	// Chuyển trang
	const handlePageClick = event => {
		const selectedPage = event.selected + 1;
		setCurrentPage(selectedPage);
		setParams(prev => ({
			...prev,
			_page: selectedPage  // Chọn số phân trang
		}));
		fetchProducts(selectedPage); // Fetch dữ liệu cho trang mới
	};

	useEffect(() => {
		// console.log('selectedFilters: ', selectedFilters);
		// collectionid: '1003254052',
		// vendor_like: 'db Audiotechnik',

		const searchParams = new URLSearchParams(params);
		dispatch(fetchProducts(searchParams));

		if (totalProducts) {
			(async () => {
				const res = await getAllProducts();

				try {
					// console.log('getAllProducts res: ', res);
					setCount(res.data.length);
				} catch (error) {
					console.log(error);
				}
			})

			const totalItems = parseInt(totalProducts); // Tổng số bản ghi
			setTotalPages(Math.ceil(totalItems / itemsPerPage)); // Tính tổng số trang

			// console.log('totalProducts: ', totalProducts);
			// console.log('itemsPerPage: ', itemsPerPage);
			// console.log('totalItems: ', totalItems);

			setTotalPages(totalItems); // Cập nhật tổng số trang
		}

	}, [params, currentPage, itemsPerPage, totalProducts, selectedFilters, dispatch, count]);

	// 	useEffect(() => {
	// 		console.log('CategoriesPage products: ', products);
	//
	// 		setTimeout(() => {
	// 			console.log('setTimeout statusCode: ', statusCode);
	// 			if (!loading && products && statusCode !== 200) {
	// 				console.log(statusCode);
	// 				toast.warning(message || 'Failed to fetch products!');
	// 			}
	// 		}, 2000);
	// 	}, [products, statusCode, loading, message]);

	const brands = [
		'NEXO',
		'ADAMSON',
		'Amate Audio',
		'4Acoustic',
		'Martin Audio',
		'db Audiotechnik',
		'DMX',
		'Listensound',
		'Verity Audio',
		'HK Audio',
		'NEXO Audio',
		'DMX Audio',
		'Nova Audio'
	];

	// Xử lý khi người dùng chọn checkbox
	const handleCheckboxChange = brand => {
		setSelectedFilters(
			prevFilters =>
				prevFilters.includes(brand)
					? prevFilters.filter(item => item !== brand) // Bỏ nếu đã chọn
					: [...prevFilters, brand] // Thêm nếu chưa chọn
		);
	};

	const updateParams = (sort, order) => {
		// console.log('Filter updateParams:', sort, order);
		setParams(prev => ({
			...prev,
			_sort: sort,
			_order: order
		}));
	};

	// Danh sách các tùy chọn số lượng bản ghi
	const pageSizeOptions = [2, 5, 10, 20, 50, 100];

	// Hàm xử lý khi thay đổi tùy chọn
	const handlePageSizeChange = (event) => {
	setParams(prev => ({
		...prev,
		_limit: Number(event.target.value)
	}));
	// console.log("Số lượng bản ghi mỗi trang:", event.target.value);
	};

	const [search, setSearch] = useState('');

	const handleSearch = () => {
		// onSearch(search);
		setParams(() => ({ _q: search,}));
		setCount(() => count + 1);
	};

	const handleGetDetailById = (itemSlug) => {
		fetchProductById(itemSlug);
		// console.log('handleGetDetailById itemSlug', itemSlug);
		nav(`/products/${itemSlug}`);
	}

	return (
		<>
			<div className="container mx-auto py-4">
				{/* Header */}
				<div className="mb-4">
					<h1 className="text-2xl font-bold">Dàn Loa Karaoke</h1>
					<p className="text-gray-500">
						Trang chủ / Danh mục / Dàn Loa Karaoke
					</p>
				</div>
				<div className="flex">
					{/* Sidebar Bộ Lọc */}
					<aside className="w-1/4 pr-4 border-r border-gray-200">
						<div className="w-full max-w-sm border-r border-gray-200 p-4">
							<h2 className="text-lg font-bold mb-3">
								Hãng âm thanh
							</h2>
							<ul className="space-y-2">
								{brands.map((brand, index) => (
									<li key={index}>
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												className="form-checkbox text-indigo-600"
												value={brand}
												onChange={() =>
													handleCheckboxChange(brand)
												}
												checked={selectedFilters.includes(
													brand
												)}
											/>
											<span>{brand}</span>
										</label>
									</li>
								))}
							</ul>

							{/* Hiển thị giá trị lọc */}
							{/* <div className="mt-4">
								<h3 className="font-semibold">
									Bộ lọc hiện tại:
								</h3>
								<div className="text-sm text-gray-700">
									{selectedFilters.length > 0 ? (
										<strong>
											{selectedFilters.join(', ')}
										</strong>
									) : (
										<span>
											Chưa có bộ lọc nào được chọn.
										</span>
									)}
								</div>
							</div> */}
						</div>
					</aside>
					{/* Main Content */}
					<div className="w-3/4 pl-4">
						<div className="product-actions">
							{/* <MoleculeSearchBar
								onSearch={value =>
									updateParams({ q: value, _page: 1 })
								}
							/> */}
							<input
								type="text"
								value={search}
								onChange={e => setSearch(e.target.value)}
								placeholder="Tìm kiếm sản phẩm..."
								className="search-bar-component"
							/>
							<button onClick={handleSearch}>Tìm kiếm</button>
						</div>
						{/* Sort Bar */}
						<div className="flex flex-wrap justify-between items-center mb-4">
							<div className="flex flex-wrap justify-between items-center p-4">
								<h2 className="text-lg font-bold mr-3">
									Sắp xếp
								</h2>
								<div className="flex flex-wrap justify-center items-center gap-2">
									<div
										onClick={() => updateParams('name', 'asc')}
										className="cursor-pointer p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded transition"
									>
										<span>Tên A-Z</span>
									</div>
									<div
										onClick={() => updateParams('name', 'desc')}
										className="cursor-pointer p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded transition"
									>
										<span>Tên Z-A</span>
									</div>
									<div
										onClick={() =>
											updateParams('price', 'asc')
										}
										className="cursor-pointer p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded transition"
									>
										<span>Giá tăng dần</span>
									</div>
									<div
										onClick={() =>
											updateParams('price', 'desc')
										}
										className="cursor-pointer p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded transition"
									>
										<span>Giá giảm dần</span>
									</div>
									<div
										onClick={() => updateParams('created_at', 'asc')}
										className="cursor-pointer p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded transition"
									>
										<span>Mới nhất</span>
									</div>
								</div>
							</div>
						</div>

						{/* Product Grid */}
						<div className="grid gap-4 product-list">
							{loading ? (
								<AtomLoading />
							) : (
								products &&
								products.map((item, index) => (
									<div
										key={item?.id ?? index}
										className="product-card-item border rounded-lg shadow-sm p-2"
									>
										<div className="relative aspect-w-1 aspect-h-1">
											<img
												src={(item?.featured_image) ?? "https://via.placeholder.com/200x200"}
												alt="Product Name"
												className="object-cover w-full h-full rounded product-card-item-img"
												onClick={() => handleGetDetailById(item?.id)}
											/>
										</div>
										<div className="mt-2 text-sm font-semibold product-card-item-name"
											onClick={() => handleGetDetailById(item?.id)}
										>
											{item?.title}
										</div>
										<div className="text-red-500 font-bold text-lg mt-1">
											{Number(item?.price) === 0
												? 'Liên hệ'
												: item?.price && formatPrice( item?.price, 'VND' )}
										</div>
										<button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded flex items-center justify-center space-x-1">
											<i className="bi bi-cart" />
											<span>Thêm vào giỏ</span>
										</button>
									</div>
								))
							)}
						</div>
						{/* Pagination */}
						<div className="pagination-component">

							<select id="pageSize" value={params?._limit} onChange={handlePageSizeChange}
								className='mr-2'
							>
								{pageSizeOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
								))}
							</select>

							<ReactPaginate
								previousLabel={'← Trước'}
								nextLabel={'Tiếp →'}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageCount={totalPages}
								marginPagesDisplayed={2}
								pageRangeDisplayed={3}
								onPageChange={handlePageClick}
								containerClassName={'pagination'}
								activeClassName={'active'}
							/>
						</div>
						{/*  */}
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default CategoriesPage;
