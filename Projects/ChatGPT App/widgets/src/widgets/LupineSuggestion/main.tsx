import React from 'react';
import ReactDOM from 'react-dom/client';
import LupineSuggestion from './index';

const mockSuggestionData = {
    lever: 'Comprehension',
    hypothesis: 'Simplifying the hero headline will reduce cognitive load and improve first-glance understanding.',
    evidence: 'User testing showed that 40% of fresh visitors could not identify our core value proposition within 5 seconds of landing.',
    confidenceScore: 88
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LupineSuggestion {...mockSuggestionData} />
    </React.StrictMode>
);
