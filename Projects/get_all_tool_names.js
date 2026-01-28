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
    buffer += data.toString();

    if (buffer.includes('"id":2,"result"')) {
        try {
            const start = buffer.indexOf('{"jsonrpc":"2.0","id":2');
            const end = buffer.lastIndexOf('}}') + 2;
            const fragment = buffer.substring(start, end);
            const response = JSON.parse(fragment);
            if (response.result && response.result.tools) {
                console.log('FULL_TOOL_LIST_START');
                response.result.tools.forEach(t => console.log(t.name));
                console.log('FULL_TOOL_LIST_END');
                server.kill();
                process.exit(0);
            }
        } catch (e) { }
    }
});

setTimeout(() => {
    server.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1" } }, id: 1 }) + '\n');
}, 3000);

setTimeout(() => {
    server.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "tools/list", params: {}, id: 2 }) + '\n');
}, 6000);

setTimeout(() => {
    server.kill();
    process.exit(1);
}, 25000);
