// The Eisoptric MCP page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const mcpPage = {
  en: {
    title: 'Eisoptric MCP — The MCP gateway for AI agents',
    description:
      'Eisoptric MCP is the MCP server your AI agents talk to. It exposes only approved tools, checks every call against policy, and records the audit trail.',
    eyebrow: 'Eisoptric MCP · A tool from Eisoptric’s research',
    heading: 'The MCP gateway that decides what your agents may do.',
    lede: 'Eisoptric MCP is the MCP server your agents talk to. Behind it sit your real MCP servers — CRM, payments, databases, cloud consoles. Eisoptric exposes only the tools you approve, evaluates every call against policy, pauses the sensitive ones for a human, and records everything.',
    primary: 'Get started',
    secondary: 'Read the whitepaper',
    note: 'Standards-compliant MCP over HTTP. Works with Claude, ChatGPT, Cursor, Eisoptric Workbench, or any MCP client.',
    howTitle: 'Up and running in four steps.',
    howDesc: 'No SDK, no agent code changes. Eisoptric works at the protocol level.',
    how: [
      [
        'Connect your MCP servers',
        'Register each server by URL. Eisoptric discovers its tools, handles OAuth where needed, and seals the credentials in its vault.',
      ],
      [
        'Build tool sets',
        'Pick the tools each agent should have — across servers. Mark any tool as Call (automatic) or Approval (needs a person).',
      ],
      [
        'Write policies',
        'Add rules with conditions on arguments. Decide per rule: allow, approval required, or deny. Policies are versioned.',
      ],
      [
        'Point agents at Eisoptric',
        'Give every agent the same Eisoptric MCP endpoint. They sign in with OAuth and see only their tool set.',
      ],
    ],
    casesTitle: 'What teams run through Eisoptric.',
    casesDesc: 'Four examples of agents that are useful precisely because they are governed.',
    cases: [
      {
        team: 'Finance operations',
        title: 'An agent that pays vendors — with a human on large amounts',
        body: 'The finance agent reconciles invoices and triggers payments through the payments MCP server. Small transfers run automatically. Anything above the threshold waits for a reviewer, who sees the amount, the recipient, and the invoice reference before approving.',
        rules: [
          'payments.transfer · amount ≤ 1000 → allow',
          'payments.transfer · amount > 1000 → approval required',
          'payments.refund · amount > 10000 → deny',
        ],
      },
      {
        team: 'Customer support',
        title: 'A support agent that can read and reply, but never delete',
        body: 'The support agent gets a tool set with CRM lookup, ticket updates, and email reply. Destructive CRM tools are not in the set, so for this agent they do not exist. Emails to external domains require approval; internal notes go straight through.',
        rules: [
          'crm.get_customer · allow',
          'tickets.update · allow',
          'email.send · recipient not in company domain → approval required',
          'crm.delete_customer · not in tool set',
        ],
      },
      {
        team: 'Platform and DevOps',
        title: 'A release agent that deploys to staging freely, to production with sign-off',
        body: 'The release agent runs rollouts through your deployment MCP server. Staging is automatic. Production rollouts pause for an on-call engineer. Schema-destroying operations are denied outright, regardless of environment.',
        rules: [
          'deploy.rollout · environment == "staging" → allow',
          'deploy.rollout · environment == "production" → approval required',
          'db.drop_table · deny',
        ],
      },
      {
        team: 'Data and analytics',
        title: 'Analyst agents for every team, each confined to its own data',
        body: 'Each team gets analyst agents with read-only warehouse tools. Server mapping decides which teams may attach the warehouse at all. Editors are scoped to their own agents, and every query is attributed to the person the agent acted for.',
        rules: [
          'warehouse.query · allow',
          'warehouse.export · row_count > 100000 → approval required',
          'Marketing accounts · warehouse server not mapped',
        ],
      },
    ],
    capTitle: 'What the gateway handles for you.',
    capDesc: 'Everything between the agent\u2019s request and your upstream server.',
    caps: [
      [
        'Identity',
        'OAuth 2.1 with PKCE for every agent. Each session is bound to a user or an organization; the profile is checked on every request.',
      ],
      [
        'Tool discovery',
        'Register MCP servers by URL. Eisoptric discovers tools, keeps the catalog current, and manages upstream OAuth and token refresh.',
      ],
      [
        'Tool sets',
        'Curated tools per agent, across servers. Only those tools appear in tools/list. Each tool is Call or Approval.',
      ],
      [
        'Policy engine',
        'Ordered, versioned rules with conditions on arguments. Every call records the policy id, version, and matched rule.',
      ],
      [
        'Approval queue',
        'Sensitive calls wait for one reviewer or a group quorum. The agent resumes with gatewayRunId. Approvals expire.',
      ],
      [
        'Credential vault',
        'Upstream tokens and secrets sealed with ML-KEM-1024 and AES-256-GCM. Agents never see them; every read is audited.',
      ],
      [
        'Audit trail',
        'Governance events stay searchable. Stored audit payloads use zero-access encryption and open only in a member’s browser, while the gateway processes plaintext in flight.',
      ],
      [
        'Signed webhooks',
        'Approval granted, rejected, and expired are signed with HMAC-SHA256. A successful delivery does not execute the tool.',
      ],
    ],
    secTitle: 'Security built into the request path.',
    secDesc:
      'An agent can never obtain more than the result of an authorized call. These are the mechanisms behind that guarantee.',
    sec: [
      [
        'Post-quantum credential vault',
        'Access tokens, refresh tokens, and client secrets are sealed individually with ML-KEM-1024 key encapsulation and AES-256-GCM, keys derived via HKDF-SHA384. The key seed lives in configuration, never in the database.',
      ],
      [
        'No plaintext over the API',
        'Console and client APIs report whether a secret exists — never its value. Every secret read generates a credential_accessed audit event.',
      ],
      [
        'Managed upstream OAuth',
        'Eisoptric discovers the authorization server, performs dynamic client registration where supported, uses PKCE, and refreshes tokens automatically when an upstream returns 401.',
      ],
      [
        'Network boundaries',
        'Upstream URLs must use HTTPS (or HTTP on localhost). Private, link-local, and cloud metadata addresses are refused.',
      ],
      [
        'Denied means never sent',
        'A denied call never leaves Eisoptric. A held call returns approval_required with a reference id. A paused agent cannot start a call.',
      ],
      [
        'Role-based access control',
        'Four console resources, three access levels each. Preset roles admin, operator, viewer, or custom sets. Editors can be scoped to specific agents.',
      ],
    ],
    ctaTitle: 'Put Eisoptric in front of your first MCP server today.',
    ctaBody:
      'Create a free account, connect a server, and write one rule. The first approval request shows you the whole path.',
  },
  zh: {
    title: 'Eisoptric MCP — AI 代理的 MCP 閘道',
    description:
      'Eisoptric MCP 是代理實際連線的 MCP 伺服器。它只開放經核准的工具，以政策評估每一次呼叫，並保留稽核紀錄。',
    eyebrow: 'Eisoptric MCP · 源自 Eisoptric 研究的工具',
    heading: '界定代理權限的 MCP 閘道。',
    lede: 'Eisoptric MCP 是代理實際連線的 MCP 伺服器，其後才是你真正的 MCP 伺服器，例如 CRM、付款系統、資料庫與雲端主控台。Eisoptric 只開放你核准的工具，以政策評估每一次呼叫，將敏感操作暫停並交由人審核，並完整記錄。',
    primary: '開始使用',
    secondary: '閱讀白皮書',
    note: '符合標準的 HTTP MCP，相容 Claude、ChatGPT、Cursor、Eisoptric Workbench 及任何 MCP 用戶端。',
    howTitle: '四個步驟即可運作。',
    howDesc: '不需要 SDK，也不需要修改代理的程式碼。Eisoptric 在協定層運作。',
    how: [
      ['連接 MCP 伺服器', '以 URL 註冊每一台伺服器。Eisoptric 自動探索其工具，必要時處理 OAuth，並將憑證封存於金庫。'],
      ['建立工具集', '跨伺服器選取每個代理應具備的工具。任一工具可設為 Call（自動執行）或 Approval（需人工核准）。'],
      ['撰寫政策', '加入可對參數設定條件的規則。每條規則判定為允許、需要核准或拒絕。政策具版本控制。'],
      ['將代理指向 Eisoptric', '所有代理皆使用同一個 Eisoptric MCP 端點，以 OAuth 登入，且只能看見各自的工具集。'],
    ],
    casesTitle: '透過 Eisoptric 運作的實際情境。',
    casesDesc: '四個例子：這些代理之所以可用，正是因為它們受到治理。',
    cases: [
      {
        team: '財務營運',
        title: '支付供應商款項的代理，大額由人把關',
        body: '財務代理負責對帳，並透過付款 MCP 伺服器發起付款。小額轉帳自動執行；超過門檻的金額則等待審核人員，核准前可檢視金額、收款對象與發票編號。',
        rules: [
          'payments.transfer · amount ≤ 1000 → 允許',
          'payments.transfer · amount > 1000 → 需要核准',
          'payments.refund · amount > 10000 → 拒絕',
        ],
      },
      {
        team: '客戶支援',
        title: '能查詢、能回覆，但無法刪除資料的客服代理',
        body: '客服代理的工具集包含 CRM 查詢、工單更新與郵件回覆。具破壞性的 CRM 工具不在工具集中，對此代理而言並不存在。寄往外部網域的郵件需要核准；內部備註則直接通過。',
        rules: [
          'crm.get_customer · 允許',
          'tickets.update · 允許',
          'email.send · 收件人非公司網域 → 需要核准',
          'crm.delete_customer · 不在工具集',
        ],
      },
      {
        team: '平台與 DevOps',
        title: '可自行部署至 staging、部署至 production 須經簽核的發布代理',
        body: '發布代理透過部署 MCP 伺服器執行 rollout。Staging 自動執行；production rollout 則暫停，等待值班工程師核准。破壞 schema 的操作無論環境一律拒絕。',
        rules: [
          'deploy.rollout · environment == "staging" → 允許',
          'deploy.rollout · environment == "production" → 需要核准',
          'db.drop_table · 拒絕',
        ],
      },
      {
        team: '資料與分析',
        title: '各團隊皆有分析代理，且只能存取各自的資料',
        body: '每個團隊的分析代理皆取得唯讀的資料倉儲工具。伺服器對應決定哪些團隊可以連接倉儲。編輯者僅能管理所屬團隊的代理，每一筆查詢皆歸屬到代理所代表的使用者。',
        rules: [
          'warehouse.query · 允許',
          'warehouse.export · row_count > 100000 → 需要核准',
          '行銷部帳號 · 未對應倉儲伺服器',
        ],
      },
    ],
    capTitle: '閘道負責的工作。',
    capDesc: '從代理發出請求，到上游伺服器之間的一切。',
    caps: [
      ['身分驗證', '每個代理皆採用 OAuth 2.1 搭配 PKCE。工作階段綁定至使用者或組織；每一筆請求都會檢查其設定檔。'],
      ['工具探索', '以 URL 註冊 MCP 伺服器。Eisoptric 自動探索工具、維護目錄，並代管上游 OAuth 與權杖更新。'],
      ['工具集', '為每個代理跨伺服器選取工具。只有這些工具會出現在 tools/list，每個工具設為 Call 或 Approval。'],
      ['政策引擎', '有順序、有版本、可對參數設定條件的規則。每一次呼叫皆記錄政策 ID、版本與命中的規則。'],
      ['核准佇列', '敏感呼叫等待一位審核者，或一個群組的門檻。代理以 gatewayRunId 重新送出。核准具有效期限。'],
      ['憑證金庫', '上游權杖與密鑰以 ML-KEM-1024 與 AES-256-GCM 封存。代理無法取得，每一次讀取皆留有稽核紀錄。'],
      [
        '稽核紀錄',
        '治理事件可供搜尋。已儲存的稽核內容採零存取加密，寫入後僅能在成員的瀏覽器中解密（閘道於呼叫當下會處理明文）。',
      ],
      ['簽章 Webhook', '核准、駁回與逾期皆以 HMAC-SHA256 簽章通知。通知送達成功並不會執行工具。'],
    ],
    secTitle: '安全機制內建於請求路徑。',
    secDesc: '代理所能取得的，永遠不超過「一筆經授權呼叫的結果」。以下是支撐此保證的機制。',
    sec: [
      [
        '後量子憑證金庫',
        '存取權杖、更新權杖與用戶端密鑰逐一封存：以 ML-KEM-1024 封裝金鑰，搭配 AES-256-GCM，金鑰以 HKDF-SHA384 推導。金鑰種子存放於設定中，不寫入資料庫。',
      ],
      [
        'API 不傳回明文',
        '主控台與用戶端 API 只回報密鑰是否存在，不傳回其內容。每一次讀取皆產生 credential_accessed 稽核事件。',
      ],
      [
        '代管上游 OAuth',
        'Eisoptric 自動找出授權伺服器，於支援時進行動態用戶端註冊，使用 PKCE，並在上游回傳 401 時自動更新權杖。',
      ],
      [
        '網路邊界',
        '上游 URL 必須使用 HTTPS（或僅限 localhost 的 HTTP）。私有網段、link-local 與雲端 metadata 位址一律拒絕。',
      ],
      [
        '拒絕即不轉送',
        '遭拒絕的呼叫不會離開 Eisoptric。暫緩的呼叫回傳 approval_required 與參考 ID。已暫停的代理無法發起呼叫。',
      ],
      [
        '角色型存取控制',
        '主控台涵蓋四類資源，各有三種存取等級。預設角色為 admin、operator、viewer，亦可自訂組合。編輯者可限定於特定代理。',
      ],
    ],
    ctaTitle: '將 Eisoptric 部署在第一台 MCP 伺服器之前。',
    ctaBody: '建立免費帳號、連接一台伺服器、撰寫一條規則。第一筆核准請求即可呈現完整的請求路徑。',
  },
} as const

