import React from 'react';
import './styles.css';

interface VariationData {
    name: string;
    conversions: number;
    conversionRate: number;
    isWinning: boolean;
    confidence: number;
}

interface ExperimentProps {
    experimentName: string;
    status: string;
    totalVisitors: number;
    variations: VariationData[];
}

const ExperimentResults: React.FC<ExperimentProps> = ({ experimentName, status, totalVisitors, variations }) => {
    return (
        <div className="kameleoon-widget experiment-dashboard">
            <div className="widget-header">
                <img src="https://static.kameleoon.com/images/favicon.ico" alt="Kameleoon" className="logo" />
                <span className={`status-badge ${status.toLowerCase()}`}>{status.toUpperCase()}</span>
            </div>

            <div className="widget-content">
                <h3>{experimentName}</h3>
                <p className="visitor-count">{totalVisitors.toLocaleString()} Total Visitors</p>

                <div className="variations-list">
                    {variations.map((v, i) => (
                        <div key={i} className={`variation-item ${v.isWinning ? 'is-winning' : ''}`}>
                            <div className="variation-meta">
                                <span className="var-name">{v.name}</span>
                                {v.isWinning && <span className="winner-label">WINNING</span>}
                            </div>

                            <div className="var-stats">
                                <div className="rate-info">
                                    <span className="rate-val">{v.conversionRate}%</span>
                                    <span className="rate-label">Conv. Rate</span>
                                </div>
                                {v.isWinning && (
                                    <div className="confidence-info">
                                        <span className="conf-val">{v.confidence}%</span>
                                        <span className="conf-label">Probability</span>
                                    </div>
                                )}
                            </div>

                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${v.conversionRate * 5}%` }} // Scaling for visual representation
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="widget-footer">
                <button className="view-full-btn">Open in Dashboard →</button>
            </div>
        </div>
    );
};

export default ExperimentResults;
