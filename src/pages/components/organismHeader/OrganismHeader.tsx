import './OrganismHeader.scss';
import { Link, NavLink } from 'react-router-dom';

function OrganismHeader() {
	return (
		<>
			<div className="header-component">
				<div className="header-top">
					<div className="header-top-inner"></div>
				</div>
				<div className="header-main">
					<div className="container">
						<div className="header-main-inner">
							<div className="header-logo">
								<Link to="/">Todo</Link>
							</div>
							<div className="header-search-desktop">
								<div className="form-search-control">
									<div className="form-search">
										<span className="header-search-back d-lg-none d-xl-none">
											<i className="fa-light fa-xmark" />
										</span>
										{/* <span className="header-search-icon"></span> */}
										<input
											autoComplete="off"
											type="text"
											name="search-all"
											className="form-control"
											placeholder="Nhập từ khoá tìm kiếm"
											id="search-all"
										/>
										<button
											id="search-btn"
											className="search-btn"
											type="button"
										>
											<i className="fa-solid fa-magnifying-glass" />
										</button>
									</div>
								</div>
							</div>
							{/* https://toshiko.vn/gio-hang */}
							<div className="header-right-item" id="cart-item">
								<a href="./src/pages/cart/cart.html">
									<span className="hri-icon">
										<i className="fa-solid fa-cart-arrow-down" />
										<span className="cart-qty">1</span>
									</span>
									<div className="hri-content">
										{/* <span className="label"><span className="cart-qty">1</span> sản phẩm</span> */}
									</div>
								</a>
							</div>

							{/* {userInforState ? (
							<div className="" id="auth-infor">
								<div className=" ">
									{userInforState?.name ?? 'Name'}
								</div>
								<button className="btn" onClick={handleLogout}>
									<i className="fa-solid fa-arrow-right-from-bracket"></i>
								</button>
							</div>
						) : (
							<div
								className="header-right-item"
								id="auth-item"
								onClick={handleLogin}
							>
								<a>
									<div className="hri-content">
										<i className="fa-regular fa-user" />
									</div>
								</a>
							</div>
						)} */}
						</div>
					</div>
				</div>
				{/* Danh mục - banners */}
				<div className="header-bottom">
					<div className="container">
						<div className="header-nav">
							<ul className="megamenu">
								<li className="item-category">
									<NavLink to="/">Home</NavLink>
								</li>
								<li className="item-category">
									<NavLink to="/admin">Admin</NavLink>
								</li>

							</ul>
						</div>
					</div>
				</div>
				{/*  */}
			</div>
		</>
	);
}

export default OrganismHeader;