export const features = {
  en: {
    title: 'Everything you need to run AI agents in production.',
    desc: 'Eisoptric covers the full lifecycle of a tool call: identity, access, policy, approval, execution, and audit.',
    items: [
      {
        num: '01',
        code: false,
        eyebrow: 'Unified MCP gateway',
        title: 'One endpoint for all your agents and tools',
        points: [
          'Standards-compliant MCP endpoint over HTTP — initialize, tools/list, and tools/call',
          'OAuth 2.1 with PKCE for every agent connection, bound to a user or an organization',
          'Register any MCP server by URL; Eisoptric discovers and catalogs its tools automatically',
          'Managed upstream OAuth with dynamic client registration and automatic token refresh',
        ],
      },
      {
        num: '02',
        eyebrow: 'Fine-grained access control',
        title: 'Permissions down to the argument level',
        points: [
          'Tool sets: choose exactly which tools each agent can see in tools/list',
          'Per-tool mode: mark any tool as Call (automatic) or Approval (human-confirmed)',
          'Policy rules with conditions on arguments — amount > 1000, environment == "production"',
          'Versioned policies with full change history, evaluated on every single call',
        ],
        code: true,
      },
      {
        num: '03',
        code: false,
        eyebrow: 'Human-in-the-loop',
        title: 'Approvals built into the request path',
        points: [
          'Sensitive calls pause until one reviewer approves, or until every required group reaches its quorum',
          'After approval, the agent resumes that same task by passing gatewayRunId on the tool call',
          'Pending approvals expire, and so does the window for the agent to resubmit',
          'Signed webhooks report granted, rejected, and expired. A webhook response does not run the tool',
        ],
      },
      {
        num: '04',
        code: false,
        eyebrow: 'Enterprise-grade security',
        title: 'Secrets never leave the gateway',
        points: [
          'Upstream tokens stay in a vault sealed with ML-KEM-1024 and AES-256-GCM',
          'Stored audit payloads use zero-access encryption: wrapped to the organization key and each member’s public key before the data key is deleted (the gateway processes plaintext in flight and encrypts pending approvals with a server-side key for 7 days)',
          'A member’s private key is encrypted with a key derived from their password. Eisoptric cannot unwrap it',
          'A recovery key, never uploaded, restores the organization key. Another member can rewrap records after a password reset',
        ],
      },
      {
        num: '05',
        code: false,
        eyebrow: 'Audit',
        title: 'See the decision without storing the raw payload in the clear',
        points: [
          'Every step is an event: requested, evaluated, approval requested, granted or rejected, executed',
          'The console keeps who called, which tool, the policy version, and the decision',
          'An authorized member decrypts the raw request and response in the browser after signing in',
          'Every account keeps unlimited audit history. Authorized members decrypt raw payloads in the browser',
        ],
      },
      {
        num: '06',
        code: false,
        eyebrow: 'Team and role management',
        title: 'Built for organizations, not just individuals',
        points: [
          'Groups and a quorum hold a high-risk call until enough people approve',
          'One person’s vote counts in every group they belong to',
          'Scope editors to specific agents so teams only manage what they own',
          'Map which MCP servers each employee is allowed to connect',
        ],
      },
    ],
    caption: 'A policy as the engine evaluates it. Conditions are matched against the arguments of each call.',
  },
  zh: {
    title: '在正式環境運行 AI 代理所需的機制。',
    desc: 'Eisoptric 涵蓋一次工具呼叫的完整生命週期：身分驗證、存取、政策、核准、執行與稽核。',
    items: [
      {
        num: '01',
        code: false,
        eyebrow: '統一的 MCP 閘道',
        title: '所有代理與工具共用一個端點',
        points: [
          '符合標準的 HTTP MCP 端點，支援 initialize、tools/list 與 tools/call',
          '每一條代理連線皆採用 OAuth 2.1 搭配 PKCE，並綁定至使用者或組織',
          '以 URL 註冊任何 MCP 伺服器，Eisoptric 自動探索並建立工具目錄',
          '代管上游 OAuth：動態用戶端註冊與權杖自動更新',
        ],
      },
      {
        num: '02',
        eyebrow: '細緻的存取控制',
        title: '權限細緻至參數層級',
        points: [
          '工具集：明確指定每個代理在 tools/list 中可見的工具',
          '逐一設定工具模式：任一工具可設為 Call（自動執行）或 Approval（需人工確認）',
          '政策規則可對參數設定條件，例如 amount > 1000、environment == "production"',
          '政策具版本控制與完整變更紀錄，每一次呼叫皆重新評估',
        ],
        code: true,
      },
      {
        num: '03',
        code: false,
        eyebrow: '人工審核',
        title: '核准流程內建於請求路徑',
        points: [
          '敏感呼叫將暫停，直到一位審核者核准，或每個必要群組皆達到門檻',
          '核准後，代理於同一次工具呼叫附上 gatewayRunId，即可重新送出原本的任務',
          '待核准項目具有效期限，核准後可重新送出的時間亦有期限',
          '以簽章 Webhook 通知核准、駁回與逾期。Webhook 回應成功並不會執行工具',
        ],
      },
      {
        num: '04',
        code: false,
        eyebrow: '安全設計',
        title: '密鑰不離開閘道',
        points: [
          '上游權杖封存於以 ML-KEM-1024 與 AES-256-GCM 保護的金庫',
          '已儲存的稽核內容採零存取加密：以組織金鑰與每位成員的公鑰封裝後即刪除資料金鑰（閘道於轉送當下處理明文；待核准與執行中的內容則以伺服器端金鑰加密保存 7 天）',
          '成員私鑰僅以登入密碼衍生的金鑰封存，Eisoptric 無法解開',
          '復原金鑰僅產生一次，且不會上傳。成員重設密碼後，其他成員可協助重新封裝歷史紀錄',
        ],
      },
      {
        num: '05',
        code: false,
        eyebrow: '稽核',
        title: '判定結果可見，原始內容不以明文保存',
        points: [
          '每一步皆為事件：requested、evaluated、approval requested、granted 或 rejected、executed',
          '主控台保留呼叫者、工具、政策版本與判定結果',
          '具權限的成員登入後，於瀏覽器中解密原始請求與回應',
          '每個帳號皆保留完整稽核紀錄，不設上限',
        ],
      },
      {
        num: '06',
        code: false,
        eyebrow: '團隊與角色管理',
        title: '為組織設計，而非僅供個人使用',
        points: [
          '群組與多人門檻：高風險呼叫須取得足夠核准後才放行',
          '一位成員的核准，計入其所屬的每一個群組',
          '編輯者可限定於特定代理，各團隊僅管理自己的範圍',
          '設定每位成員可連接哪些 MCP 伺服器',
        ],
      },
    ],
    caption: '政策引擎實際評估的規則範例。條件將與每一次呼叫的參數比對。',
  },
} as const

