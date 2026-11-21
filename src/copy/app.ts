// The Eisoptric Workbench page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const appPage = {
  en: {
    title: 'Eisoptric Workbench — Free, open-source software for AI research',
    description:
      'Eisoptric Workbench is a free, Apache 2.0-licensed desktop workbench for AI research. Run experiments on your own computer or an SSH host, read every sample, look inside the model, and choose how much the assistant may do.',
    eyebrow: 'Eisoptric Workbench · Open source · A tool from Eisoptric’s research',
    heading: 'A workbench for AI research, on your own computer.',
    lede: 'Read the method, write the code yourself, run the experiment and read every sample. Eisoptric is organized around your questions, models, experiments and findings rather than around chats, and you decide how much the assistant may do.',
    download: 'Download Eisoptric Workbench',
    downloadNote: 'macOS · Windows · Free',
    github: 'View on GitHub',
    secondary: 'Connect to Eisoptric MCP',
    note: 'Preview release, licensed under Apache 2.0. The builds are not code-signed yet: on macOS, approve the first launch in System Settings → Privacy & Security; on Windows, choose More info → Run anyway when SmartScreen warns. Works offline with local models.',
    shot: {
      alt: 'Eisoptric Workbench’s Experiments screen: mean IOI accuracy of five Pythia-160m checkpoints, from 0.37 at step 1k to 0.96 at step 143k',
      caption:
        'A real screenshot. Indirect object identification on five Pythia-160m checkpoints, 200 prompts each, run in Eisoptric Workbench; the hypothesis stays undecided until you judge it.',
    },
    highlights: [
      [
        'Your research, not a chat',
        'Questions, hypotheses, code, runs, samples and conclusions each have a place. Reopen a project and Home says where the work stopped and what is still open.',
      ],
      [
        'Your computer, your models',
        'The runtime listens only on 127.0.0.1, records are files you can read, and every request it sends is in a network log. Use API keys, your Claude or ChatGPT plan, or an offline model.',
      ],
      [
        'In English and 繁體中文',
        'The whole interface is available in English and Traditional Chinese. Eisoptric follows the system’s language, or you choose in Settings.',
      ],
    ],
    screensTitle: 'Ten screens around one project.',
    screensDesc:
      'Each screen holds one part of the work, and the assistant on every screen knows which one you are on. The screenshots show an example project.',
    screenAlt: 'Eisoptric Workbench’s {screen} screen, in an example project',
    screens: [
      ['Home', 'Where the work stopped, what changed since you last looked, and what still needs a decision.'],
      [
        'Workspace',
        'Your code, with the run, its cost, samples, findings and a terminal underneath. Notebooks open as cells.',
      ],
      ['Lineage', 'Checkpoints and their fine-tuned branches, with a score followed along the line.'],
      ['Experiments', 'Frozen versions, runs and scores, and comparisons that say when they are not fair.'],
      [
        'Samples',
        'One sample across every model that saw it, the scorer’s word beside your label, and counterexamples kept.',
      ],
      ['Data', 'Every file an experiment reads, whether it changed since it was frozen, and rows two files share.'],
      ['Inspect', 'Activations at every layer, patching against a random control, and sparse-autoencoder features.'],
      ['Tasks', 'Long work in its own worktree: what it may touch, its diff, then merge or discard.'],
      ['Protection', 'Refusals and unexplained changes in one place, and what each backend can enforce.'],
      ['Environment', 'The Python, packages and devices a run uses, kits to install, and SSH hosts for remote runs.'],
    ],
    modesTitle: 'You decide how much the assistant does.',
    modesDesc:
      'Each chat has a mode, chosen beside the assistant’s name. In all four, verdicts, labels, locks and merges stay yours.',
    modes: [
      ['Ask', 'You write the code. The assistant only reads and explains: an error, a change, a fix for you to type.'],
      ['Approve', 'The assistant proposes changes, and each change or command waits for your approval.'],
      ['Auto', 'The assistant works in the chat, on the project itself, and asks before anything sensitive.'],
      [
        'Agent',
        'The assistant works on the project and asks nothing. Work to keep apart goes to a task in its own worktree.',
      ],
    ],
    modesNote:
      'Modes and locks are a workflow constraint, not a security boundary: a shell in a task can still write a locked file, and Eisoptric records it afterwards on the Protection screen.',
    featTitle: 'From a question to a conclusion you can defend.',
    featDesc:
      'Eisoptric keeps what you asked, what you ran, what it measured and what you concluded together, so a number never gets separated from how it was produced.',
    features: [
      {
        num: '01',
        eyebrow: 'Home and Workspace',
        title: 'Code beside its results',
        points: [
          'Write down the question and its hypotheses; a run that finishes says only that it executed, and the verdict is yours',
          'A code editor with the run, what it cost, its samples, your findings and a terminal underneath',
          'Notebooks open as cells you can edit and run, with their stored outputs and tracebacks',
          'Reopening restores the file, the unsaved draft and the run you were on',
        ],
      },
      {
        num: '02',
        eyebrow: 'Experiments',
        title: 'Comparisons that say when they are not fair',
        points: [
          'Freeze an experiment into a version, so a changed setting or environment becomes a new version',
          'Only runs measured the same way share a chart; anything else is listed apart with what differs',
          'See improvements, regressions, missing samples and category slices between two runs or models',
          'A score splits into what the scorer judged, what you disputed and what was excluded as an error',
        ],
      },
      {
        num: '03',
        eyebrow: 'Samples and Data',
        title: 'Read one sample from every side, and know what was read',
        points: [
          'See one sample across the models that saw it, with the scorer’s word beside your label',
          'Label without touching the score, measure how far you agree with the scorer, and keep counterexamples',
          'The Data screen lists every file an experiment reads, whether it changed since it was frozen, and how often test data was touched',
          'Count the rows two files have in common, to find exact duplicates leaking between splits',
        ],
      },
      {
        num: '04',
        eyebrow: 'Inspect',
        title: 'Look inside the model',
        points: [
          'Read activations at every layer, or patch a clean prompt into a corrupted one at every layer and position',
          'Every patching result is read against a random control',
          'Read one layer through a sparse autoencoder from a SAELens release or a local folder, with how well it rebuilt the prompt',
          'Keep figures, analysis JSON and notebook snapshots with their hashes beside the session',
        ],
      },
      {
        num: '05',
        eyebrow: 'Remote runs and existing results',
        title: 'Bring the work you already have',
        points: [
          'Run a frozen experiment on your own SSH host, close Eisoptric, and reconnect later; the host key is checked',
          'Import JSONL, JSON, CSV or TSV results, mapping columns yourself; imported results are marked and never given an interval they cannot support',
          'Trainer state comes in as training metrics, kept apart from evaluations',
          'Export a project bundle with samples, labels, metrics and reports, and import it elsewhere without overwriting different evidence',
        ],
      },
      {
        num: '06',
        eyebrow: 'Assistant and Tasks',
        title: 'Help that knows the workbench, and long work kept apart',
        points: [
          'The research assistant is on every screen (⌘J) and knows what each one is for',
          'Ask how to do something and it walks you through it, boxing each place while you do the work',
          'It can carry out a study with the same records you see: questions, experiments, runs, samples and findings',
          'It can hand long work to a task in its own git worktree; review the diff, then merge or discard it',
        ],
      },
      {
        num: '07',
        eyebrow: 'Protection',
        title: 'Clear about what it can enforce',
        points: [
          'An Ask chat only reads, an Approve chat asks before each change or command, and no file tool can write a locked file',
          'Agents work only in folders you grant, and every edit is checkpointed and can be reverted',
          'Refusals and unexplained changes wait on one screen for you to decide',
          'Every HTTP request the runtime sends is in a network log you can read',
        ],
      },
      {
        num: '08',
        eyebrow: 'Resources and environment',
        title: 'What a run cost, and what it ran on',
        points: [
          'Time, processor share, memory, GPUs where nvidia-smi can say, and how fast samples come',
          'The Python, packages and devices a run uses, with lock files hashed and frozen with the version',
          'Eisoptric can create the environment, with optional kits for interpretability, post-training, analysis or notebooks',
          'Tokens and device memory when your program reports them',
        ],
      },
    ],
    filesTitle: 'Your records are plain files.',
    filesDesc:
      'A project’s questions, experiments, runs, labels and findings live in its own .workbench/research folder. Read them, diff them, commit them with your code.',
    asideCaption: 'A project’s research records, next to its code.',
    specsTitle: 'Requirements',
    specs: [
      ['Platforms', 'macOS 12 or later on Apple silicon, and Windows 10 or later on x64.'],
      [
        'Models',
        'Anthropic, OpenAI, Google and DeepSeek with your API key; Claude Code on your Claude plan; Codex on your ChatGPT plan; LM Studio for local, offline models.',
      ],
      [
        'Remote runs',
        'Any Linux or macOS host you can reach over SSH, with the same Eisoptric version installed on it.',
      ],
      [
        'Data',
        'Research records are in the project’s .workbench/research folder. App data is in ~/.workbench-app. API keys are encrypted at rest, with the key in the macOS Keychain or Windows Credential Manager.',
      ],
      ['Languages', 'English and Traditional Chinese.'],
      ['License', 'Apache License 2.0. Copyright Rick Weng.'],
    ],
    ctaTitle: 'Built in the open.',
    ctaBody:
      'Eisoptric Workbench is free for everyone. Download it, star the repository, open an issue, or send a pull request.',
  },
  zh: {
    title: 'Eisoptric Workbench — 免費、開源的 AI 研究工作台',
    description:
      'Eisoptric Workbench 是免費、以 Apache 2.0 授權的桌面 AI 研究工作台。可在自己的電腦或 SSH 主機上執行實驗、逐一檢視樣本、觀察模型內部，並決定研究助理的參與程度。',
    eyebrow: 'Eisoptric Workbench · 開源 · 源自 Eisoptric 研究的工具',
    heading: '在自己的電腦上進行 AI 研究的工作台。',
    lede: '理解方法、親自撰寫程式、執行實驗並逐一檢視樣本。Eisoptric 以研究問題、模型、實驗與發現為核心組織工作，而非以對話為核心；研究助理的參與程度由你決定。',
    download: '下載 Eisoptric Workbench',
    downloadNote: 'macOS · Windows · 免費',
    github: '在 GitHub 上查看',
    secondary: '連接 Eisoptric MCP',
    note: '預覽版，以 Apache 2.0 授權。目前的版本皆未經簽署：macOS 首次開啟時，請至「系統設定 → 隱私權與安全性」允許執行；Windows 出現 SmartScreen 警告時，請點選「其他資訊 → 仍要執行」。搭配本機模型可離線使用。',
    shot: {
      alt: 'Eisoptric Workbench 的「實驗」畫面：五個 Pythia-160m 檢查點的 IOI 平均準確率，從 step 1k 的 0.37 上升至 step 143k 的 0.96',
      caption:
        '實際截圖。在 Eisoptric Workbench 中對五個 Pythia-160m 檢查點各執行 200 個間接受詞辨識（IOI）提示；在你做出判定之前，假說維持「未判定」。',
    },
    highlights: [
      [
        '以研究為核心，而非一串對話',
        '研究問題、假說、程式、執行、樣本與結論各有其位置。重新開啟專案時，首頁會顯示工作進行到哪裡，以及尚待決定的事項。',
      ],
      [
        '你的電腦，你的模型',
        '執行環境（runtime）只監聽 127.0.0.1，紀錄皆為可直接閱讀的檔案，送出的每一個請求都記錄於網路紀錄中。可使用 API 金鑰、你的 Claude 或 ChatGPT 方案，或離線模型。',
      ],
      ['English 與繁體中文', '整個介面提供英文與繁體中文。Eisoptric 會依循系統語言，也可在設定中選擇。'],
    ],
    screensTitle: '十個畫面，圍繞同一個專案。',
    screensDesc: '每個畫面負責研究工作的一部分，而研究助理在每個畫面都知道你正在進行的工作。截圖為示範專案。',
    screenAlt: 'Eisoptric Workbench 的「{screen}」畫面（示範專案）',
    screens: [
      ['首頁', '工作進行到哪裡、上次檢視後有哪些變化，以及尚待你決定的事項。'],
      ['工作區', '程式碼，下方是執行、花費、樣本、發現與終端機。筆記本以儲存格形式開啟。'],
      ['譜系', '檢查點與由其微調而來的分支，可沿著譜系追蹤分數。'],
      ['實驗', '凍結的版本、執行與分數，並在比較不公平時提出提醒。'],
      ['樣本', '同一個樣本在所有受測模型上的表現，評分器的判斷與你的標註並列，並保留反例。'],
      ['資料', '實驗讀取的每個檔案、凍結後是否有變動，以及兩個檔案共有的資料列。'],
      ['檢視', '每一層的活化值、與隨機對照組比較的修補結果，以及稀疏自編碼器的特徵。'],
      ['任務', '在獨立 worktree 中進行的長時間工作：可變更的範圍、產生的差異，以及合併或捨棄。'],
      ['防護', '集中呈現遭拒絕的操作與無法解釋的變更，以及每個後端所能強制的範圍。'],
      ['環境', '執行所使用的 Python、套件與裝置、可安裝的套件組，以及遠端執行用的 SSH 主機。'],
    ],
    modesTitle: '研究助理的參與程度，由你決定。',
    modesDesc: '每段對話各有一種模式，於研究助理名稱旁選擇。無論哪一種模式，判定、標註、鎖定與合併皆由你決定。',
    modes: [
      ['Ask', '程式由你撰寫。研究助理只負責閱讀與解釋：一個錯誤、一處變更，或一個由你自行輸入的修正。'],
      ['Approve', '研究助理提出變更，每一項變更或指令皆須經你核准。'],
      ['Auto', '研究助理在對話中直接處理專案，遇到敏感操作時會先徵詢你。'],
      ['Agent', '研究助理直接處理專案，不再逐項徵詢。需要獨立進行的工作，交由獨立 worktree 中的任務執行。'],
    ],
    modesNote:
      '模式與鎖定是工作流程上的約束，並非安全邊界：任務中的 shell 仍可能寫入已鎖定的檔案，Eisoptric 會於事後記錄在「防護」畫面。',
    featTitle: '從研究問題，到經得起檢驗的結論。',
    featDesc: 'Eisoptric 將你提出的問題、執行的實驗、量測的結果與得出的結論集中保存，數字不會與其來源分離。',
    features: [
      {
        num: '01',
        eyebrow: '首頁與工作區',
        title: '程式碼與結果並列',
        points: [
          '記錄研究問題與假說；執行結束只代表程式跑完，判定由你做出',
          '程式編輯器下方即是執行、花費、樣本、你的發現與終端機',
          '筆記本以儲存格形式開啟，可編輯與執行，並保留輸出與錯誤追蹤',
          '重新開啟時，恢復檔案、未儲存的草稿，以及你正在檢視的執行',
        ],
      },
      {
        num: '02',
        eyebrow: '實驗',
        title: '在比較不公平時提出提醒',
        points: [
          '將實驗凍結為版本，設定或環境一經變動即成為新版本',
          '只有量測方式相同的執行會繪於同一張圖；其餘另行列出，並說明差異所在',
          '檢視兩次執行或兩個模型之間的進步、退步、缺漏樣本與各類別分組',
          '分數區分為評分器判定的、你有異議的，以及因錯誤而排除的部分',
        ],
      },
      {
        num: '03',
        eyebrow: '樣本與資料',
        title: '從各個角度檢視樣本，並掌握所讀取的資料',
        points: [
          '檢視同一個樣本在所有受測模型上的表現，評分器的判斷與你的標註並列',
          '標註不會更動分數；可衡量你與評分器的一致程度，並保留反例',
          '「資料」畫面列出實驗讀取的每個檔案、凍結後是否變動，以及測試資料被讀取的次數',
          '計算兩個檔案共有的資料列，找出資料切分之間外洩的完全重複資料',
        ],
      },
      {
        num: '04',
        eyebrow: '檢視',
        title: '觀察模型內部',
        points: [
          '讀取每一層的活化值，或在每一層、每個位置將乾淨提示的活化值修補至受干擾的提示',
          '每一項修補結果皆與隨機對照組比較',
          '以 SAELens 發行版或本機資料夾中的稀疏自編碼器讀取一層，並顯示其重建提示的程度',
          '將圖表、分析 JSON 與筆記本快照連同雜湊值保存於檢視工作階段旁',
        ],
      },
      {
        num: '05',
        eyebrow: '遠端執行與既有結果',
        title: '匯入既有的研究成果',
        points: [
          '在自己的 SSH 主機上執行凍結的實驗，關閉 Eisoptric 後仍可重新連線；主機金鑰會經過驗證',
          '匯入 JSONL、JSON、CSV 或 TSV 結果並自行對應欄位；匯入的結果會加上標記，且不會給出資料不足以支持的信賴區間',
          'Trainer 狀態以訓練指標匯入，與評測結果分開',
          '匯出包含樣本、標註、指標與報告的研究包；於其他專案匯入時，不會覆蓋不同的證據',
        ],
      },
      {
        num: '06',
        eyebrow: '研究助理與任務',
        title: '熟悉工作台的研究助理，長時間工作另行處理',
        points: [
          '研究助理在每個畫面皆可使用（⌘J），並了解每個畫面的用途',
          '詢問如何完成某項操作時，它會逐步引導，標示每個位置，由你親自執行',
          '它可以使用與你相同的紀錄完成一項研究：研究問題、實驗、執行、樣本與發現',
          '長時間工作可交由獨立 git worktree 中的任務執行；審閱差異後再合併或捨棄',
        ],
      },
      {
        num: '07',
        eyebrow: '防護',
        title: '明確說明能強制的範圍',
        points: [
          'Ask 對話為唯讀，Approve 對話在每次變更或指令前皆會徵詢，檔案工具一律無法寫入已鎖定的檔案',
          '代理只能在你授權的資料夾中工作，每次編輯皆建立檢查點，可隨時還原',
          '遭拒絕的操作與無法解釋的變更集中於一個畫面，待你決定',
          '執行環境送出的每一個 HTTP 請求，皆記錄於可供閱讀的網路紀錄中',
        ],
      },
      {
        num: '08',
        eyebrow: '資源與環境',
        title: '每次執行的成本與執行環境',
        points: [
          '時間、處理器使用率、記憶體、nvidia-smi 可回報的 GPU，以及樣本產生速度',
          '執行所使用的 Python、套件與裝置；鎖定檔的雜湊值隨版本一併凍結',
          'Eisoptric 可建立執行環境，並可選擇加裝可解釋性、後訓練、分析或筆記本套件組',
          '若你的程式有回報，也會顯示詞元數量與裝置記憶體',
        ],
      },
    ],
    filesTitle: '研究紀錄即一般檔案。',
    filesDesc:
      '專案的研究問題、實驗、執行、標註與發現，皆存放於專案內的 .workbench/research 資料夾，可直接閱讀、比較差異，並與程式碼一併提交。',
    asideCaption: '專案的研究紀錄，與程式碼並列。',
    specsTitle: '系統需求',
    specs: [
      ['平台', '搭載 Apple silicon 的 macOS 12 以上版本，以及 x64 的 Windows 10 以上版本。'],
      [
        '模型',
        '以你的 API 金鑰使用 Anthropic、OpenAI、Google 與 DeepSeek；以 Claude 方案使用 Claude Code；以 ChatGPT 方案使用 Codex；以 LM Studio 使用本機離線模型。',
      ],
      ['遠端執行', '任何可透過 SSH 連線、並安裝相同版本 Eisoptric 的 Linux 或 macOS 主機。'],
      [
        '資料',
        '研究紀錄存放於專案的 .workbench/research 資料夾，應用程式資料存放於 ~/.workbench-app。API 金鑰經加密儲存，加密金鑰存放於 macOS 鑰匙圈或 Windows 認證管理員。',
      ],
      ['語言', 'English 與繁體中文。'],
      ['授權', 'Apache License 2.0。著作權人 Rick Weng。'],
    ],
    ctaTitle: '公開開發。',
    ctaBody: 'Eisoptric Workbench 免費提供所有人使用。歡迎下載、為儲存庫加上星號、提出 issue，或送出 pull request。',
  },
} as const
