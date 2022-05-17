module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    important: true,
    theme: {
        extend: {
            colors: {
                'primary-color': 'var(--primary-color)',
                'secondary-color': 'var(--secondary-color)',
            },
        },
    },
};
