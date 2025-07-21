import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MyNextjsLibrary',
            formats: ['es', 'umd'],
            fileName: (format) => {
                if (format === 'es') return 'my-nextjs-library.js'
                if (format === 'umd') return 'my-nextjs-library.umd.cjs'
                return `my-nextjs-library.${format}.js`
            }
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'next'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    next: 'Next'
                }
            }
        },
        outDir: 'dist',
        sourcemap: true,
        minify: true,
        cssCodeSplit: false
    }
})
