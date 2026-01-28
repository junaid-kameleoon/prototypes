import React from 'react';
import ReactDOM from 'react-dom/client';
import ExperimentResults from './index';

const mockExperimentData = {
    experimentName: 'Checkout Flow Optimization',
    status: 'Running',
    totalVisitors: 84200,
    variations: [
        {
            name: 'Baseline',
            conversions: 3200,
            conversionRate: 3.8,
            isWinning: false,
            confidence: 0
        },
        {
            name: 'Variation A (One-page)',
            conversions: 4500,
            conversionRate: 5.3,
            isWinning: true,
            confidence: 98.4
        }
    ]
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ExperimentResults {...mockExperimentData} />
    </React.StrictMode>
);
