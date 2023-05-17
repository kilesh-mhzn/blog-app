const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        container: {
            padding: 0,
            center: true,
        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },
        extend: {
            colors: {
                app_dark: {
                    DEFAULT: '#1a1a1a',
                    '100': '#232323',
                    '200': '#3a3a3a',
                    '300': '#464646',
                },
                primary: '#415a77',
                secondary: '#778da9',
                body: '#F8F8F8',
                danger: '#e63946',
                darkPrimary: '#0d1b2a',
                darkSecondary: '#1b263b',
                sky: colors.sky,
                cyan: colors.cyan,
                background: '#f7f9fc',
            },
            gridTemplateColumns: {
                'kanban': 'repeat(auto-fit, 300px)',
            },
        },
    },
    plugins: [],
};
