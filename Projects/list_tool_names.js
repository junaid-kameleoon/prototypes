const { spawn } = require('child_process');

const args = [
    "-y",
    "mcp-remote",
    "https://mcp.aitools-mvp-39914.preview.kameleoon.net/mcp",
    "--header", "X-Kameleoon-Auth: 18414-jgmalik-kameleoon-com:8U-31wBaWb-frtlcRYoeDooHz9YNIjexj53zh5PqUVo"
];

const server = spawn('npx', args);

let buffer = '';

server.stdout.on('data', (data) => {
    const chunk = data.toString();
    buffer += chunk;

    // Check for tool definitions
    // Look for "name":"..." strings
    const toolMatch = /"name":"([^"]+)"/g;
    let match;
    const names = new Set();
    while ((match = toolMatch.exec(chunk)) !== null) {
        if (!match[1].includes(' ')) { // Basic filter for tool names
            names.add(match[1]);
        }
    }

    if (names.size > 0) {
        console.log('Detected Tool Names in chunk:');
        names.forEach(n => console.log(`- ${n}`));
    }
});

server.stderr.on('data', (data) => {
    // console.error(data.toString());
});

// Send list_tools after a delay
setTimeout(() => {
    const request = {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {}
    };
    server.stdin.write(JSON.stringify(request) + '\n');
}, 3000);

// Timeout
setTimeout(() => {
    server.kill();
    process.exit(0);
}, 15000);
