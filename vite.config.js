import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import inject from '@rollup/plugin-inject';
import nodePolyfills from "rollup-plugin-node-polyfills";
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'Isolation',
			configureServer: (server) => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					next();
				});
			}
		}
	],
	optimizeDeps: {
		include: ['@solana/web3.js', 'buffer'],
		esbuildOptions: {
			target: 'esnext',
			plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
			define: {
				global: 'globalThis'
			}
		},
	},
	resolve: {
		alias: {
			$utils: path.resolve('src/utils/'),
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
			URL: "url"
		},
	},
	define: {
		'process.env.BROWSER': true,
		'process.env.NODE_DEBUG': JSON.stringify(''),
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true
		},
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] }), nodePolyfills({ crypto: true })],
		},
	},
	server: {
		proxy: {
			'/mini-games': {
				target: 'https://storage.googleapis.com',
				changeOrigin: true,
				bypass: (req, res, opts) => {
					if (req.method !== 'GET') return req.url;
				},
				rewrite: (path) => path.replace('/mini-games', '/yalgamers-minigames')
			}
		},
		port: 2000
	}
});
