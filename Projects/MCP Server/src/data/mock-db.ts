import { z } from 'zod';

// Types
export interface FeatureFlag {
    key: string;
    name: string;
    description: string;
    tags: string[];
    created_at: string;
    updated_at: string;
    status: 'active' | 'paused';
    variations: { key: string; name: string }[];
    rules: { environment: string; rollout: number }[];
}

export interface Experiment {
    id: number;
    name: string;
    status: 'active' | 'paused' | 'draft' | 'finished';
    variations: { id: number; name: string }[];
    results: {
        visitors: number;
        conversions: number;
        improvement: number;
        confidence: number;
    };
}

// Mock Data
export const featureFlags: FeatureFlag[] = [
    {
        key: 'new-checkout-flow',
        name: 'New Checkout Flow',
        description: 'Redesigned checkout process with fewer steps.',
        tags: ['checkout', 'payment', 'v2'],
        created_at: '2023-10-26T10:00:00Z',
        updated_at: '2023-11-01T14:30:00Z',
        status: 'active',
        variations: [
            { key: 'on', name: 'Enabled' },
            { key: 'off', name: 'Disabled' }
        ],
        rules: [
            { environment: 'production', rollout: 50 },
            { environment: 'staging', rollout: 100 }
        ]
    },
    {
        key: 'dark-mode-beta',
        name: 'Dark Mode Beta',
        description: 'Enable dark mode for beta testers.',
        tags: ['ui', 'beta'],
        created_at: '2023-11-10T09:00:00Z',
        updated_at: '2023-11-10T09:00:00Z',
        status: 'active',
        variations: [
            { key: 'on', name: 'Enabled' },
            { key: 'off', name: 'Disabled' }
        ],
        rules: [
            { environment: 'production', rollout: 10 }
        ]
    },
    {
        key: 'legacy-search-algo',
        name: 'Legacy Search Algorithm',
        description: 'Old search algorithm, kept for fallback.',
        tags: ['search', 'legacy', 'cleanup-candidate'],
        created_at: '2022-01-15T00:00:00Z',
        updated_at: '2022-06-20T00:00:00Z',
        status: 'paused',
        variations: [
            { key: 'on', name: 'Enabled' },
            { key: 'off', name: 'Disabled' }
        ],
        rules: []
    }
];

export const experiments: Experiment[] = [
    {
        id: 12345,
        name: 'Homepage Hero Banner Test',
        status: 'active',
        variations: [
            { id: 1, name: 'Original' },
            { id: 2, name: 'Video Background' },
            { id: 3, name: 'Carousel' }
        ],
        results: {
            visitors: 50000,
            conversions: 2500,
            improvement: 12.5,
            confidence: 98.5
        }
    },
    {
        id: 67890,
        name: 'Pricing Page Layout',
        status: 'finished',
        variations: [
            { id: 1, name: 'Grid' },
            { id: 2, name: 'List' }
        ],
        results: {
            visitors: 12000,
            conversions: 400,
            improvement: -2.1,
            confidence: 85.0
        }
    }
];
