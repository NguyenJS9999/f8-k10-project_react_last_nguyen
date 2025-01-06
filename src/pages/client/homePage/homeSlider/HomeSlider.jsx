// import React from 'react'
import Slider from "react-slick";
function HomeSlider() {
	const sliderSettings = {
		dots: true, // Hiển thị nút điều hướng
		infinite: true, // Vòng lặp vô hạn
		speed: 500, // Tốc độ chuyển đổi (ms)
		slidesToShow: 1, // Số slide hiển thị
		slidesToScroll: 1, // Số slide cuộn mỗi lần
		autoplay: true, // Tự động chạy slider
		autoplaySpeed: 3000, // Tốc độ tự động chuyển đổi
		responsive: [
			{
				breakpoint: 768, // Với màn hình nhỏ hơn 768px
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 1024, // Với màn hình nhỏ hơn 1024px
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	};

	const images = [
		{
			id: 1,
			src: 'https://theme.hstatic.net/200000568629/1000933089/14/slider_1.jpg?v=352',
			title: ''
		},
		{
			id: 2,
			src: 'https://file.hstatic.net/200000568629/file/sharkware-1-768x768_53e4ea75992c477da97500bf3fdb632d.png',
			title: ''
		},
		{
			id: 3,
			src: 'https://file.hstatic.net/200000568629/file/lea_professional_amplifier__1__c088ec454e654f5b92e28945b6efa538.png',
			title: ''
		},
		{
			id: 4,
			src: 'https://file.hstatic.net/200000568629/file/4acoustic_cec242a6dcf347798ee07ac5d75eaa61.jpeg',
			title: ''
		},
		{
			id: 5,
			src: 'https://file.hstatic.net/200000568629/file/a_thu6_323c0babda1f471ba83253c7d3f23c88.jpg',
			title: ''
		}
	];
	return (
		<>
			<Slider {...sliderSettings}>
				{images.map(image => (
					<div key={image.id} className="px-2">
						<div
							className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100"
							style={{ aspectRatio: '16/9' }}
						>
							<img
								src={image.src}
								alt={image.title}
								className="object-cover w-full h-full"
							/>
							<div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2">
								{image.title}
							</div>
						</div>
					</div>
				))}
			</Slider>
		</>
	);
}

export default HomeSlider;
