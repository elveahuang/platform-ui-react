module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    important: true,
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                'primary-color': 'var(--primary-color)',
                'secondary-color': 'var(--secondary-color)',
            },
        },
    },
};
