import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react()
		// Nếu dùng TypeScript: tsconfigPaths(),
	],
	// resolve: {
	// 	alias: {
	// 		'@': path.resolve(__dirname, './src') // Tạo alias cho đường dẫn ./src
	// 	}
	// },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '/src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	}
});

// const { defineConfig } = require('vite');
// const react = require('@vitejs/plugin-react-swc');
// const path = require('path');
//
// module.exports = defineConfig({
//   plugins: [
//     react()
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src')
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         api: 'modern-compiler'
//       }
//     }
//   }
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import path from 'path';
//
// // Sử dụng import.meta.url để thay thế __dirname
// export default defineConfig({
// 	plugins: [react()],
// 	// resolve: {
// 	// 	alias: {
// 	// 		'@': path.resolve(new URL('.', import.meta.url).pathname, './src') // Sử dụng ES Modules
// 	// 	}
// 	// },
// 	resolve: {
// 		alias: {
// 			'@': path.resolve(__dirname, '/src')
// 		}
// 	},
// 	css: {
// 		preprocessorOptions: {
// 			scss: {
// 				api: 'modern-compiler'
// 			}
// 		}
// 	}
// });
