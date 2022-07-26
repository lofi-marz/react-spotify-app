/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable @typescript-eslint/no-var-requires

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                title: ['Poppins', ...defaultTheme.fontFamily.sans],
                text: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.red[500],
                secondary: colors.pink[500],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    ['auto-fill-cols']: (value) => ({
                        gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
                    }),
                },
                { values: defaultTheme.spacing }
            );
        }),
    ],
};
