import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                innerlightblue: '#75B9BE',
                innerdarkblue: '#37515F',
                innergreen: '#D0D5B5',
                innerred: '#F9B5AC',
                innerpurple: '#EDC9FF',
            }
        },
    },

    plugins: [forms],
};
