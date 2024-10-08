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
                innerlightbluefade: 'rgba(117, 185, 190, 0.3)',
                innerdarkblue: '#37515F',
                innerdarkbluefade: 'rgba(55, 81, 95, 0.3)',
                innergreen: '#D0D5B5',
                innergreenfade: 'rgba(208, 214, 181, 0.3)',
                innerred: '#F9B5AC',
                innerredfade: 'rgba(249, 181, 172, 0.3)',
                innerpurple: '#EDC9FF',
                innerpurplefade: 'rgba(217, 195, 227, 0.3)',
            }
        },
    },

    plugins: [forms],
};
