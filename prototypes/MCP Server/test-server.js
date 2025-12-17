const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'dist/index.js');
const server = spawn('node', [serverPath]);

let buffer = '';

server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log('Received:', output);
    buffer += output;

    // Check for JSON-RPC response
    if (buffer.includes('"jsonrpc":"2.0"')) {
        console.log('Test Passed: Received JSON-RPC response');
        server.kill();
        process.exit(0);
    }
});

server.stderr.on('data', (data) => {
    console.error('Server Error:', data.toString());
});

// Send a list_tools request
const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
};

setTimeout(() => {
    console.log('Sending request:', JSON.stringify(request));
    server.stdin.write(JSON.stringify(request) + '\n');
}, 1000);

// Timeout
setTimeout(() => {
    console.error('Test Timeout');
    server.kill();
    process.exit(1);
}, 5000);
