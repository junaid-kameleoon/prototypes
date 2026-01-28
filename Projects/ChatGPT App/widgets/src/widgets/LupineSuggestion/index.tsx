import React from 'react';
import './styles.css';

interface SuggestionProps {
    hypothesis: string;
    evidence: string;
    lever: string;
    confidenceScore: number;
}

const LupineSuggestion: React.FC<SuggestionProps> = ({ hypothesis, evidence, lever, confidenceScore }) => {
    return (
        <div className="kameleoon-widget lupine-card">
            <div className="widget-header">
                <div className="lupine-brand">
                    <span className="sparkle-icon">✨</span>
                    <span className="brand-name">Lupine AI</span>
                </div>
                <div className="score-badge">
                    <span className="score-label">CONFIDENCE</span>
                    <span className="score-value">{confidenceScore}%</span>
                </div>
            </div>

            <div className="widget-content">
                <div className="lever-tag">{lever.toUpperCase()}</div>
                <h3>{hypothesis}</h3>

                <div className="evidence-section">
                    <label>Supporting Evidence</label>
                    <p>{evidence}</p>
                </div>
            </div>

            <div className="widget-actions">
                <button className="apply-btn">Apply to Kameleoon</button>
                <button className="dismiss-btn">Dismiss</button>
            </div>
        </div>
    );
};

export default LupineSuggestion;
