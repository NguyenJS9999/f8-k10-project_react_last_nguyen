// import React from 'react';
import { Outlet } from 'react-router-dom';
import OrganismHeader from '../compoents/organisms/organismHeader/OrganismHeader';
import OrganismsFooter from '../compoents/organisms/organismsFooter/organismsFooter';

function ClientLayout() {
	return (
		<>
			<OrganismHeader />
				<Outlet />
			<OrganismsFooter />
		</>
	);
}

export default ClientLayout;