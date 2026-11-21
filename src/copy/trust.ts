// The Trust page. The whitepaper itself is in src/trust-paper/. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const trustPage = {
  en: {
    title: 'Eisoptric Trust — How keys, payloads, and credentials are protected',
    description:
      'Eisoptric uses zero-access encryption (AES-256-GCM and ML-KEM-1024) for stored audit payloads. Passwords are hashed in the browser before they reach the gateway. Eisoptric cannot unwrap member private keys.',
    eyebrow: 'Trust',
    heading: 'The gateway can run the call. It cannot read the sealed audit payload.',
    lede: 'Stored audit payloads (arguments, upstream request and response, and the downstream result) use zero-access encryption: sealed with AES-256-GCM, wrapped with ML-KEM-1024 to public keys Eisoptric does not hold, with the data key deleted immediately after writing.',
    layersTitle: 'Three protections, kept apart.',
    layersDesc: 'A password, a member private key, and a stored audit payload never share one secret.',
    layers: [
      [
        'Sign-in',
        'The browser hashes the password before sending it. Eisoptric hashes that value again with PBKDF2 and never stores the password.',
      ],
      [
        'Member private key',
        'A different key, derived only in the browser, wraps the ML-KEM private key. The sign-in hash cannot open it.',
      ],
      [
        'Tool payloads',
        'The gateway processes plaintext in flight to forward the call, then encrypts the audit payload with a random AES-256-GCM data key, wraps it with ML-KEM-1024 to the organization and member keys, and deletes the data key.',
      ],
      [
        'Upstream credentials',
        'Access tokens and client secrets are sealed with the gateway’s own ML-KEM-1024 key, so an authorized call can be completed. Agents never receive the secret.',
      ],
    ],
    envelopeTitle: 'One envelope for the whole call.',
    envelopeDesc:
      'These fields are sealed with zero-access encryption (ML-KEM-1024-HKDF-SHA384-AES-256-GCM) when archived; pending approvals and active runs use a server-side KMS-derived key for 7 days.',
    envelope: [
      ['Arguments', 'The parameters the agent sent with the tool call.'],
      ['Upstream request', 'The request Eisoptric forwarded to the tool.'],
      ['Upstream response', 'The raw body that came back from the tool.'],
      ['Downstream result', 'The result Eisoptric returned to the agent.'],
    ],
    holdTitle: 'What Eisoptric can and cannot open.',
    cannotTitle: 'Eisoptric cannot open',
    cannot: [
      'Organization or member private keys',
      'The recovery key',
      'The password, or the key that wraps a member private key',
      'A stored audit payload after its data key is deleted',
    ],
    canTitle: 'Eisoptric can open',
    can: [
      'Who called, which tool, the policy version, and the decision',
      'Plaintext in flight while forwarding a tool call, and in-flight content (pending approvals and active runs) encrypted with a server-side key for 7 days',
      'An upstream credential, only for the duration of an authorized call',
      'Whether a secret exists — never its value — on console APIs',
    ],
    faqTitle: 'Questions',
    faq: [
      [
        'Can Eisoptric decrypt an audit payload?',
        'Not after it is written to the audit log. Eisoptric processes plaintext in flight when forwarding a tool call; before archival, the data key is wrapped with ML-KEM-1024 to the organization and member public keys and immediately deleted. In-flight content waiting for approval or execution is encrypted separately with a server-side key for 7 days.',
      ],
      [
        'Does the sign-in password unlock the private key on the server?',
        'No. The value sent at sign-in is a hash. The private key is wrapped with a different key that never leaves the browser.',
      ],
      [
        'Do agents see API keys or OAuth tokens?',
        'No. Those secrets stay in the credential vault. Agents receive only the result of an authorized call.',
      ],
      [
        'What if the organization has no payload key yet?',
        'New tool content is not stored. The audit row records that encryption is unavailable, not the plaintext.',
      ],
    ],
    ctaTitle: 'See it on your own tools.',
    ctaBody: 'Connect one MCP server and open an encrypted audit record from the browser.',
    paperLink: 'Read the whitepaper',
    disclosureTitle: 'Disclosure',
    disclosureBody:
      'Vulnerability reporting instructions will be published here. Until then, email security@eisoptric.com.',
  },
  zh: {
    title: '信任與安全 — 金鑰、呼叫內容與憑證的保護方式',
    description:
      'Eisoptric 對已儲存的稽核內容採用零存取加密（AES-256-GCM 與 ML-KEM-1024）。密碼在送往閘道之前先於瀏覽器中雜湊。Eisoptric 無法解開成員私鑰。',
    eyebrow: '信任與安全',
    heading: '閘道於呼叫當下轉送請求；稽核內容一經封存寫入，閘道即無法讀取。',
    lede: '已儲存的稽核內容（工具參數、上游請求與回應、交回代理的結果）採零存取加密：以 AES-256-GCM 封存，再以 ML-KEM-1024 將資料金鑰封裝給 Eisoptric 不持有的公鑰，隨即刪除資料金鑰。',
    layersTitle: '各自獨立的保護層。',
    layersDesc: '密碼、成員私鑰與已封存的稽核內容，不共用同一項秘密。',
    layers: [
      ['登入', '瀏覽器先將密碼雜湊後再送出，Eisoptric 再以 PBKDF2 雜湊一次，不保存密碼本身。'],
      ['成員私鑰', 'ML-KEM 私鑰由另一把僅在瀏覽器中衍生的金鑰封裝，登入用的雜湊無法解開。'],
      [
        '工具呼叫內容',
        '閘道於轉送呼叫時處理明文；寫入稽核紀錄之前，以隨機的 AES-256-GCM 資料金鑰加密，並以 ML-KEM-1024 封裝給組織與每位成員的公鑰，隨即刪除資料金鑰。',
      ],
      [
        '上游憑證',
        '存取權杖與用戶端密鑰以閘道自有的 ML-KEM-1024 金鑰封存，僅於完成經授權的呼叫時使用。代理無法取得密鑰。',
      ],
    ],
    envelopeTitle: '一次呼叫，一個信封。',
    envelopeDesc:
      '封存寫入時，以下欄位以零存取加密（ML-KEM-1024-HKDF-SHA384-AES-256-GCM）一併封存；等待核准與執行中的內容，則另以伺服器端金鑰加密保存 7 天。',
    envelope: [
      ['參數', '代理隨工具呼叫送出的參數。'],
      ['上游請求', 'Eisoptric 轉送給工具的請求。'],
      ['上游回應', '工具回傳的原始內容。'],
      ['下游結果', 'Eisoptric 交回代理的結果。'],
    ],
    holdTitle: 'Eisoptric 能解密與無法解密的內容。',
    cannotTitle: 'Eisoptric 無法解密',
    cannot: ['組織或成員的私鑰', '復原金鑰', '密碼，以及用於封裝成員私鑰的金鑰', '資料金鑰刪除後的已儲存稽核內容'],
    canTitle: 'Eisoptric 能解密',
    can: [
      '呼叫者、工具、政策版本與判定結果',
      '轉送工具呼叫當下的明文，以及等待核准與執行中、以伺服器端金鑰加密保存 7 天的內容',
      '上游憑證，且僅限於一次經授權呼叫進行期間',
      '主控台 API 只回報密鑰是否存在，不回報其內容',
    ],
    faqTitle: '常見問題',
    faq: [
      [
        'Eisoptric 能否解密稽核內容？',
        '封存寫入稽核紀錄後即無法解密。閘道於轉送工具呼叫當下會處理明文；寫入稽核紀錄前，資料金鑰以 ML-KEM-1024 封裝給組織與成員的公鑰後即刪除，僅授權成員可於瀏覽器中解密。等待核准與執行中的內容，則另以伺服器端金鑰加密保存 7 天。',
      ],
      ['登入密碼是否會在伺服器上解開私鑰？', '不會。登入時送出的是雜湊值；私鑰由另一把不離開瀏覽器的金鑰封裝。'],
      ['代理能否看到 API 金鑰或 OAuth 權杖？', '不能。這些密鑰保存在憑證金庫中，代理只能取得一次經授權呼叫的結果。'],
      ['若組織尚未建立呼叫內容的加密金鑰？', '新的工具呼叫內容將不予保存。稽核紀錄僅標示尚未加密，不寫入明文。'],
    ],
    ctaTitle: '以你自己的工具實際驗證。',
    ctaBody: '連接一台 MCP 伺服器，再於瀏覽器中開啟一筆加密的稽核紀錄。',
    paperLink: '閱讀白皮書',
    disclosureTitle: '漏洞通報',
    disclosureBody: '漏洞通報方式將公布於此。正式說明發布前，請來信 security@eisoptric.com。',
  },
} as const
