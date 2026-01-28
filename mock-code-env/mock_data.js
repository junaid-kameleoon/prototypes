export const LOT_1_MOCK_DATA = {
    suggestions: [
        {
            name: "create_feature_flag",
            confidence: "Productivity",
            description: "Create a new feature flag from current context.",
            code: "create_feature_flag"
        },
        {
            name: "wrap_code_in_flag",
            confidence: "Refactoring",
            description: "Wrap selected code in a feature flag.",
            code: "wrap_code_in_flag"
        },
        {
            name: "get_variant_code",
            confidence: "Assets",
            description: "Retrieve CSS/JS for a specific variant.",
            code: "get_variant_code"
        },
        {
            name: "generate_production_code",
            confidence: "Production",
            description: "Convert experiment to React/TS component.",
            code: "generate_production_code"
        },
        {
            name: "update_rollout",
            confidence: "Ops",
            description: "Update traffic allocation for a flag.",
            code: "update_rollout"
        },
        {
            name: "check_script_usage",
            confidence: "Performance",
            description: "Analyze script size and unused flags.",
            code: "check_script_usage"
        },
         {
            name: "scan_for_cleanup",
            confidence: "Governance",
            description: "Find dead code references to stale flags.",
            code: "scan_for_cleanup"
        }
    ],
    responses: {
        create_feature_flag: {
            success: true,
            data: {
                key: "new_checkout_v2",
                name: "New Checkout Flow V2",
                status: "active",
                environment: "production",
                variations: ["on", "off"]
            },
            message: "✅ Feature Flag 'new_checkout_v2' created successfully."
        },
        wrap_code_in_flag: {
            snippet: `// Wrapped in Feature Flag: new_checkout_v2
if (kameleoon.isFeatureActive("new_checkout_v2")) {
    // New Implementation
    renderNewCheckout();
} else {
    // Original Implementation
    renderLegacyCheckout();
}`
        },
        get_variant_code: {
            css: `.checkout-btn { 
    background-color: #00ff00; 
    font-weight: bold; 
    transform: scale(1.1); 
}`,
            js: `document.querySelector(".checkout-btn").addEventListener("click", () => {
    trackEvent("checkout_clicked_variant_b");
});`
        },
        generate_production_code: {
            snippet: `import React from 'react';
import { useFeatureFlag } from '@kameleoon/react-sdk';

export const CheckoutButton = () => {
    const { isEnabled } = useFeatureFlag('checkout_redesign');

    if (isEnabled) {
        return (
            <button className="bg-green-500 font-bold px-4 py-2 rounded transform hover:scale-105 transition-all">
                Checkout Now
            </button>
        );
    }

    return <button className="bg-blue-500 px-4 py-2 rounded">Checkout</button>;
};`
        },
        update_rollout: {
            success: true,
            previous: "10%",
            current: "50%",
            message: "🚀 Rollout for 'checkout_redesign' increased to 50%."
        },
        check_script_usage: {
            report: `
Health Check Report
-------------------
Script Size: 24.5 KB (Optimal)
Active Experiments: 3
Paused Experiments: 12
Unused Flags: 5

Recommendation: Archive 5 unused flags to save ~4KB.`
        },
        scan_for_cleanup: {
            matches: [
                { file: "src/components/Header.js", line: 45, code: "if (flags.holiday_banner) { ... }" },
                { file: "src/utils/pricing.js", line: 12, code: "const useNewAlg = flags.pricing_v2;" }
            ],
            message: "⚠️ Found 2 references to archived flags."
        }
    }
};
