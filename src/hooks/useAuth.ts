import { useState, useEffect } from 'react';

interface User {
	id: number;
	name: string;
	role: string; // "admin" hoặc "user"
}

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const [user, setUser] = useState<User | null>(null);
	const [user, setUser] = useState<User | null>({ id: 1, name: 'Nguyen', role: 'admin' });

	useEffect(() => {
		// Giả lập kiểm tra token và lấy thông tin người dùng
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
			setUser({ id: 1, name: 'Nguyen', role: 'admin' });
		}
	}, []);

	return { isAuthenticated, user };
};

export default useAuth;
