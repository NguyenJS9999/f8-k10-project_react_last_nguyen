import './ProductTable.scss';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import { fetchProducts, removeProduct } from "../../../features/products/productActions";
import AtomLoading from "../../../compoents/atoms/AtomLoading/atomLoading";

const ProductTable = () => {
	const { products, loading, error, message } = useSelector((state) => state.products);

	const dispatch = useDispatch();
	const nav = useNavigate();


	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	// const handleDelete = (id) => {
	// 	// dispatch()
	// 	console.log(id);
	// };
	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>{error}</p>;

	useEffect(() => {
		dispatch(fetchProducts());
	},[dispatch]);
	// Update
	const handleUpdate = (item) => {
		if (item) {
			nav(`/admin/product/update/${item.id}`);
		}
	};

	const handleRequestDeletePro = (id) => {
		const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này không?");
		if (id && isConfirmed) {
			dispatch(removeProduct(id))
			toast.success(message);
		}
	}

	if (error) return <p>{error}</p>;

	return (
		<>
			<div className="text-center pz-3">Admin Product Table</div>
			<table className="table table-bordered table-striped mt-4">
				<thead>
					<tr className="text-center">
						<th>
							<input
								className="product-table-form-check-input"
								type="checkbox"
								// checked={selectedIds.includes(item?.id)}
								// onChange={() => handleCheckboxChange(item?.id)}
							/>
						</th>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						loading ? <tr><td><AtomLoading /></td></tr>
							:
							products &&
							products.map((item,index) => (
								<tr key={item?.id ?? index}>

									<td>
										<input
											className="form-check-input"
											type="checkbox"
											// checked={selectedIds.includes(item?.id)}
											// onChange={() => handleCheckboxChange(item?.id)}
										/>
									</td>
									<th scope="row">{item?.id}</th>
									<td>{item?.title}</td>
									<td>
										<span className='content-truncate'>
											{item?.description !== '' ? 'Description' : '--'}
										</span>
									</td>
									<td>{item?.price}</td>
									<td>
										<div className="flex-1 h-100 d-flex justify-content-center  gap-2">
											<button className="btn btn-success mx-2"
												onClick={() => {
													item?.id && handleUpdate(item);
												}}
											>
												Edit
											</button>

											<button
												className="btn btn-danger"
												onClick={() => {
													item.id && handleRequestDeletePro(+(item.id));
												}}
											>
												Remove
											</button>

										</div>
									</td>
								</tr>
							))

					}

				</tbody>
			</table>
			<ToastContainer />
		</>
	);
};

export default ProductTable;
