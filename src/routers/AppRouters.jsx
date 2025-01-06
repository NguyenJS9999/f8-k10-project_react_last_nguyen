// import React from 'react'
import { lazy, Suspense } from 'react';

// import useAuth from "@/hooks/useAuth";
import { useRoutes } from 'react-router-dom';
import AtomLoading from '../compoents/atoms/AtomLoading/atomLoading.jsx';

import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage';
import ProductsPage from '../pages/client/categoriesPage/CategoriesPage.jsx';
import ProducDetailPage from '../pages/client/productDetail/ProducDetailPage.jsx';
// Lazy load các thành phần
const ClientLayout = lazy(() => import('../layouts/ClientLayout'));
const AdminLayout = lazy(() => import('../layouts/adminLayout/AdminLayout.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));
// Client
const HomePage = lazy(() => import('../pages/client/homePage/HomePage.jsx'));
const AboutPage = lazy(() => import('../pages/client/aboutPage/AboutPage'));
// Admin
const ProductTable = lazy(() => import('../pages/admin/productTable/ProductTable.jsx'));
const ProductForm = lazy(() => import('../pages/admin/productForm/ProductForm'));

// HOC: Yêu cầu quyền đăng nhập
const RequireAuth = ({ children }) => {
	// const { isAuthenticated } = useAuth();
	// console.log('RequireAuth isAuthenticated: ',isAuthenticated);
	return children;
	// return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// HOC: Kiểm tra quyền admin
const RequireAdmin = ({ children }) => {
	// const { user } = useAuth();
	// console.log('RequireAdmin user: ',user);
	return children;
	// return user?.role === "admin" ? children : <Navigate to="/" replace />;
};
const AppRouters = () => {
	const routes = [
		{
			path: '/',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<ClientLayout />
				</Suspense>
			),
			children: [
				{ path: '/', element: <HomePage /> },
				{ path: '/about', element: <AboutPage /> },
				{ path: '/collections/:slug', element: <ProductsPage /> },
				{ path: '/products/:id', element: <ProducDetailPage /> },
			]
		},
		// Auth
		{
			path: '/register',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<RegisterPage />
				</Suspense>
			)
		},
		{
			path: '/login',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<LoginPage />
				</Suspense>
			)
		},
		// ADMIN
		{
			path: '/admin',
			element: (
				<RequireAuth>
					<RequireAdmin>
						<Suspense fallback={<AtomLoading />}>
							<AdminLayout />
						</Suspense>
					</RequireAdmin>
				</RequireAuth>
			),
			children: [
				{
					path: 'products',
					element: (
						<Suspense fallback={<AtomLoading />}>
							<ProductTable />
						</Suspense>
					)
				},
				{
					path: 'product/add',
					element: (
						<Suspense fallback={<AtomLoading />}>
							<ProductForm />
						</Suspense>
					)
				},
				{
					path: 'product/update/:id',
					element: (
						<Suspense fallback={<AtomLoading />}>
							<ProductForm />
						</Suspense>
					)
				}
			]
		},
		// Other
		{
			path: '*',
			element: (
				<Suspense fallback={<AtomLoading />}>
					<NotFoundPage />
				</Suspense>
			)
		}
	];
	return <div className="pages-layout ">{useRoutes(routes)}</div>;
};

export default AppRouters;
