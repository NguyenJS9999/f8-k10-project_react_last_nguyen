// import React from 'react'
import { lazy,Suspense } from "react";
import RegisterPage from "../pages/admin/RegisterPage";
import LoginPage from "../pages/admin/LoginPage";
// import useAuth from "../hooks/useAuth";
import { useRoutes } from "react-router-dom";
import AtomLoading from "../pages/components/atoms/atomLoading/AtomLoading";
// Lazy load các thành phần
const ClientLayout = lazy(() => import("../layouts/ClientLayout"));
const LayoutAdmin = lazy(() => import("../layouts/LayoutAdmin"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ProductTable = lazy(() => import("../pages/admin/ProductTable"));
const ProductForm = lazy(() => import("../pages/admin/productForm/ProductForm"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// HOC: Yêu cầu quyền đăng nhập
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    // const { isAuthenticated } = useAuth();
    // console.log('RequireAuth isAuthenticated: ',isAuthenticated);
    return children;
    // return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// HOC: Kiểm tra quyền admin
const RequireAdmin = ({ children }: { children: JSX.Element }) => {
    // const { user } = useAuth();
    // console.log('RequireAdmin user: ',user);
    return children;
    // return user?.role === "admin" ? children : <Navigate to="/" replace />;
};
const AppRouters = () => {
    const routes = [
        {
            path: "/",
            element: (
                <Suspense fallback={<AtomLoading />}>
                    <ClientLayout />
                </Suspense>
            ),
            children: [
                { path: "/",element: <HomePage /> },
                { path: "/about",element: <AboutPage /> },
            ],
        },
        {
            path: "/register",
            element: (
                <Suspense fallback={<AtomLoading />}>
                    <RegisterPage />
                </Suspense>
            ),
        },
        {
            path: "/login",
            element: (
                <Suspense fallback={<AtomLoading />}>
                    <LoginPage />
                </Suspense>
            ),
        },
        {
            path: "/admin",
            element: (
                <RequireAuth>
                    <RequireAdmin>
                        <Suspense fallback={<AtomLoading />}>
                            <LayoutAdmin />
                        </Suspense>
                    </RequireAdmin>
                </RequireAuth>
            ),
            children: [
                {
                    path: "products",
                    element: (
                        <Suspense fallback={<AtomLoading />}>
                            <ProductTable />
                        </Suspense>
                    ),
                },
                {
                    path: "product/add",
                    element: (
                        <Suspense fallback={<AtomLoading />}>
                            <ProductForm />
                        </Suspense>
                    ),
                },
                {
                    path: "product/update/:id",
                    element: (
                        <Suspense fallback={<AtomLoading />}>
                            <ProductForm />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: (
                <Suspense fallback={<AtomLoading />}>
                    <NotFoundPage />
                </Suspense>
            ),
        },
    ];
    return (<div className="pages-layout container">
        {useRoutes(routes)}
    </div>)

};

export default AppRouters;