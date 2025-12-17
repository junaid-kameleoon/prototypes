import { CallToolRequest, ListToolsRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import { featureFlags } from '../data/mock-db.js';
import { z } from 'zod';

export const lot0Tools: Tool[] = [
    {
        name: 'kameleoon_list_feature_flags',
        description: 'List all feature flags with their current status and configuration.',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'kameleoon_get_feature_flag',
        description: 'Get detailed configuration for a specific feature flag.',
        inputSchema: {
            type: 'object',
            properties: {
                key: { type: 'string', description: 'The unique key of the feature flag' },
            },
            required: ['key'],
        },
    },
    {
        name: 'kameleoon_search_feature_flags',
        description: 'Search for feature flags by name, key, or tags.',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Search query string' },
            },
            required: ['query'],
        },
    },
];

export async function handleLot0ToolCall(name: string, args: any) {
    switch (name) {
        case 'kameleoon_list_feature_flags':
            return {
                content: [{ type: 'text', text: JSON.stringify(featureFlags, null, 2) }],
            };

        case 'kameleoon_get_feature_flag': {
            const flag = featureFlags.find((f) => f.key === args.key);
            if (!flag) {
                throw new Error(`Feature flag '${args.key}' not found`);
            }
            return {
                content: [{ type: 'text', text: JSON.stringify(flag, null, 2) }],
            };
        }

        case 'kameleoon_search_feature_flags': {
            const query = args.query.toLowerCase();
            const results = featureFlags.filter(
                (f) =>
                    f.key.toLowerCase().includes(query) ||
                    f.name.toLowerCase().includes(query) ||
                    f.tags.some((t) => t.toLowerCase().includes(query))
            );
            return {
                content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
            };
        }

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
