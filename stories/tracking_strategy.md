# Guest Mode: Tracking & Rate-Limiting Strategy

## Context
Goal is to offer a "try before you sign up" experience (3 prompts) without overexposing infrastructure or allowing trivial bypasses (like incognito/cache clearing).

## Proposed Solutions (Absorbed from Discussion)

### 1. IP-Based Tracking (Jean-Noël)
- **Mechanism**: Track usage per IP via Gravitee security framework.
- **Pros**: Harder to bypass than local/session storage.
- **Cons**: Can block multiple users from the same company/NAT.
- **Decision**: Acceptable trade-off. Suggested limit: 1-3 JWT generations per IP per month.

### 2. PBX Extension / Install ID (Alexander Kovalev)
- **Mechanism**: Extension generates a `crypto.randomUUID()` on first launch, stored in `chrome.storage.local`.
- **Backend**: Extension sends `installId` to `/issue-free-token`. Gravitee issues a JWT with `sub = installId` and an HTTP-only cookie.
- **Quota**: 3 prompts per 12 months per `sub`.
- **Note**: HitL (Human-in-the-Loop) might consume >1 generation request.

### 3. Verification & Friction
- **Rejection**: Email-based "magic link" flow (Jean-Noël) - frictionless entry is the priority.
- **Detection**: Detect incognito mode via extension and potentially block Guest Mode if `chrome.storage` is unavailable.

## Implementation Considerations
- **Environment**: Gravitee / JWT / HTTP-only cookies.
- **Storage**: IndexedDB for local editor state (instead of Mongo for unauthenticated users).
- **Quota Handling**: Ensure "Answer Verification" or "Image Picking" doesn't burn multiple generation credits unfairly.
