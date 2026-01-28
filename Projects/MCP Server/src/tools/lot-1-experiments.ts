import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { experiments } from '../data/mock-db.js';

export const lot1Tools: Tool[] = [
    {
        name: 'kameleoon_list_experiments',
        description: 'List all experiments.',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'kameleoon_get_experiment_results',
        description: 'Get results for a specific experiment.',
        inputSchema: {
            type: 'object',
            properties: {
                id: { type: 'number', description: 'The ID of the experiment' },
            },
            required: ['id'],
        },
    },
    {
        name: 'kameleoon_create_experiment',
        description: 'Create a new experiment (Mock).',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Name of the experiment' },
                variations: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of variation names'
                },
            },
            required: ['name', 'variations'],
        },
    },
];

export async function handleLot1ToolCall(name: string, args: any) {
    switch (name) {
        case 'kameleoon_list_experiments':
            return {
                content: [{ type: 'text', text: JSON.stringify(experiments, null, 2) }],
            };

        case 'kameleoon_get_experiment_results': {
            const exp = experiments.find((e) => e.id === Number(args.id));
            if (!exp) {
                throw new Error(`Experiment '${args.id}' not found`);
            }
            return {
                content: [{ type: 'text', text: JSON.stringify(exp.results, null, 2) }],
                widget: {
                    name: 'experimentResults',
                    data: {
                        experimentName: exp.name,
                        status: exp.status,
                        totalVisitors: exp.results.visitors,
                        variations: [
                            { name: 'Baseline', conversionRate: 3.8, isWinning: false, confidence: 0, conversions: 3200 },
                            { name: 'Variation A', conversionRate: exp.results.improvement > 0 ? 5.3 : 3.2, isWinning: exp.results.improvement > 0, confidence: exp.results.confidence, conversions: 4500 }
                        ]
                    }
                }
            };
        }

        case 'kameleoon_create_experiment': {
            // Mock creation
            const newExp = {
                id: Math.floor(Math.random() * 100000),
                name: args.name,
                status: 'draft',
                variations: args.variations.map((v: string, i: number) => ({ id: i, name: v })),
                results: { visitors: 0, conversions: 0, improvement: 0, confidence: 0 }
            };
            experiments.push(newExp as any); // Add to mock DB
            return {
                content: [{ type: 'text', text: `Experiment created successfully: ${JSON.stringify(newExp, null, 2)}` }],
            };
        }

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
