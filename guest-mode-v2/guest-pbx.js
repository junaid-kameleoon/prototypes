// Guest Mode PBX Logic
// Tracks usage and mocks the experience for kameleoon.com

let promptCount = parseInt(localStorage.getItem('pbx_guest_prompts') || '0');
let isExtensionPrompted = localStorage.getItem('pbx_extension_prompted') === 'true';
const MAX_PROMPTS = 3;
const IS_EXTENSION_INSTALLED = false; // Mocking extinction status

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

function updateUI() {
    const counter = document.getElementById('promptCounter');
    if (counter) {
        const remaining = MAX_PROMPTS - promptCount;
        counter.textContent = `${remaining} PROMPT${remaining !== 1 ? 'S' : ''} LEFT`;
    }

    // Show/hide extension warning based on mock status
    const extWarning = document.getElementById('extWarning');
    if (extWarning) {
        extWarning.style.display = IS_EXTENSION_INSTALLED ? 'none' : 'flex';
    }
}

function handleSend() {
    const input = document.getElementById('pbxInput');
    const text = input.value.trim();

    if (!text) return;

    // FRED'S JOURNEY: Prompt for extension on first interaction
    if (!isExtensionPrompted) {
        showExtensionModal();
        return;
    }

    if (promptCount >= MAX_PROMPTS) {
        showConversionModal();
        return;
    }

    // Add user message to UI
    appendMessage('user', text);
    input.value = '';
    document.getElementById('charCount').textContent = '0 / 500';

    // Increment count
    promptCount++;
    localStorage.setItem('pbx_guest_prompts', promptCount);
    updateUI();

    // Mock AI response
    setTimeout(() => {
        const response = getMockResponse(text);
        appendMessage('assistant', response);

        // If it was the last prompt, show the bridge after a small delay
        if (promptCount >= MAX_PROMPTS) {
            setTimeout(showConversionModal, 2000);
        }
    }, 1000);
}

function showExtensionModal() {
    const modal = document.createElement('div');
    modal.id = 'extensionModal';
    modal.className = 'fixed inset-0 bg-dark/90 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl p-10 max-w-lg w-full text-center space-y-8 shadow-2xl">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl">🧩</div>
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-dark">Apply changes live?</h2>
                <p class="text-dark/60 text-sm">To see your prompts applied directly to this site, you'll need the free Kameleoon PBX extension.</p>
            </div>
            
            <div class="flex flex-col gap-3">
                <button onclick="installAndContinue()" class="w-full bg-blue-600 text-white py-4 rounded-full font-bold hover:scale-105 transition-all">Add to Chrome (Free)</button>
                <button onclick="skipExtension()" class="text-xs text-gray-400 hover:text-dark font-medium">Continue without extension</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function installAndContinue() {
    alert("Redirecting to Chrome Web Store...");
    skipExtension(); // Proceed after "install"
}

function skipExtension() {
    isExtensionPrompted = true;
    localStorage.setItem('pbx_extension_prompted', 'true');
    document.getElementById('extensionModal').remove();
    // Re-trigger the send
    handleSend();
}

function appendMessage(role, text) {
    const history = document.getElementById('chatHistory');
    const div = document.createElement('div');
    div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;

    const innerClass = role === 'user'
        ? 'bg-brand/10 text-dark border border-brand/20'
        : 'bg-gray-100 text-dark';

    div.innerHTML = `
        <div class="${innerClass} text-xs p-4 rounded-2xl ${role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[90%] leading-relaxed">
            ${role === 'assistant' ? '<div class="text-[10px] font-bold text-dark/40 mb-1 uppercase tracking-wider">PBX Assistant</div>' : ''}
            ${text}
        </div>
    `;

    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
}

function getMockResponse(input) {
    const responses = [
        "Analysis complete. I've identified the elements related to your request. I can modify the CSS and apply the changes once you confirm.",
        "That's a great optimization idea. I've prepared a variation that handles this change across all screen sizes. Would you like to see the preview?",
        "I've updated the properties for that component. My predictive model suggests this could improve CTR by roughly 4.2% based on similar industry benchmarks."
    ];
    return responses[Math.min(promptCount - 1, responses.length - 1)];
}

function showConversionModal() {
    // FRED'S JOURNEY: Enhanced value summary
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-dark/95 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl p-10 max-w-lg w-full text-center space-y-8 shadow-2xl border-4 border-brand">
            <div class="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto text-4xl shadow-lg">⚡</div>
            <div class="space-y-2">
                <h2 class="text-3xl font-bold text-dark">Limit Reached!</h2>
                <p class="text-dark/60">You've reached your guest limit, but your work is ready to go.</p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-6 text-left space-y-4 border border-gray-100">
                <div class="text-[10px] font-bold text-brand bg-dark px-2 py-1 inline-block rounded uppercase tracking-widest">Aha! Moment Summary</div>
                <ul class="space-y-3">
                    <li class="flex items-center gap-3 text-xs font-bold text-dark">
                        <span class="text-green-500 text-lg">✓</span> 3 Variations Drafted for kameleoon.com
                    </li>
                    <li class="flex items-center gap-2 text-[11px] text-gray-500 pl-7">
                        Impact Analysis: Predicted +4.2% Conversion Lift
                    </li>
                    <li class="flex items-center gap-2 text-[11px] text-gray-500 pl-7">
                        Technical Feasibility: Verified for all devices
                    </li>
                </ul>
            </div>

            <div class="space-y-4">
                <p class="text-sm font-medium text-dark">Save these 3 experiments to a permanent project.</p>
                <div class="flex flex-col gap-3">
                    <button onclick="location.href='try-pbx-signup.html'" class="w-full bg-dark text-brand py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">Complete Signup & Save</button>
                    <button onclick="location.reload()" class="text-xs text-gray-400 hover:text-dark">Start Over (Clears History)</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
// Triggering re-build to resolve transient GitHub Actions error
// Deployment retry - Tue Feb  3 00:10:08 CET 2026
