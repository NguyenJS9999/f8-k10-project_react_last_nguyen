import './MoleculeSearchBar.scss';

// import React from 'react'

import { useState } from 'react';
import PropTypes from 'prop-types';

const MoleculeSearchBar = ({ onSearch }) => {
	const [search, setSearch] = useState('');

	const handleSearch = () => {
		onSearch(search);
	};

	return (
		<>
			<input
				type="text"
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder="Tìm kiếm sản phẩm..."
				// className="search-bar-component"
			/>
			<button onClick={handleSearch}>Tìm kiếm</button>
		</>
	);
};
MoleculeSearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired
};

export default MoleculeSearchBar;