export const compare = {
  en: {
    title: 'Why a dedicated MCP gateway?',
    desc: 'API gateways govern services. Eisoptric governs agents — a caller that reasons, chooses tools, and needs to be stopped sometimes.',
    columns: [
      {
        name: 'Direct connection',
        ours: false,
        items: [
          'Agent holds every credential',
          'Every tool on the server is exposed',
          'No approval step',
          'No central audit trail',
        ],
      },
      {
        name: 'API gateway',
        ours: false,
        items: [
          'Sees routes and methods, not tools',
          'No conditions on tool arguments',
          'No human approval workflow',
          'Designed for services, not agents',
        ],
      },
      {
        name: 'Eisoptric',
        ours: true,
        items: [
          'Credentials sealed in the gateway',
          'Tool sets and argument-level policy',
          'Built-in approval queue',
          'One audit trail for every agent',
        ],
      },
    ],
  },
  zh: {
    title: '為何需要專屬的 MCP 閘道？',
    desc: 'API 閘道治理的是服務；Eisoptric 治理的是代理，一個會推理、會選擇工具，且有時必須被叫停的呼叫者。',
    columns: [
      {
        name: '直接連接',
        ours: false,
        items: ['代理持有所有憑證', '伺服器上的所有工具皆對外開放', '沒有核准步驟', '沒有集中的稽核紀錄'],
      },
      {
        name: 'API 閘道',
        ours: false,
        items: [
          '只辨識路徑與方法，不辨識工具',
          '無法對工具參數設定條件',
          '沒有人工核准流程',
          '為服務而設計，而非為代理',
        ],
      },
      {
        name: 'Eisoptric',
        ours: true,
        items: ['憑證封存於閘道', '工具集與參數層級的政策', '內建核准佇列', '所有代理共用一份稽核紀錄'],
      },
    ],
  },
} as const

