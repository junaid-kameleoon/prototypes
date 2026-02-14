const MAX_PROMPTS = 3;
let promptCount = parseInt(localStorage.getItem('pbx_prompt_count')) || 0;
let isExtensionPrompted = false;
const IS_EXTENSION_INSTALLED = window.location.pathname.includes('mock-target-site'); // Extension "installed" on the target site

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

function updateUI() {
    const counter = document.getElementById('promptCounter');
    if (counter) {
        const remaining = Math.max(0, MAX_PROMPTS - promptCount);
        counter.textContent = `${remaining} PROMPT${remaining !== 1 ? 'S' : ''} LEFT`;

        // Highlight in red if 0
        if (remaining === 0) {
            counter.classList.remove('text-gray-400', 'text-gray-500');
            counter.classList.add('text-red-500', 'font-bold');
        } else {
            counter.classList.remove('text-red-500', 'font-bold');
            counter.classList.add('text-gray-400');
        }
    }

    const extWarning = document.getElementById('extWarning');
    if (extWarning) {
        extWarning.style.display = IS_EXTENSION_INSTALLED ? 'none' : 'flex';
    }
}

function handleSend() {
    const input = document.getElementById('pbxInput');
    const text = input.value.trim();

    if (!text) return;

    if (!IS_EXTENSION_INSTALLED) {
        showExtensionModal(text);
        return;
    }

    if (promptCount >= MAX_PROMPTS) {
        updateUI(); // Ensure it shows RED 0
        showConversionModal();
        return;
    }

    processPrompt(text);
}

function showExtensionModal(pendingPrompt) {
    // Store prompt temporarily to use after "installation"
    localStorage.setItem('pbx_pending_prompt', pendingPrompt);

    const modal = document.createElement('div');
    modal.id = 'extensionModal';
    modal.className = 'fixed inset-0 bg-dark/95 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl p-10 max-w-lg w-full text-center space-y-8 shadow-2xl border-4 border-brand">
            <div class="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner italic font-serif">K</div>
            <div class="space-y-2">
                <h2 class="text-2xl font-bold text-dark">Extension Required</h2>
                <p class="text-dark/60 text-sm">To analyze <span class="font-mono text-dark bg-gray-100 px-1 rounded">${extractUrl(pendingPrompt) || 'your site'}</span> and apply changes, you'll need to install the Kameleoon PBX Extension.</p>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-2xl text-left border border-gray-100">
                <div class="text-[10px] uppercase font-bold text-gray-400 mb-2">Saved Intent</div>
                <div class="text-xs text-dark font-medium italic opacity-70">"${pendingPrompt}"</div>
            </div>

            <div class="flex flex-col gap-3">
                <button onclick="redirectToStore()" class="w-full bg-blue-600 text-white py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg">Download from Chrome Store</button>
                <p class="text-[10px] text-gray-400">Once installed, return here to resume your experiment instantly.</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function extractUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)|([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)/ig;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
}

function redirectToStore() {
    const modal = document.getElementById('extensionModal');
    if (modal) {
        modal.innerHTML = `
            <div class="bg-white rounded-3xl p-10 max-w-lg w-full text-center space-y-6 shadow-2xl">
                <div class="flex justify-center">
                    <div class="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 class="text-xl font-bold text-dark">Waiting for Extension...</h2>
                <p class="text-dark/60 text-sm">Install the extension in the other tab. This page will automatically refresh once detected.</p>
            </div>
        `;
    }

    // Simulate detection and transition to the MOCK TARGET SITE
    setTimeout(() => {
        const prompt = localStorage.getItem('pbx_pending_prompt') || '';
        // Redirect to mock-target-site with the prompt
        location.href = `mock-target-site.html?prompt=${encodeURIComponent(prompt)}`;
    }, 2500);
}

function processPrompt(text) {
    const input = document.getElementById('pbxInput');
    appendMessage('user', text);
    input.value = '';

    promptCount++;
    localStorage.setItem('pbx_prompt_count', promptCount.toString());
    updateUI();

    setTimeout(() => {
        const response = getMockResponse(text);
        appendMessage('assistant', response);

        if (promptCount >= MAX_PROMPTS) {
            setTimeout(showConversionModal, 2000);
        }
    }, 1000);
}

function appendMessage(role, text) {
    const history = document.getElementById('chatHistory');
    if (!history) return;

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
    const existing = document.getElementById('conversionModal');
    if (existing) return;

    const modal = document.createElement('div');
    modal.id = 'conversionModal';
    modal.className = 'fixed inset-0 bg-dark/95 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300';
    modal.innerHTML = `
        <div class="bg-white rounded-[32px] max-w-md w-full p-8 text-center space-y-6 shadow-2xl border-[5px] border-[#DAE995] font-sans relative">
            <!-- Icon -->
            <div class="w-16 h-16 bg-[#E5F2A8] rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
                <span class="text-[#F5C71A]">⚡</span>
            </div>

            <!-- Title & Subtitle -->
            <div class="space-y-2">
                <h2 class="text-2xl font-extrabold text-[#1D342F] italic tracking-tight leading-none">You're doing great!</h2>
                <p class="text-[#1D342F] opacity-70 text-sm font-medium leading-tight px-4">
                    You've reached your guest limit, but your work is ready to go.
                </p>
            </div>
            
            <!-- Checklist Box -->
            <div class="bg-[#F9FAFB] rounded-[24px] p-6 text-left space-y-3 border border-gray-100">
                <ul class="space-y-3">
                    <li class="flex items-center gap-3 text-xs font-bold text-[#1D342F]">
                        <span class="text-[#4ADE80] text-lg">✓</span> 3 Variations Drafted
                    </li>
                    <li class="flex items-center gap-3 text-xs font-bold text-[#1D342F]">
                        <span class="text-[#4ADE80] text-lg">✓</span> Impact Analysis ready
                    </li>
                    <li class="flex items-center gap-3 text-xs font-bold text-[#1D342F]">
                        <span class="text-[#4ADE80] text-lg">✓</span> Technical Feasibility Verified
                    </li>
                </ul>
            </div>

            <!-- CTA & Links -->
            <div class="space-y-4">
                <p class="text-[11px] font-bold text-[#1D342F] px-4">Save your work to a permanent project and continue prompting!</p>
                <div class="flex flex-col gap-3">
                    <button onclick="location.href='try-pbx-signup.html'" class="w-full bg-[#1D342F] text-[#DAE995] py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-all shadow-lg">
                        Start a Free Trial
                    </button>
                    <button onclick="document.getElementById('conversionModal').remove()" class="text-xs text-gray-400 hover:text-dark font-medium underline underline-offset-4 decoration-gray-200">
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
// Triggering re-build to resolve transient GitHub Actions error
// Deployment retry - Tue Feb  3 00:10:08 CET 2026
