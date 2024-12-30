import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productActions";

const ProductTable = () => {
	const { products, loading, error } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleDelete = (id) => {
		// dispatch()
		console.log(id);
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	return (
		<>
			<table className="table table-bordered table-striped">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td>{item.price}</td>
							<td>{item.description}</td>
							<td>
								<button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProductTable;
