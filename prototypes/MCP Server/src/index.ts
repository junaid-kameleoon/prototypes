#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import express from 'express';
import cors from 'cors';
import { allTools, handleToolCall } from './tools/index.js';

async function main() {
    // Create an MCP server
    const server = new Server(
        {
            name: 'Kameleoon Mock Server',
            version: '0.1.0',
        },
        {
            capabilities: {
                tools: {},
            },
        }
    );

    // Register tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: allTools,
        };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const result = await handleToolCall(request.params.name, request.params.arguments);
        return result;
    });

    // --- HTTP Bridge for Web Prototype ---
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.post('/mcp', async (req, res) => {
        const { method, params } = req.body;
        try {
            if (method === 'tools/list') {
                res.json({ result: { tools: allTools } });
            } else if (method === 'tools/call') {
                const result = await handleToolCall(params.name, params.arguments);
                res.json({ result });
            } else {
                res.status(400).json({ error: 'Unknown method' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    app.listen(3001, () => {
        console.error('HTTP Bridge running on http://localhost:3001');
    });
    // -------------------------------------

    // Connect transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('Kameleoon Mock MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
