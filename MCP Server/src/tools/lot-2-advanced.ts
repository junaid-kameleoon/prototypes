import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { featureFlags } from '../data/mock-db.js';

export const lot2Tools: Tool[] = [
    {
        name: 'kameleoon_delete_feature_flag',
        description: 'Delete a feature flag.',
        inputSchema: {
            type: 'object',
            properties: {
                key: { type: 'string', description: 'The key of the feature flag to delete' },
            },
            required: ['key'],
        },
    },
    {
        name: 'kameleoon_cleanup_stale_flags',
        description: 'Identify and cleanup stale feature flags.',
        inputSchema: {
            type: 'object',
            properties: {
                dryRun: { type: 'boolean', description: 'If true, only list flags to be deleted' },
            },
        },
    },
];

export async function handleLot2ToolCall(name: string, args: any) {
    switch (name) {
        case 'kameleoon_delete_feature_flag': {
            const index = featureFlags.findIndex((f) => f.key === args.key);
            if (index === -1) {
                throw new Error(`Feature flag '${args.key}' not found`);
            }
            const deleted = featureFlags.splice(index, 1);
            return {
                content: [{ type: 'text', text: `Deleted feature flag: ${deleted[0].name}` }],
            };
        }

        case 'kameleoon_cleanup_stale_flags': {
            const staleFlags = featureFlags.filter((f) => f.tags.includes('cleanup-candidate') || f.tags.includes('legacy'));
            if (args.dryRun) {
                return {
                    content: [{ type: 'text', text: `Found ${staleFlags.length} stale flags:\n${staleFlags.map(f => `- ${f.key} (${f.name})`).join('\n')}` }],
                };
            }
            // Perform cleanup
            const initialCount = featureFlags.length;
            for (const flag of staleFlags) {
                const idx = featureFlags.indexOf(flag);
                if (idx > -1) featureFlags.splice(idx, 1);
            }
            return {
                content: [{ type: 'text', text: `Cleaned up ${initialCount - featureFlags.length} flags.` }],
            };
        }

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
