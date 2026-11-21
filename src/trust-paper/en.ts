// The whitepaper in English. The 中文 text is in ./zh.ts.
import type { TrustPaper } from '.'

export const en: TrustPaper = {
  eyebrow: 'Whitepaper',
  heading: 'Eisoptric MCP Gateway: System Whitepaper',
  updated: '21 November 2026',
  lede: 'Status reflects the product as of 18 October 2026 (Taipei time). This paper is neither a certification nor a third-party audit. Where marketing copy differs from this paper, this paper governs. Every status statement in Part II uses one of four labels: [Current] (actual behavior of the product today), [Fixed] (a previously identified issue whose fix is deployed and verified), [Open] (a known issue not yet resolved), or [Planned] (an intended change not yet live; items without a timeline have no committed schedule).',
  sections: [
    {
      heading: 'Part I: Product & Architecture — 1. Summary',
      blocks: [
        {
          type: 'p',
          text: 'AI agents now call real production systems directly: sending payments, dispatching emails, mutating databases, and opening tickets. The core question is no longer whether an agent can act, but who authorized the action, what it did, and whether you can reconstruct the trail when something goes wrong.',
        },
        {
          type: 'p',
          text: 'Eisoptric MCP Gateway sits between AI agents and MCP servers. Every tool call passes through four steps:',
        },
        {
          type: 'ol',
          items: [
            'Authentication: Verify which agent is calling; every agent has its own OAuth identity.',
            'Evaluation: Evaluate the call against the policies applicable to that agent to allow, deny, or require human approval.',
            'Execution: Forward only authorized calls; upstream credentials stay in the gateway and are never exposed to the agent.',
            'Audit: Record every call in an audit log, sealing stored audit payloads with zero-access encryption.',
          ],
        },
        {
          type: 'p',
          text: 'One design principle governs approvals: approval is permission, not a command. Clicking Approve never executes the tool directly; the agent must resubmit the call with the same action ID, and the gateway re-verifies the expiration window, the currently active policy, and parameter consistency before forwarding.',
        },
      ],
    },
    {
      heading: '2. Scope & Audience',
      blocks: [
        {
          type: 'p',
          text: 'This document is written for technical leaders, security teams, and engineering teams evaluating Eisoptric. It covers system architecture, agent identity, policies, human approvals, upstream credentials, key hierarchy and cryptographic design, data classification and third-party data flows, audit logging, deployment and operations, and known boundaries.',
        },
        {
          type: 'p',
          text: 'This paper describes the actual behavior of the product as of the date above. This paper is neither a certification nor a third-party audit. We update this document and record a new version whenever significant changes ship.',
        },
      ],
    },
    {
      heading: '3. Product Plans',
      blocks: [
        {
          type: 'table',
          head: ['Feature', 'Every account'],
          rows: [
            ['Account Kind', 'Personal and Organization'],
            ['Eisoptric Workbench (AI research)', 'Free, Apache 2.0 open source'],
            ['MCP Gateway & Tool Sets', 'Included (unlimited tool sets)'],
            ['Per-Tool Mode (Call / Approval)', 'Included'],
            ['Argument-Level Policy Rules & Versioning', 'Included'],
            ['Signed Webhooks', 'Included'],
            ['Groups & Multi-Approver Quorum', 'Included'],
            ['Member Invites, Roles & Per-Employee MCP Mapping', 'Included (organization accounts)'],
            [
              'Audit History & Zero-Access Payload Encryption',
              'Unlimited (zero-access encrypted when org key is active)',
            ],
            ['Price', '$0 (free, supported by sponsors)'],
          ],
        },
        {
          type: 'p',
          text: 'Eisoptric is free and has no paid plans. Argument-level policies, signed webhooks, groups, and multi-approver quorum described in this paper are available on every account; member invitations and role management apply to organization accounts.',
        },
      ],
    },
    {
      heading: '4. System Components',
      blocks: [
        {
          type: 'p',
          text: 'Parties and trust boundaries are detailed in Part II (S2.1). The Eisoptric system consists of twelve components:',
        },
        {
          type: 'ul',
          items: [
            'Cloudflare Edge: Provides WAF, bot protection, edge rate limiting, and TLS termination (accepting only TLS 1.2 and 1.3), and injects an origin authentication header when forwarding requests to origin services.',
            'Gateway Service (Cloud Run): Handles MCP protocol traffic (initialize, tools/list, tools/call), OAuth 2.1 authentication, policy evaluation, the approval queue, zero-access audit sealing, and console APIs.',
            'Webhook Worker (Independent Service): Delivers HMAC-SHA256 signed approval event notifications (granted, rejected, expired) with retry handling in a separate service so delivery never blocks gateway traffic.',
            'Shared Session & Rate-Limit Store (Redis): Holds cross-instance MCP session state, pub/sub notifications, and application-layer rate-limit counters. The service refuses to start if Redis is unreachable at boot; if Redis becomes unreachable at runtime, authentication endpoints (sign-in and registration) fail closed and reject requests.',
            'Database: Stores organizations, members, agents, tool catalogs, versioned policies, encrypted upstream credentials, encrypted in-flight content, and zero-access audit records.',
            'Cloud KMS: Holds hardware-protected HMAC root keys that never leave KMS, deriving per-tenant upstream credential keys and per-organization symmetric keys for 7-day in-flight content via MAC operations.',
            'Secret Manager: Holds only operational configuration values that must be read in plaintext at runtime (such as database connection strings, origin verification secrets, and system salts); it never stores organization or member ML-KEM private keys.',
            'Email Delivery Service: Used solely for account verification, password reset, member invitations, and approval notification emails; never carries raw tool call responses.',
            'Policy Drafting LLM: Assists members in drafting or optimizing policy rules from natural language in the console; generated drafts never take effect automatically and must be reviewed and saved by a human member (see Chapter 8 for exact fields sent).',
            'Console (Browser-Side Decryption): Web interface where members sign in, manage agents and tool sets, author policies, approve or reject sensitive calls, and unlock their ML-KEM-1024 private key in browser memory to decrypt zero-access audit payloads.',
            'Eisoptric Workbench (Apache 2.0 Open-Source Desktop Application): Local workbench for AI research, with coding agents (with an independent local Runtime listening only on loopback), capable of running offline with local models or connecting to Eisoptric MCP Gateway for governance.',
            'Customer Upstream MCP Servers: External or internal MCP servers operated by or for the customer (such as billing, CRM, databases, or deployment systems) that receive only authorized calls forwarded by Eisoptric.',
          ],
        },
      ],
    },
    {
      heading: '5. Complete Lifecycle of a Tool Call',
      blocks: [
        {
          type: 'p',
          text: 'From agent connection through execution, archival, and notification, a complete tool call proceeds through twelve ordered steps:',
        },
        {
          type: 'ol',
          items: [
            'OAuth 2.1 + PKCE Authentication: The agent obtains an access token bound to that agent and organization (or personal profile) via OAuth 2.1 authorization code flow with mandatory PKCE S256. Unauthenticated calls to the MCP endpoint receive HTTP 401 with RFC 9728 resource metadata.',
            'initialize Handshake: The agent sends initialize to the Eisoptric MCP endpoint, establishing an MCP session bound to the agent identity in shared Redis.',
            'tools/list (Filtered by Tool Set): When the agent requests tools/list, the gateway returns only active tools included in that agent’s assigned tool set and hosted on MCP servers mapped to the acting member; tools outside the set are invisible to the agent.',
            'tools/call Submission: The agent submits tools/call with tool name and arguments. If the agent is paused, the call is rejected immediately.',
            'Policy Evaluation: The gateway evaluates the active policies applicable to the agent (matching tool name and argument conditions in order) together with the tool’s mode (Call or Approval), producing allow, deny, or approval required. If an agent has no applicable policy at all, evaluation defaults to deny.',
            'Decision Branching (Allow / Deny / Approval Required): If allowed, execution proceeds to Step 9; if denied, the call never leaves Eisoptric, a denial audit event is written immediately, and the agent receives a structured error containing reason, policy_id, and how_to_allow.',
            'Approval Queue (with Group Quorum): If approval is required, the gateway issues a unique action ID (gatewayRunId), computes the canonical SHA-256 digest of the arguments, and encrypts the pending arguments with the per-organization KMS-derived key (7-day TTL). The call enters the approval queue waiting for a single reviewer or until every required group reaches its quorum, and returns a structured response with the approval URL to the agent.',
            'Resubmission with the Same Action ID & Re-Verification: Reviewer approval never executes the tool directly (“approval is permission, not a command”). The agent must resubmit the tool call with the same gatewayRunId; the gateway re-verifies that the approval and resubmission windows have not expired, that currently active policies still permit the call, and that the resubmitted argument digest matches the approved arguments. Any mismatch is rejected.',
            'Forwarding Upstream with Vault Credentials: Once verified, the gateway unseals the upstream MCP server’s credential from the post-quantum vault in memory for the duration of the call and forwards the request upstream; if the upstream returns HTTP 401 and a refresh token is available, the gateway refreshes the token automatically and retries once.',
            'Zero-Access Archival Sealing: Before writing the permanent audit record, the gateway generates a random 32-byte AES-256-GCM data key, encrypts the arguments, raw request, raw response, server result, and agent result, wraps the data key with ML-KEM-1024 + HKDF-SHA384 to the organization public key and each active member’s public key, and immediately deletes the data key. If the organization has no usable ML-KEM key, payload content is omitted and the row is marked encryption unavailable.',
            'Audit Log Persistence: Using an atomic per-organization sequence counter, the gateway writes the plaintext governance metadata (caller, tool, policy version, decision, encryption status, content SHA-256 hash) alongside the zero-access ciphertext envelope.',
            'Signed Webhook Delivery: When an approval transitions to granted, rejected, or expired, the independent webhook worker sends an HMAC-SHA256 signed notification to the customer’s configured HTTPS endpoint. Webhook delivery is informational only and never triggers tool execution.',
          ],
        },
      ],
    },
    {
      heading: '6. Connecting Upstream MCP Servers',
      blocks: [
        {
          type: 'p',
          text: 'When a customer connects an external or internal MCP server to Eisoptric, the gateway enforces network boundaries, discovers tools, and manages the upstream OAuth lifecycle:',
        },
        {
          type: 'ul',
          items: [
            'Registration & Network Boundary Enforcement: Upstream MCP server URLs must use HTTPS (HTTP is permitted only on localhost for local development). The gateway resolves hostnames and blocks private IP ranges, loopback addresses, link-local addresses, and cloud metadata endpoints to prevent Server-Side Request Forgery (SSRF).',
            'Automated Tool Discovery: Upon connection or manual refresh, the gateway sends MCP initialize and tools/list requests upstream, recording each tool’s name, description, and JSON inputSchema. Name collisions across servers are automatically namespaced with the server slug, and tools removed upstream are automatically disabled.',
            'Managed Upstream OAuth (Dynamic Registration & Token Refresh): When an upstream MCP server requires OAuth, Eisoptric discovers its OAuth authorization server metadata, performs Dynamic Client Registration (DCR) where supported, and completes an authorization code flow with PKCE. Resulting access tokens, refresh tokens, and client secrets are individually sealed with the per-tenant ML-KEM-1024 vault key; if an upstream later returns HTTP 401, the gateway automatically refreshes the token using the stored refresh token and reseals the updated credentials.',
          ],
        },
      ],
    },
    {
      heading: '7. Key Hierarchy',
      blocks: [
        {
          type: 'p',
          text: 'Eisoptric separates its cryptography into two independent key trees: a server-side KMS-rooted tree (protecting upstream credentials and 7-day in-flight content) and a browser-generated zero-access tree (protecting archived audit payloads and member private keys). The two trees share no secrets.',
        },
        {
          type: 'table',
          head: ['Key Tier', 'Algorithm & Derivation', 'Generation & Custody', 'Purpose & Protection Scope'],
          rows: [
            [
              'Cloud KMS Root Key',
              'Hardware-backed HMAC-SHA256 key',
              'Google Cloud KMS (never leaves KMS)',
              'Root of trust for deriving per-tenant and per-organization server-side keys',
            ],
            [
              'Per-Tenant Credential Key (pq2.)',
              'KMS MAC over tenant context → ML-KEM-1024 → HKDF-SHA384 → AES-256-GCM',
              'Derived on demand by Gateway via KMS; never stored in database',
              'Seals upstream MCP server access tokens, refresh tokens, and client secrets',
            ],
            [
              'Per-Organization In-Flight Key (s2.)',
              'KMS MAC over organization ID → 32-byte AES-256-GCM key (cached 300s in memory)',
              'Derived on demand by Gateway via KMS; never stored in database',
              'Encrypts arguments waiting for approval and active run state (expires after 7 days)',
            ],
            [
              'Organization ML-KEM Keypair',
              'ML-KEM-1024 (FIPS 203), 1,568-byte public key, 64-byte private seed',
              'Generated in browser; Gateway stores only public key and encrypted backups',
              'Receives wrapped data keys for zero-access audit records and enables member key re-wrapping',
            ],
            [
              'Member ML-KEM Keypair',
              'ML-KEM-1024 (FIPS 203), private seed wrapped via password-derived key (PBKDF2 600,000 iterations + AES-256-GCM)',
              'Generated and unlocked in browser (held only in page memory)',
              'Unlocks zero-access audit payloads and organization key copies in the member’s browser',
            ],
            [
              'Organization Recovery Key',
              '256-bit random key → HKDF-SHA256 (eisoptric-recovery-v1) → AES-256-GCM',
              'Displayed once in browser at org key creation; never uploaded',
              'Offline recovery of the encrypted organization key backup if member password backups are lost',
            ],
          ],
        },
        {
          type: 'p',
          text: 'This separation guarantees that a database dump alone cannot decrypt upstream credentials or in-flight content without KMS access, and even an attacker with access to the running gateway cannot retroactively decrypt archived zero-access audit payloads whose data keys have already been deleted, nor unwrap member private keys.',
        },
      ],
    },
    {
      heading: '8. Data Classification & Third-Party Data Flows',
      blocks: [
        {
          type: 'h3',
          text: '8.1 Data Classification Table',
        },
        {
          type: 'table',
          head: [
            'Data Class',
            'Included Fields',
            'Storage & Encryption',
            'Readable by Gateway After Write?',
            'Retention',
          ],
          rows: [
            [
              'Plaintext Metadata',
              'Caller identity, agent ID, tool name, policy ID and version, decision, timestamps, atomic sequence number, encryption status, content SHA-256 hash',
              'Stored in plaintext in database for console search, filtering, and governance metrics',
              'Yes',
              'Long-term',
            ],
            [
              'In-Flight Content (Gateway-readable for 7 days)',
              'Tool arguments waiting for human approval, approval queue context, active run state',
              'AES-256-GCM (prefix s2.) with key derived per organization via Cloud KMS MAC',
              'Yes (required to display approval context, verify resubmission digests, and forward calls)',
              'Expires after 7 days',
            ],
            [
              'Zero-Access Audit Payloads',
              'Archived tool arguments, upstream raw_request, upstream raw_response, server_result, and agent_result',
              'Random 32-byte AES-256-GCM data key (org-mlkem1024-v1), wrapped via ML-KEM-1024 + HKDF-SHA384 to organization key and each active member public key; data key deleted immediately after write',
              'No (only authorized members can decrypt in the browser)',
              'Long-term',
            ],
            [
              'Upstream Credentials (Vault)',
              'Upstream MCP server OAuth access tokens, refresh tokens, client secrets, and static authorization headers',
              'ML-KEM-1024 + HKDF-SHA384 + AES-256-GCM (prefix pq2.) with key derived per tenant via Cloud KMS MAC',
              'Opened in memory only for the duration of an authorized call',
              'Long-term (until revoked or reconnected)',
            ],
          ],
        },
        {
          type: 'h3',
          text: '8.2 Policy LLM & Third-Party Data Flows',
        },
        {
          type: 'p',
          text: 'When a member explicitly uses the AI-assisted policy drafting or policy optimization feature in the console, the gateway sends only the minimum schema fields required to draft rules to the LLM service provider configured by Eisoptric (over an HTTPS OpenAI-compatible Chat Completions API):',
        },
        {
          type: 'ul',
          items: [
            'Fields sent during policy drafting: Candidate tool names (name), upstream server names (server), tool descriptions (description, truncated to at most 500 characters), input parameter schema summaries (inputSchema.properties, up to 30 properties with type, up to 12 enum values, and property descriptions truncated to 160 characters), and the member’s natural-language prompt (request, truncated to at most 4,000 characters).',
            'Additional fields sent during policy optimization: The existing policy’s target tool name, decision (allow / require_approval / deny), and condition list (field, operator, value).',
            'Data never sent to the Policy LLM: Runtime tool call arguments, upstream responses, audit payloads, upstream credentials, member password verifiers, and cryptographic keys are never sent to the LLM service provider. If a member does not invoke AI drafting or optimization, no LLM request is made.',
            'Other external data flows: Request traffic traverses the Cloudflare edge; account and approval notification emails are sent via the email delivery service (containing only notification links and basic metadata); authorized tool calls are forwarded to the customer’s registered upstream MCP servers; signed approval event notifications are sent to customer-configured webhook URLs.',
          ],
        },
      ],
    },
    {
      heading: 'Part II: Security Architecture — S1. Overview & Design Principles',
      blocks: [
        {
          type: 'h3',
          text: 'S1.1 What Eisoptric Protects',
        },
        {
          type: 'p',
          text: 'AI agents now call real systems directly: payments, email, databases, and ticketing. Eisoptric stands between the agent and upstream MCP servers so every tool call passes through four steps:',
        },
        {
          type: 'ol',
          items: [
            'Authentication: Confirm which agent is calling. Every agent has its own OAuth identity.',
            'Evaluation: Evaluate the policies applicable to that agent to allow, deny, or require human approval.',
            'Execution: Forward only authorized calls. Upstream credentials stay in the gateway and are never given to the agent.',
            'Audit: Write an audit record for every call, sealing stored sensitive payloads with zero-access encryption.',
          ],
        },
        {
          type: 'h3',
          text: 'S1.2 Core Commitments',
        },
        {
          type: 'ul',
          items: [
            'Agents receive results, not secrets. Upstream access tokens and client secrets are never handed to agents.',
            'Agents are untrusted. Eisoptric assumes an agent may be manipulated or malicious. An agent cannot choose its own tools, hold upstream credentials, or approve its own calls.',
            'Approval is permission, not a command. A human clicking Approve does not execute the tool directly. The agent must resubmit with the same action ID, and the gateway re-checks expiration, current policy, and argument consistency before executing.',
            'Fail-closed on missing keys. When required key material is unavailable, the gateway refuses to start and refuses to write plaintext payloads.',
          ],
        },
        {
          type: 'h3',
          text: 'S1.3 Honest Limitations',
        },
        {
          type: 'p',
          text: 'Eisoptric constrains what an agent can do, not what an agent thinks. Eisoptric does not inspect an agent’s internal reasoning or the semantic meaning of parameter values. Several guarantees depend on honest operation by the platform operator and on an uncompromised member browser. These assumptions and remaining open items are listed explicitly in S2 and S10.',
        },
      ],
    },
    {
      heading: 'S2. Threat Model & Trust Boundaries',
      blocks: [
        {
          type: 'h3',
          text: 'S2.1 Parties',
        },
        {
          type: 'table',
          head: ['Party', 'Trusted To', 'Not Trusted To'],
          rows: [
            [
              'Agent',
              'Nothing. Treated as potentially manipulated or malicious.',
              'Select its own tools, hold upstream credentials, or approve its own calls',
            ],
            [
              'Upstream MCP Server',
              'Respond to authorized calls',
              'See anything beyond the forwarded request, including Eisoptric’s credential vault',
            ],
            [
              'Gateway (Eisoptric Service)',
              'Authenticate callers, enforce policy, complete authorized calls, write audit records',
              'Read member private keys, or decrypt archived zero-access audit payloads after data key deletion',
            ],
            [
              'Platform Operator (infrastructure access)',
              'Operate the service honestly',
              'See S2.3. In practice, the operator is currently trusted with KMS MAC signing permissions, the integrity of the in-flight execution environment, and audit record retention and ordering.',
            ],
            [
              'Member Browser',
              'Execute unmodified Eisoptric code and hold the member private key in memory',
              'Anything else. If the browser is compromised, that member’s keys and decrypted view are exposed.',
            ],
            [
              'Eisoptric Domain & Build Pipeline',
              'Serve unmodified frontend code',
              'An implicit root of trust; see S7',
            ],
          ],
        },
        {
          type: 'h3',
          text: 'S2.2 In Scope: What Eisoptric Is Designed to Prevent',
        },
        {
          type: 'ul',
          items: [
            'Compromised or malicious agents. Four layers of defense apply: curated tool sets per agent; policy rules (with argument conditions); human approval queues for sensitive calls; and distinct per-agent OAuth identities that attribute every call and can be revoked individually.',
            'Untrusted upstream MCP servers. Upstream credentials are sealed in the gateway vault; neither agents nor other upstream servers can read the vault.',
            'Database copy compromise. Upstream credentials, in-flight content, and stored audit payloads are encrypted at rest in the database. Upstream credentials and in-flight keys are derived via Cloud KMS (whose root key is not in the database), while stored audit payloads use zero-access encryption wrapped to organization and member public keys so even the gateway cannot decrypt historical records.',
            'Cross-tenant access. Internal authenticated red-team testing (not a third-party audit) found no cross-tenant access, IDOR, or privilege escalation: organization scope is always derived from the authenticated session and cannot be overridden by request parameters; forging another organization’s object IDs returns 403 or 404.',
          ],
        },
        {
          type: 'h3',
          text: 'S2.3 Out of Scope: What Eisoptric Does Not Prevent',
        },
        {
          type: 'ul',
          items: [
            'Prompt injection of the agent’s own reasoning. If injected content convinces an agent to issue a call that your policy permits, Eisoptric will allow it. Eisoptric bounds what a manipulated agent can execute, not whether it can be manipulated.',
            'Content-layer inspection and DLP. Policies evaluate only the conditions you declare. Eisoptric does not perform DLP, classify secrets or PII, or inspect the semantic meaning of arguments.',
            'A platform operator with gateway key access or KMS MAC signing permissions. A service identity with KMS MAC signing permission can derive any tenant’s upstream credential key and 7-day in-flight content key (see S4 and S6), and anyone with direct database write access can delete or reorder audit rows without cryptographic detection (see S6.3).',
            'Compromise of a member’s computer or browser. Malware, malicious browser extensions, or hijacked sessions can read anything that member can unlock, including payloads decrypted in memory.',
          ],
        },
      ],
    },
    {
      heading: 'S3. Identity & Sign-In',
      blocks: [
        {
          type: 'h3',
          text: 'S3.1 Agent Identity',
        },
        {
          type: 'ul',
          items: [
            '[Current] Agents authenticate via OAuth 2.1 authorization code flow with mandatory PKCE S256. Requests without a code_challenge or attempting to downgrade to plain are rejected. The redirect_uri must match exactly; prefix-extension variants are rejected, preventing open redirects.',
            '[Current] Standard MCP Dynamic Client Registration (DCR) is supported. Unauthenticated requests to the MCP endpoint return HTTP 401 with RFC 9728 resource metadata.',
            '[Current] Agent OAuth tokens and member web sessions are separate authentication planes. A web session token cannot be used to call the MCP gateway.',
            '[Fixed] Because MCP DCR is unauthenticated by specification, the registration endpoint now enforces application-layer rate limiting (keyed by the real client IP across instances) to prevent bulk registration abuse.',
            '[Planned] Add anomaly monitoring for dynamically registered OAuth clients and periodically purge idle unused clients.',
          ],
        },
        {
          type: 'h3',
          text: 'S3.2 Member Sign-In & Multi-Factor Authentication (MFA)',
        },
        {
          type: 'p',
          text: '[Current] Browser-side v2. login verifier. Before submission, the browser processes the password with Argon2id (using a salt derived from the email address) followed by HKDF, and sends the prefix v2. plus a hex string. We state clearly what this step does and does not achieve:',
        },
        {
          type: 'ul',
          items: [
            'It is transport obfuscation, not transport security. The transmitted v2. verifier is password-equivalent: anyone who intercepts it can sign in without knowing the underlying password. Real protection on the sign-in path comes from TLS plus server-side Argon2id.',
            'Because the client-side salt is derived deterministically from the email address rather than randomly per registration, an attacker can precompute against a known email. Do not overvalue client-side hashing.',
            'Its two real benefits are: during normal sign-in, the raw password does not leave the browser; and the sign-in verifier is domain-separated from the member private-key wrapping material, so the sign-in verifier cannot unwrap a member private key.',
          ],
        },
        {
          type: 'p',
          text: '[Current] Server-side protection. Upon receiving the login verifier, the server hashes it again with Argon2id using a unique random salt per account before storing it. Eisoptric never stores plaintext passwords. Successful sign-in issues an opaque server-side session token rather than a JWT, eliminating offline token tampering or alg=none attacks. Signing out invalidates the token immediately. Unlocked member private keys live only in page memory, and tokens are never written to localStorage.',
        },
        {
          type: 'p',
          text: '[Current] Explicit exception for legacy account migration. Legacy accounts (using earlier SHA-256 verifiers or PBKDF2 hashes) signing in before the migration deadline send the raw password once over TLS so the server can verify the legacy hash and rewrite it as Argon2id. This is a time-bounded exception to “the server never sees the password”; a migration deadline mechanism is enforced in code, after which legacy sign-ins are rejected and unmigrated accounts must reset their password.',
        },
        {
          type: 'ul',
          items: [
            '[Fixed] Sign-in no longer leaks whether an account exists. Previously, registered and unregistered emails received distinguishable error responses that included migration state. Both now receive byte-for-byte identical HTTP 401 responses (status code, length, and body), verified in testing.',
            '[Fixed] Application-layer rate limiting is enforced on the general sign-in endpoint, the OAuth sign-in endpoint, and the legacy migration sign-in endpoint.',
            '[Fixed] Mandatory MFA for administrator accounts. Platform administrators and organization administrators are required to enable TOTP multi-factor authentication; privileged and organization write operations are blocked until MFA is enabled.',
            '[Fixed] TOTP security hardening: TOTP secrets are encrypted at rest in the database (never stored in plaintext); verified time steps are tracked across the 90-second acceptance window so a TOTP code cannot be replayed; and consecutive failed verification attempts are capped at 5 to prevent brute-force guessing.',
            '[Planned] Ensure login verifiers are excluded from any external error reporting, and evaluate an augmented PAKE protocol (such as OPAQUE) so the transmitted verifier is no longer password-equivalent (under evaluation, no committed schedule).',
          ],
        },
      ],
    },
    {
      heading: 'S4. Upstream Credential Vault & Member Private Keys',
      blocks: [
        {
          type: 'h3',
          text: 'S4.1 Upstream Credential Vault Status',
        },
        {
          type: 'ul',
          items: [
            '[Fixed] Per-tenant key isolation. The earlier shared gateway credential key has been replaced by per-tenant Cloud KMS MAC-derived keys. Because the root KMS key never leaves KMS, one tenant’s derived key cannot open another tenant’s credentials, and a database copy alone cannot derive any tenant key.',
            '[Current] Encryption pipeline. Every credential ciphertext carries the prefix pq2., using ML-KEM-1024 (FIPS 203) encapsulation, HKDF-SHA384 key derivation, and AES-256-GCM authenticated encryption.',
            '[Current] Opened only for the duration of an authorized call. The gateway unseals the corresponding credential only while completing an authorized tool call. The agent receives the call result and never sees the credential.',
            '[Current] Fail-closed at boot. The gateway refuses to start if required key material cannot be read.',
          ],
        },
        {
          type: 'h3',
          text: 'S4.2 Boundaries',
        },
        {
          type: 'ul',
          items: [
            'KMS signing permission is the control point. Per-tenant keys defend against database exfiltration, not against an actor holding KMS permissions. Any service identity permitted to call KMS MAC sign can derive any tenant’s credential key. The real boundary is IAM: only the gateway runtime identity holds this permission, and access must be tightly restricted and audited.',
            '“Opened only during an authorized call” is a software invariant, not a cryptographic constraint. Program logic and access controls enforce when the gateway unseals a credential.',
            'Arguments waiting for approval. Arguments held in the approval queue are encrypted at rest using the per-organization KMS-derived key (see S6). After approval, the gateway must decrypt them into plaintext to forward the call upstream; restricting that decryption to approved calls is likewise a software invariant.',
            'Customer recommendation. Grant upstream credentials stored in Eisoptric the minimum scopes required for the intended tools.',
          ],
        },
        {
          type: 'h3',
          text: 'S4.3 Legacy Credentials & Key Rotation',
        },
        {
          type: 'ul',
          items: [
            '[Fixed] Legacy credential handling. Credentials sealed under the earlier format are never treated as empty values or silently ignored; the backend marks the connection as requiring reconnection, and the console UI prompts the member to sign in and reconnect the server.',
            '[Planned] KMS key version is currently fixed; KMS key rotation is not currently supported — please do not assume rotation support (see S8).',
          ],
        },
        {
          type: 'h3',
          text: 'S4.4 Member Private Keys & Organization Key Backups',
        },
        {
          type: 'ul',
          items: [
            '[Current] Every member has a distinct ML-KEM-1024 private key per organization. The private key seed is wrapped in the browser using a password-derived key before upload; Eisoptric servers never hold the key needed to unwrap it.',
            '[Current] The member wrapping key and the login verifier are derived with distinct domain-separation labels, so the login verifier cannot decrypt the private key. Unlocked private keys remain only in page memory and vanish when the tab closes.',
            '[Current] A 256-bit recovery key can restore the organization key offline in the browser. If both member password backups and the recovery key are lost, the private keys and sealed audit payloads cannot be recovered by anyone, including Eisoptric. This is an intentional design choice.',
            '[Fixed] When a member assists another member by re-wrapping the organization key after a password reset, the browser fetches a fresh copy of the target member’s public key and verifies its SHA-256 fingerprint before encapsulating, aborting on any mismatch to prevent key-substitution attacks.',
            '[Current] Limitation on member removal: Removing a member prevents future audit records from being wrapped to their key, but historical records already wrapped to their public key remain readable to anyone holding that member’s private key and backup. Removal revokes future access, not past access.',
            '[Open] Regular authenticated members of an organization can currently download the encrypted ciphertext (not plaintext) of the organization key backup via the API. If the wrapping secret were weak, this would widen the offline attack surface.',
            '[Planned] Restrict downloading the organization key backup ciphertext to organization administrators only.',
          ],
        },
      ],
    },
    {
      heading: 'S5. Policy Engine',
      blocks: [
        {
          type: 'h3',
          text: 'S5.1 Evaluation Model',
        },
        {
          type: 'ul',
          items: [
            '[Current] Every tool call is evaluated against the policies applicable to the calling agent. Rules resolve to allow, deny, or approval required.',
            '[Current] Two layers of control: tool-level governance decides whether a tool is exposed and whether it runs automatically as Call or requires human confirmation as Approval; argument-level conditions constrain the arguments of allowed calls (for example, requiring approval when amount > 5000 and binding the approval to those exact arguments). Every account can use both.',
            '[Current] Policies are versioned, and every audit record logs the exact policy version evaluated. Policies drafted with LLM assistance never activate automatically and require human confirmation.',
          ],
        },
        {
          type: 'h3',
          text: 'S5.2 Approval Workflow & Structured Errors',
        },
        {
          type: 'ol',
          items: [
            'When policy evaluation requires approval, the agent receives an action ID (gatewayRunId) and the call enters the approval queue.',
            'Reviewers in the console inspect that specific call and its exact arguments.',
            'Approving the request does not execute the tool. The agent must resubmit with the same action ID, and the gateway re-checks three invariants: whether the approval has expired, whether current policy still allows the call, and whether the resubmitted arguments match the approved arguments. Any mismatch is rejected.',
            'Approval outcomes trigger signed webhooks. Webhooks only notify; they never execute the tool.',
          ],
        },
        {
          type: 'p',
          text: 'Example: An agent submits a $5,800 payment and a manager approves it. If the agent resubmits with the amount changed to $58,000, the gateway rejects the call because the arguments no longer match the approved digest.',
        },
        {
          type: 'p',
          text: '[Fixed] Blocked calls return a structured error: `reason`, `policy_id`, and `how_to_allow`. It never returns the approved arguments or argument digests; `how_to_allow` only directs how to submit an approval request and cannot be used to modify policies.',
        },
        {
          type: 'h3',
          text: 'S5.3 Default Behavior',
        },
        {
          type: 'ul',
          items: [
            '[Fixed] Tool-level default deny: Tools without a matching rule are denied. If an agent calls a tool that has no matching rule, evaluation resolves to deny — protecting organizations when an upstream server introduces new tools not yet covered by existing rules.',
            '[Fixed] Default deny when no applicable policy exists. Previously, an agent with no applicable policy at all was allowed through; now, when no applicable policy exists for an agent, the policy engine evaluates to deny (fail-closed), and default policies are provisioned automatically during organization setup and server connection.',
          ],
        },
      ],
    },
    {
      heading: 'S6. Audit & Zero-Access Encryption',
      blocks: [
        {
          type: 'p',
          text: 'Eisoptric uses zero-access encryption for stored audit payloads. The gateway processes plaintext while forwarding a tool call; before writing the audit record, the payload is wrapped with ML-KEM-1024 to the organization key and each member’s public key, and the data key is deleted immediately. Thereafter, Eisoptric servers cannot decrypt the stored payload — only authorized members can open it in the browser.',
        },
        {
          type: 'p',
          text: 'Zero-access encryption is not end-to-end encryption. The gateway can read the payload at the moment of the call; if the gateway were compromised, subsequent calls could be exposed, while previously archived records remain protected. Content waiting for approval and active runs are encrypted separately with a server-side key and retained for 7 days, outside the scope of zero-access encryption.',
        },
        {
          type: 'table',
          head: ['Data', 'Encryption', 'Readable by Gateway After Write?', 'Retention'],
          rows: [
            [
              'Stored audit payloads',
              'AES-256-GCM data key, wrapped with ML-KEM-1024 + HKDF-SHA384 to the organization key and each active member key; data key deleted immediately after write',
              'No',
              'Long-term',
            ],
            [
              'In-flight content (arguments waiting for approval, active runs)',
              'AES-256-GCM with key derived per organization via Cloud KMS MAC',
              'Yes (to resume approvals and forward calls)',
              'Expires after 7 days',
            ],
            [
              'Upstream credentials',
              'ML-KEM-1024 + HKDF-SHA384 + AES-256-GCM with key derived per tenant via KMS MAC',
              'Opened only while completing an authorized call',
              'Long-term',
            ],
          ],
        },
        {
          type: 'h3',
          text: 'S6.1 What Is Recorded',
        },
        {
          type: 'ul',
          items: [
            '[Current] Every call writes an audit row. Plaintext searchable columns include caller, tool, policy version, decision, encryption status, and content hash.',
            '[Current] Stored call arguments, upstream request, upstream response, server result, and agent result are sealed in a zero-access envelope (org-mlkem1024-v1).',
            '[Current] When an organization has no usable ML-KEM key, audit payload content is not written and the audit row records encryption unavailable — never falling back to plaintext storage.',
          ],
        },
        {
          type: 'h3',
          text: 'S6.2 How the Two Encryption Layers Work',
        },
        {
          type: 'ul',
          items: [
            '[Current] Layer 1 (Stored audit payloads, zero-access encryption): For each audit event, the gateway draws a random 32-byte data key, encrypts the canonical JSON with AES-256-GCM (binding organization ID, record ID, payload type, and format version 1 as AAD), encapsulates to the organization public key and each active member public key via ML-KEM-1024 and HKDF-SHA384 (info eisoptric-payload-mlkem1024-v1), and deletes the data key immediately after writing. Platform admin APIs also strip all sealed envelopes.',
            '[Current] Layer 2 (In-flight content waiting for approval or execution, 7-day server-side encryption): Because the gateway must display pending arguments for review and forward them upstream once approved, pending approval arguments and active run state are encrypted with AES-256-GCM (prefix s2.) using a symmetric key derived per organization via Cloud KMS MAC, expiring automatically after 7 days.',
          ],
        },
        {
          type: 'h3',
          text: 'S6.3 Integrity',
        },
        {
          type: 'ul',
          items: [
            '[Current] Per-record hash. Every audit record stores a SHA-256 hash of the canonical JSON payload so the browser can verify single-record integrity after decryption.',
            '[Fixed] Atomic sequence numbers. Previously, sequence numbers were computed as current count plus one, which could collide under concurrency or hide gaps after deletions. Sequence numbers are now issued from an atomic counter table, preventing duplicates under concurrent writes.',
            '[Open] No cryptographic hash chain or external anchoring. Audit rows are not cryptographically linked to one another. Anyone with direct database write access could delete, reorder, or truncate rows without cryptographic detection; integrity currently protects individual rows rather than the log as a whole.',
            '[Open] Unkeyed content hash. The stored content_sha256 is an unsalted, unkeyed SHA-256 digest of canonical JSON. Someone with database read access can test candidate guesses against low-entropy payloads (such as fixed amounts, booleans, or short enums).',
            '[Planned] Add a tamper-evident hash chain where each row commits to the previous row’s digest and periodically anchor chain heads to external storage outside operator control; replace the unkeyed content digest with a keyed MAC or rely solely on the AES-GCM authentication tag.',
          ],
        },
      ],
    },
    {
      heading: 'S7. Deployment Boundary & Rate Limiting',
      blocks: [
        {
          type: 'h3',
          text: 'S7.1 Current Posture',
        },
        {
          type: 'ul',
          items: [
            '[Current] Services run on Google Cloud Run behind Cloudflare on public domains (WAF, bot protection, edge rate limiting). Only HTTPS is exposed, accepting only TLS 1.2 and 1.3.',
            '[Current] Every API and dashboard response includes strict security headers: CSP, HSTS, X-Frame-Options: DENY, locked-down Permissions-Policy, and X-Content-Type-Options. API CORS permits only Eisoptric’s own dashboard origin, and interactive API documentation is disabled in production.',
          ],
        },
        {
          type: 'h3',
          text: 'S7.2 Fixed Items',
        },
        {
          type: 'ul',
          items: [
            "[Fixed] Marketing site security headers. HSTS, CSP (script-src 'self', object-src 'none', frame-ancestors 'none'), clickjacking protection, and Permissions-Policy are enforced across the public website.",
            '[Fixed] Self-hosted cryptography bundles. External CDN script dependencies have been removed; all cryptographic and application scripts are bundled and served from Eisoptric’s own domain under strict CSP. The OAuth sign-in page likewise self-hosts its hashing bundle and fails closed if the bundle cannot load.',
            '[Fixed] Application-layer Cloudflare origin header verification. Previously, requests sent directly to the Cloud Run origin bypassed Cloudflare WAF; now both backend and frontend verify a Cloudflare-injected origin header in constant time at the application layer and reject requests without it with HTTP 403. Stated precisely: the origin remains reachable at the network layer, and requests bypassing Cloudflare are rejected at the application layer.',
            '[Fixed] Rate limiting uses the real client IP header provided by Cloudflare and shares counters across instances in Redis; when shared storage (Redis) is unreachable, authentication endpoints (sign-in, migration sign-in, registration, and dynamic client registration) fail closed and reject requests rather than falling back to per-instance memory.',
            '[Fixed] Deployment workflows are gated on automated test and type-check jobs passing before deploying to Cloud Run.',
          ],
        },
        {
          type: 'h3',
          text: 'S7.3 Remaining Boundaries & Planned Items',
        },
        {
          type: 'p',
          text: 'With self-hosted cryptography bundles in place, we assume the code served from Eisoptric’s own domain is trustworthy; the remaining boundary is supply-chain integrity of Eisoptric’s build and release pipeline.',
        },
        {
          type: 'ul',
          items: [
            '[Planned] Remove the remaining inline script allowance from the OAuth sign-in page CSP.',
            '[Planned] Restrict Cloud Run ingress at the network layer (for example via load balancer ingress or authenticated origin pulls) as a second layer alongside application-layer origin header verification.',
          ],
        },
      ],
    },
    {
      heading: 'S8. Cryptographic Notes',
      blocks: [
        {
          type: 'table',
          head: ['Purpose', 'Algorithm', 'Post-Quantum?'],
          rows: [
            [
              'Stored Audit Payloads (org-mlkem1024-v1)',
              'Random 32-byte AES-256-GCM data key wrapped via ML-KEM-1024 + HKDF-SHA384 to organization and member public keys; data key deleted after write',
              'Yes',
            ],
            [
              'In-Flight Content (s2., pending approval & active runs)',
              'AES-256-GCM with key derived per organization via Cloud KMS MAC (7-day TTL)',
              'No',
            ],
            [
              'Upstream Credential Vault (pq2.)',
              'ML-KEM-1024 → HKDF-SHA384 → AES-256-GCM with key derived per tenant via KMS MAC',
              'Yes',
            ],
            [
              'Member Private Key Backup',
              'ML-KEM-1024 wrapped in browser with password-derived key (PBKDF2-HMAC-SHA256 600,000 iterations + AES-256-GCM)',
              'Yes',
            ],
            [
              'Organization Key Recovery Backup',
              'ML-KEM-1024 wrapped with 256-bit recovery key via HKDF-SHA256 + AES-256-GCM',
              'Yes',
            ],
            [
              'TOTP Secret Storage',
              'Server-side authenticated symmetric encryption at rest in database (never stored in plaintext)',
              'No',
            ],
            [
              'Member Sign-In',
              'Browser-side Argon2id + HKDF (v2.); server-side Argon2id with per-account random salt',
              'N/A',
            ],
            ['Per-Record Audit Integrity', 'SHA-256 over canonical JSON', 'N/A'],
          ],
        },
        {
          type: 'ul',
          items: [
            'FIPS 203 is not FIPS 140. Using the FIPS 203 standardized ML-KEM-1024 algorithm means we implement that specification; it does not mean Eisoptric or its cryptographic modules are FIPS 140 validated.',
            'Key rotation is not yet supported. The KMS key version used to derive tenant and organization keys is currently fixed, and there is no automated re-wrapping pipeline for existing ciphertexts. Until that pipeline is built and documented here, KMS key rotation is not supported — please do not assume rotation support.',
            'Memory zeroization. Managed runtime environments do not guarantee deterministic hardware memory erasure after use. We describe keys as discarded and not retained after use, rather than guaranteeing physical memory zeroization.',
            'Legacy envelopes. Earlier audit envelopes wrapped with X25519 remain as-is and are not automatically migrated to ML-KEM.',
          ],
        },
      ],
    },
    {
      heading: 'S9. Compliance Status',
      blocks: [
        {
          type: 'ul',
          items: [
            'This document explains Eisoptric’s architecture and limitations; it is neither a certification nor a third-party audit.',
            'Eisoptric currently holds no compliance certifications. We do not have a SOC 2 report, nor do we claim alignment with ISO 27001, HIPAA, FedRAMP, or any other regulatory framework.',
            'SOC 2 and ISO 27001 readiness work is in preparation, and no external auditor has been engaged yet. Until an auditor is engaged, we do not claim “SOC 2 in progress” or display compliance badges. Our initial target is a point-in-time Type I report once remaining remediation items are complete.',
            'All red-team testing referenced in this paper was conducted internally by Eisoptric and does not substitute for an independent third-party assessment.',
            'Do not infer any compliance claim from this document. Implementing the FIPS 203 algorithm does not constitute FIPS 140 validation (see S8).',
          ],
        },
      ],
    },
    {
      heading: 'S10. Intentional Non-Goals & Remaining Open Items',
      blocks: [
        {
          type: 'p',
          text: 'The items below are things Eisoptric does not do today. We distinguish between intentional architectural non-goals and work that is not yet complete.',
        },
        {
          type: 'h3',
          text: 'Intentional Non-Goals (By Design)',
        },
        {
          type: 'ul',
          items: [
            'We do not prevent prompt injection of an agent’s internal reasoning. Eisoptric governs tool calls, not thoughts.',
            'We do not perform content inspection or DLP. Only declared policy conditions are evaluated.',
            'We do not defend against a compromised member computer or browser.',
            'We do not cryptographically defend against a platform operator holding KMS signing permissions; that boundary is governed by IAM.',
            'In-flight forwarding and pending approvals are not end-to-end encrypted. Archived audit records use zero-access encryption (the gateway cannot decrypt them once the data key is deleted), but the gateway must process plaintext at the moment a tool call is forwarded and retains pending approval arguments encrypted with a server-side key for 7 days to resume execution.',
          ],
        },
        {
          type: 'h3',
          text: 'Not Yet Complete (Open or Planned)',
        },
        {
          type: 'ul',
          items: [
            '[Open] No tamper-evident cryptographic hash chain or external anchoring for audit logs yet, and content hashes are unkeyed SHA-256; integrity currently covers individual rows.',
            '[Open] Regular organization members can still download the encrypted organization key backup ciphertext (not plaintext); restricting download access to administrators is [Planned].',
            '[Planned] Origin requests verify the Cloudflare origin header at the application layer (rejecting direct requests with 403), while network-layer ingress lockdown on Cloud Run remains planned.',
            '[Planned] Automated KMS key rotation and ciphertext re-wrapping are not yet supported.',
            '[Planned] The transmitted login verifier remains password-equivalent; sign-in relies on TLS, server-side Argon2id, and the legacy migration deadline, while PAKE remains under evaluation.',
            '[Current] Eisoptric holds no third-party certifications or external audit reports.',
          ],
        },
      ],
    },
    {
      heading: 'S11. Operations & Incident Response',
      blocks: [
        {
          type: 'ul',
          items: [
            '[Fixed] CI secret scanning: Automated secret scanning (Gitleaks) runs in both backend and frontend CI and deployment workflows, failing the build immediately if credentials or high-entropy secrets are detected.',
            '[Fixed] Deployment gates: Cloud Run deployment workflows require automated test suites and static checks to pass before deployment proceeds.',
            '[Fixed] Key architecture evolution: The earlier shared gateway credential key has been replaced by per-tenant Cloud KMS MAC-derived keys so each tenant’s credential key is isolated and the root key never leaves Cloud KMS.',
            '[Current] KMS key rotation posture: KMS key versions are currently pinned and automated key rotation is not yet supported (do not assume support).',
            '[Current] Vulnerability disclosure & response: Security researchers and customers can report vulnerabilities via our published security.txt and dedicated security mailbox; findings are triaged, patched, verified, and reflected in updates to this whitepaper.',
          ],
        },
      ],
    },
    {
      heading: 'Appendix A. Vulnerability Disclosure',
      blocks: [
        {
          type: 'p',
          text: 'If you discover a potential security vulnerability in Eisoptric MCP Gateway, the console, or Eisoptric Workbench, please report it through the following channels:',
        },
        {
          type: 'ul',
          items: [
            'Email: security@eisoptric.com',
            'Standard security.txt: https://eisoptric.com/.well-known/security.txt',
            'Public disclosure section: The #disclosure section on the Trust page (https://eisoptric.com/trust#disclosure)',
          ],
        },
        {
          type: 'p',
          text: 'Please include reproduction steps, the affected domain or endpoint, and potential impact. We ask that you do not publicly disclose the issue before a fix is deployed and that you do not access or modify tenant data outside your own test accounts.',
        },
      ],
    },
    {
      heading: 'Appendix B. Revision History',
      blocks: [
        {
          type: 'table',
          head: ['Date', 'Version', 'Changes'],
          rows: [
            ['2026-10-16', 'v1', 'Expanded from cryptography paper into full system whitepaper'],
            [
              '2026-10-16',
              'v2',
              'Merged security architecture sections, added status labels, and removed internal identifiers',
            ],
            [
              '2026-10-18',
              'v3',
              'Expanded to full system architecture; updated audit to zero-access encryption distinguished from in-flight content; updated 10/18 fixed items',
            ],
            [
              '2026-11-21',
              'v4',
              'Chinese edition revised for wording and consistent terminology; no change to technical content or statuses',
            ],
          ],
        },
      ],
    },
  ],
}
