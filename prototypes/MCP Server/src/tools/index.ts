import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { lot0Tools, handleLot0ToolCall } from './lot-0-flags.js';
import { lot1Tools, handleLot1ToolCall } from './lot-1-experiments.js';
import { lot2Tools, handleLot2ToolCall } from './lot-2-advanced.js';
import { lot3Tools, handleLot3ToolCall } from './lot-3-ai.js';

export const allTools: Tool[] = [
    ...lot0Tools,
    ...lot1Tools,
    ...lot2Tools,
    ...lot3Tools,
];

export async function handleToolCall(name: string, args: any) {
    if (lot0Tools.find(t => t.name === name)) return handleLot0ToolCall(name, args);
    if (lot1Tools.find(t => t.name === name)) return handleLot1ToolCall(name, args);
    if (lot2Tools.find(t => t.name === name)) return handleLot2ToolCall(name, args);
    if (lot3Tools.find(t => t.name === name)) return handleLot3ToolCall(name, args);

    throw new Error(`Unknown tool: ${name}`);
}
