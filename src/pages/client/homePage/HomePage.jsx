import SubHeader from '../../../compoents/organisms/organismHeader/subHeader/SubHeader';
import './HomePage.scss';
import HomeSlider from './homeSlider/HomeSlider';
// import React from 'react'

const HomePage = () => {
	return (
		<>
			<div className="home-page">
				<div className="container">
					<div className="home-page-inner"></div>
					{/* Menu multi - Banner */}
					<div className="subheader container">
						<SubHeader />
						<div className="flex flex-col w-full md:w-3/4 bg-gray-100 p-1 rounded shadow-md">
							<HomeSlider />
						</div>
					</div>

					<div className="home-page-banner">
						<img
							src="https://cdn.shopify.com/s/files/1/0270/5873/9400/files/4acoustic-germany-banner_1920x.jpg?v=1632824958"
							alt=""
						/>
					</div>

					{/* Sản phẩm mới */}

					{/* Sản phẩm bán chạy */}

					{/* Sản phẩm khuyến mãi */}

					{/* Sản phẩm nổi bật */}

					{/* Sản phẩm xem nhiều */}

					{/* Sản phẩm cùng loại */}

					{/* Sản phẩm cùng thương hiệu */}

					{/* Sản phẩm cùng danh mục */}

					{/* Sản phẩm cùng nhà cung cấp */}

					{/* Sản phẩm cùng giá */}
				</div>
			</div>
		</>
	);
};

export default HomePage;
