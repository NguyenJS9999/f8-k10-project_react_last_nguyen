import './LayoutAdmin.scss';
import { Link, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
const { Footer } = Layout;


const LayoutAdmin = () => {

	const [auth] = useState(false); // setAuth

	useEffect(() => {
		if (!auth) {
			return;
		}
	}, [auth]);

	return (
		<>
			{/* disabled */}
			{/* <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/admin">DashBoad</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="products">Product table</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="product/add">Add product</Link>
                </li>
            </ul> */}

			<div className="admin-page">

				<div className="admin-header">
					<Link to={'/admin'} className="admin-logo">
						Admin
					</Link>

					<div className="admin-header-action">
						<div className="admin-header-action-item">
							<button className="admin-theme">
								<i className="fa-regular fa-sun"></i>
								{/* <i className="fa-regular fa-moon"></i> */}
							</button>
						</div>

						<div className="admin-header-action-item">
							<i className="fa-solid fa-user auth-admin" />
						</div>

						<button className="admin-header-action-item">
							{auth ? (
								<span>Đăng xuất</span>
							) : (
								<span>Đăng nhập</span>
							)}
						</button>
					</div>
				</div>

				<div className="admin-content-wrap">
					{/* <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>
							<li className="nav-item">
								<Link className="nav-link" to="/admin">
									DashBoad
								</Link>
							</li>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<li className="nav-item">
								<Link className="nav-link" to="products">
									Product table
								</Link>
							</li>
						</Breadcrumb.Item>

						<Breadcrumb.Item>
							<li className="nav-item">
								<Link className="nav-link" to="product/add">
									Add product
								</Link>
							</li>
						</Breadcrumb.Item>
					</Breadcrumb> */}

					<div className="row">

						<div className="col-2 admin-nav">
							<div className="nav-item">
								<Link className="nav-link" to="/admin">
									DashBoad
								</Link>
							</div>
							<div className="nav-item">
								<Link className="nav-link" to="products">
									Product table
								</Link>
							</div>
							<div className="nav-item">
								<Link className="nav-link" to="product/add">
									Add product
								</Link>
							</div>
						</div>

						<div className="col-10 admin-main-content">
							<Outlet />
						</div>
					</div>
				</div>

				<Footer
					style={{ textAlign: 'center' }}
					className="footer-admin"
				>
					TechsoundVn Design ©{new Date().getFullYear()} Created by
					TechsoundVn UED
				</Footer>
			</div>
		</>
	);
};

export default LayoutAdmin;
