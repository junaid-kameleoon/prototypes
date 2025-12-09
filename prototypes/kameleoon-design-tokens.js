/**
 * Kameleoon Design Tokens
 * Extracted from https://app.kameleoon.com/featureFlags/dashboard/overview
 * Date: 2025-12-05
 */

const kameleoonTokens = {
    colors: {
        primary: '#3838E7', // Extracted primary blue
        'primary-hover': '#2b2bb5', // Darker shade for hover
        background: '#FAFAFA', // Main dashboard background
        surface: '#FFFFFF', // Card/Container background
        sidebar: '#181B21', // Sidebar dark background
        text: '#000000', // Primary text
        'text-secondary': '#555555', // Secondary text
        'text-on-dark': '#FFFFFF', // Text on sidebar/dark backgrounds
    },
    fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
    borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
    },
    boxShadow: {
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    }
};

// Tailwind Configuration Object
// You can use this directly in your tailwind.config.js or inject it via script
const tailwindKameleoonConfig = {
    theme: {
        extend: {
            colors: kameleoonTokens.colors,
            fontFamily: kameleoonTokens.fontFamily,
            borderRadius: kameleoonTokens.borderRadius,
            boxShadow: kameleoonTokens.boxShadow,
        }
    }
};

if (typeof module !== 'undefined') {
    module.exports = { kameleoonTokens, tailwindKameleoonConfig };
}
