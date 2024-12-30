import { useDispatch,useSelector } from "react-redux";
import { AppDispatch,RootState } from "../../store/store";
import { useEffect } from "react";
import { ToastContainer,toast } from 'react-toastify';

import { fetchProducts,removeProduct } from "../../features/products/productActions";
import { IProduct } from "../../interfaces/IProduct";
import AtomLoading from "../components/atoms/atomLoading/AtomLoading";
import { Link, useNavigate, } from "react-router-dom";

const ProductTable = () => {
	const dispatch = useDispatch<AppDispatch>();
	const nav = useNavigate();
	const { products,loading,error, message } = useSelector((state: RootState) => state.products);


	useEffect(() => {
		dispatch(fetchProducts());
	},[dispatch]);
	// Update
	const handleUpdate = (item: IProduct) => {
		if (item) {
			nav(`/admin/product/update/${item.id}`);
		}
	};

	const handleRequestDeletePro = (id: number) => {
		const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này không?");
		if (id && isConfirmed) {
			dispatch(removeProduct(id))
			toast.success(message);
		}
	}

	// if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;


	return (
		<div className="container">
			<h1>Quản trị sản phẩm</h1>

			<div className="product-Page-action w-100">
				<Link to={`/admin/product/add`} className="btn btn-primary">
					Add Product
				</Link>
			</div>
			{/*  */}
			<table className="table table-striped table-bordered my-3">
				<thead>
					<tr>
						<th>
							<input
								type="checkbox"
									// onChange={handleSelectAll}
									// checked={selectedIds.length === products.length}
							/>
						</th>
						<th scope="col">ID</th>
						<th scope="col">title</th>
						<th scope="col">decription</th>
						<th scope="col">price</th>
						<th scope="col">action</th>
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
											type="checkbox"
											// checked={selectedIds.includes(item?.id)}
											// onChange={() => handleCheckboxChange(item?.id)}
										/>
									</td>
									<th scope="row">{item?.id}</th>
									<td>{item?.title}</td>
									<td>
										{item?.description !== ''
											? item?.description
											: '--'}
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
			{/*  */}
			<ToastContainer />
		</div>
	);
};

export default ProductTable;
