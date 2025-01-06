import './SubHeader.scss';
// import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SubHeader() {
	const nav = useNavigate();
	const categories = [
		{
			title: 'Dàn loa karaoke',
			slug: 'danloa-karaoke',
			subcategories: [
				{
					title: 'Dàn Karaoke 4Acoustic Germany',
					slug: 'dan-karaoke-4acoustic-germany'
				},
				{
					title: 'Dàn Karaoke NEXO',
					slug: 'dan-karaoke-nexo'
				},
				{
					title: 'Dàn Karaoke NSP Audio',
					slug: 'dan-karaoke-nsp-audio'
				}
			]
		},
		{
			title: 'Mẫu Loa cao cấp',
			slug: 'mau-loa-karaoke-hot',
			subcategories: [
				{ title: 'Loa Full 4Acoustic', slug: 'loa-full-4acoustic' },
				{ title: 'Loa Full NEXO', slug: 'loa-full-nexo' },
				{ title: 'Loa Full Martin', slug: 'loa-full-martin' },
				{ title: 'Loa Full NSP Audio', slug: 'loa-full-nsp-audio' },
				{
					title: 'Loa Full d&b Audiotechnik',
					slug: 'loa-full-d-b-audiotechnik'
				},
				{ title: 'Loa Full Adamson', slug: 'loa-full-adamson' }
			]
		},
		{
			title: 'Loa Subwoofer',
			slug: 'loa-subwoofer',
			subcategories: [
				{ title: 'Loa Subwoofer', slug: 'subwoofer' },
				{ title: 'Loa Sub NEXO', slug: 'loa-sub-nexo' },
				{ title: 'Loa Sub 4Acoustic', slug: 'loa-sub-4acoustic' },
				{ title: 'Loa Sub NSP Audio', slug: 'loa-sub-nsp-audio' },
				{ title: 'Loa Sub Martin', slug: 'loa-sub-martin' },
				{
					title: 'Loa Sub D&b Audiotechnik',
					slug: 'loa-sub-d-b-audiotechnik'
				},
				{ title: 'Loa Sub Adamson', slug: 'loa-sub-adamson' }
			]
		},
		{
			title: 'Cục Đẩy / Công Suất',
			slug: 'cuc-day-cong-suat',
			subcategories: [
				{ title: 'LEA Professional', slug: 'lea-professional' },
				{ title: '4Acoustic Germany', slug: '4acoustic-germany' },
				{ title: 'NEXO France', slug: 'nexo-france' },
				{ title: 'Cục đẩy Techsound', slug: 'cuc-day-techsound' }
			]
		},
		{
			title: 'Vang Số / Mixer / DSP',
			slug: 'vang-so-mixer-dsp',
			subcategories: [
				{ title: 'Vang Số', slug: 'vang-so' },
				{ title: 'Bàn Mixer', slug: 'ban-mixer' },
				{ title: 'DSP Crossover', slug: 'dsp-crossover' }
			]
		},
		{
			title: 'Microphone',
			slug: 'microphone',
			subcategories: [
				{
					title: 'Micro Karaoke cao cấp',
					slug: 'micro-karaoke-cao-cap'
				},
				{ title: 'Sennheiser', slug: 'sennheiser' },
				{ title: 'Shure', slug: 'shure' }
			]
		},
		{
			title: 'Loa Line Array',
			slug: 'loa-line-array',
			subcategories: [
				{ title: 'Loa Line Array', slug: 'loa-line-array' },
				{ title: 'Line Array 4acoustic', slug: 'line-array-4acoustic' },
				{ title: 'Line Array NEXO', slug: 'line-array-nexo' },
				{
					title: 'Loa Line Array Adamson',
					slug: 'loa-line-array-adamson'
				}
			]
		},
		{
			title: 'Quản lý nguồn điện',
			slug: 'quan-ly-nguon-dien'
			// subcategories: []
		},
		{ title: 'Youtube Video', slug: 'youtube-video' },
		{ title: 'Tiktok Video', slug: 'tiktok-video' }
	];

	const [activeTab, setActiveTab] = useState(null);

	const handleMouseEnter = index => {
		setActiveTab(index);
	};

	const handleMouseLeave = () => {
		setActiveTab(null);
	};

	const handleGetCategory = categorySlug => {
		// console.log('handleGetCategory categorySlug: ', categorySlug);
		nav(`/collections/${categorySlug}`);
	};

	return (
		<>
			{/* Menu đa cấp */}
            <div className="flex flex-col w-full md:w-1/4 bg-gray-100 p-1 rounded shadow-md multi-menu-component">
                {categories.map((category, index) => (
                    <div
                        key={category?.id ?? index}
                        className="relative group"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleGetCategory(category?.slug)}
                    >
                        {/* Danh mục chính */}
                        <div
                            className={`px-4 py-2 cursor-pointer rounded home-nav-item content-truncate ${
                                activeTab === index
                                    ? 'home-nav-item--active text-white'
                                    : 'bg-white hover:bg-gray-200'
                            }`}
                        >
                            {category.title}
                        </div>

                        {/* Danh mục con */}
                        {activeTab === index && (
                            <div className="absolute left-full top-0 bg-white shadow-md rounded p-2 w-max ">
                                <ul className="list-disc pl-6 space-y-2">
                                    {category.subcategories &&
                                        category.subcategories.map(
                                            (subcategory, idx) => (
                                                <li
                                                    key={
                                                        subcategory?.id ??
                                                        idx
                                                    }
                                                    className="hover:text-red-500 cursor-pointer pb-2"
                                                    onClick={e => {
                                                        e.stopPropagation(); // Ngăn chặn sự kiện "onClick" ở cha
                                                        handleGetCategory(
                                                            subcategory?.slug
                                                        );
                                                    }}
                                                >
                                                    {subcategory?.title}
                                                </li>
                                            )
                                        )}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

		</>
	);
}

export default SubHeader;
