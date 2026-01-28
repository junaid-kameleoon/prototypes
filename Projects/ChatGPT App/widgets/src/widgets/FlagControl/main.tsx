import React from 'react';
import ReactDOM from 'react-dom/client';
import FlagControl from './index';

// In a real app, these props would be passed from ChatGPT via a URL param or global object
const mockProps = {
    name: 'Search Bar Redesign Pilot',
    flagKey: 'search-redesign-v2',
    status: true,
    environment: 'production'
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FlagControl {...mockProps} />
    </React.StrictMode>
);
