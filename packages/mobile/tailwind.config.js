module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    important: true,
    theme: {
        extend: {
            colors: {
                'color-primary': 'var(--color-primary)',
                'color-secondary': 'var(--color-secondary)',
            },
        },
        screens: {
            xs: { max: '575px' },
            sm: { min: '576px', max: '767px' },
            md: { min: '768px', max: '991px' },
            lg: { min: '992px', max: '1199px' },
            xl: { min: '1200px', max: '1599px' },
            xxl: { min: '1600px' },
        },
    },
};
