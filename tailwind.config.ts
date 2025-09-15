import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#FFFFFF',
                primary: '#1A202C',
                accent: '#2B6CB0',
                highlight: '#81E6D9',
                secondary: '#4A5568',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
export default config