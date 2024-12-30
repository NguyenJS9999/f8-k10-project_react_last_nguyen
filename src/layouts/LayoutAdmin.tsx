// import React from 'react'

import { Link,Outlet } from "react-router-dom"

const LayoutAdmin = () => {
    return (
        <>

            <ul className="nav">
                {/* disabled */}
                <li className="nav-item">
                    <Link className="nav-link" to="/admin">DashBoad</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="products">Product table</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="product/add">Add product</Link>
                </li>
            </ul>

            <Outlet />
        </>
    )
}

export default LayoutAdmin