export const console = {
  en: {
    title: 'One console for every agent in your organization.',
    desc: 'Eisoptric Console gives security, platform, and operations teams a shared view of what agents can do and what they have done.',
    items: [
      ['Overview', 'Active agents, pending approvals, recent denials, and spend at a glance.'],
      ['Agents', 'Register agents, assign tool sets, pause or resume, and scope who may edit them.'],
      ['Eisoptric MCP', 'Connect MCP servers, review discovered tools, and build tool sets.'],
      ['Policy', 'Author and version rules; see which policy decided each call.'],
      ['Intervention', 'Approve or reject a call. Multi-approver tasks wait until every required group is done.'],
      ['Resubmit', 'Approved tasks wait on their own page until the agent calls the tool again with gatewayRunId.'],
      ['Audit', 'Search governance events. Raw requests and responses open only in an authorized member’s browser.'],
      ['Webhooks', 'Signed notices for approval granted, rejected, and expired. Delivery does not execute the tool.'],
      ['Identity', 'Members, roles, custom permissions, and MCP server mapping per employee.'],
    ],
  },
  zh: {
    title: '以單一主控台管理組織內的所有代理。',
    desc: 'Eisoptric 主控台讓資安、平台與營運團隊掌握同一份資訊：代理能做什麼，以及實際做了什麼。',
    items: [
      ['總覽', '一覽運作中的代理、待核准項目、近期的拒絕紀錄與花費。'],
      ['代理', '註冊代理、指派工具集、暫停或恢復，並設定編輯權限。'],
      ['Eisoptric MCP', '連接 MCP 伺服器、檢視探索到的工具，並建立工具集。'],
      ['政策', '撰寫規則並進行版本控制；檢視每一次呼叫由哪條政策判定。'],
      ['審核', '核准或駁回一次呼叫。多人核准將等候每個必要群組完成。'],
      ['重新送出', '已核准的任務保留於專屬頁面，直到代理附上 gatewayRunId 再次呼叫。'],
      ['稽核', '搜尋治理事件。原始請求與回應僅能於具權限成員的瀏覽器中解密。'],
      ['Webhook', '核准、駁回與逾期時送出簽章通知。通知送達成功並不會執行工具。'],
      ['身分', '成員、角色、自訂權限，以及每位成員可連接的 MCP 伺服器。'],
    ],
  },
} as const
