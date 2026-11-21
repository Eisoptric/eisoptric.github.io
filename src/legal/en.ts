// The Terms of Service and the Privacy Policy in English. The 中文 text is in ./zh.ts.

export const en = {
  terms: {
    title: 'Terms of Service — Eisoptric',
    description:
      'The agreement you accept by using Eisoptric. The services are provided by Rick Weng, who also owns the intellectual property.',
    crumb: 'Terms of Service',
    heading: 'Terms of Service',
    updated: 'Updated 21 November 2026',
    relatedPath: '/privacy',
    relatedLabel: 'Privacy Policy',
    sections: [
      {
        heading: 'Acceptance',
        blocks: [
          {
            type: 'p',
            text: 'These Terms of Service are a contract between you and Rick Weng. By accessing or using the Services, you agree to these terms and the Privacy Policy. If you do not agree, do not use the Services.',
          },
          {
            type: 'p',
            text: 'Using the Services includes visiting the website, creating or using an account, signing in to the console, connecting to the MCP backend, and using Eisoptric Workbench when it connects to our servers.',
          },
          {
            type: 'p',
            text: 'If you use the Services for an organization, you represent that you have authority to bind that organization. “You” then includes the organization. You are responsible for the users who access the Services under your account.',
          },
        ],
      },
      {
        heading: 'Who provides the Services',
        blocks: [
          {
            type: 'p',
            text: 'The Services are provided by Rick Weng, an individual in Taiwan. In these terms, “we” and “us” mean Rick Weng.',
          },
          {
            type: 'p',
            text: 'Rick Weng owns the Eisoptric name, software, website, console, and the other intellectual property in the Services, and operates, maintains, and develops the Services. Your contract is with Rick Weng.',
          },
        ],
      },
      {
        heading: 'The Services',
        blocks: [
          {
            type: 'p',
            text: 'The Services are:',
          },
          {
            type: 'ul',
            items: [
              'The website at https://eisoptric.com.',
              'The MCP console at https://console.eisoptric.com.',
              'The MCP backend at https://api.eisoptric.com, which is the server for the gateway, accounts, policies, approvals, and the audit trail.',
              'Eisoptric Workbench, the desktop application for macOS and Windows.',
              'The Eisoptric Workbench backend, a server separate from the MCP backend, which Eisoptric Workbench uses to sign in, sync, and run agents.',
            ],
          },
          {
            type: 'p',
            text: 'We may improve, change, or discontinue a part of the Services. If we discontinue a part that you are using under an account, we will give you reasonable notice when we can.',
          },
        ],
      },
      {
        heading: 'Accounts',
        blocks: [
          {
            type: 'p',
            text: 'You must provide accurate account information and keep it current. You are responsible for protecting your credentials and for activity under your account. Tell us at hello@eisoptric.com if you believe your account is being misused.',
          },
          {
            type: 'p',
            text: 'An organization account may have members, roles, and permissions. The person who administers the account is responsible for who is invited and for what those users can do.',
          },
        ],
      },
      {
        heading: 'Eligibility',
        blocks: [
          {
            type: 'p',
            text: 'You may accept these terms only if you have the legal capacity to do so. Under Article 12 of the Taiwan Civil Code, a person who has reached the age of eighteen is an adult. A person under the age of seven has no legal capacity, and a declaration of intent by that person is void (Civil Code Articles 13 and 75). A minor who has reached the age of seven has limited legal capacity and may enter this contract only with the consent or ratification of a statutory agent (Civil Code Articles 13, 77, and 79).',
          },
        ],
      },
      {
        heading: 'Your responsibilities',
        blocks: [
          {
            type: 'p',
            text: 'You decide which agents, tools, policies, and MCP servers you connect. You are responsible for your agents, the servers you register, the rules you write, the instructions you give, and the data those calls and conversations contain. A policy is applied as you configure it. We do not promise that it will stop every action you later decide should have been stopped.',
          },
          {
            type: 'p',
            text: 'You will not:',
          },
          {
            type: 'ul',
            items: [
              'Use the Services in violation of law, or to infringe another person’s rights.',
              'Interfere with the Services, probe them without authorization, or attempt to reach another customer’s data or the contents of the credential vault.',
              'Submit data, prompts, or tool calls that you do not have the right to submit.',
              'Misrepresent your identity, or share credentials except with users who belong to your organization.',
            ],
          },
        ],
      },
      {
        heading: 'Customer data',
        blocks: [
          {
            type: 'p',
            text: 'You keep your rights in the data you and your users submit, including account details, policies, conversations, and tool-call contents. You grant Rick Weng a right to host, process, and transmit that data only to provide, secure, and support the Services, as the Privacy Policy describes.',
          },
          {
            type: 'p',
            text: 'You represent that you have the rights needed to submit that data, including personal data about people in your organization and personal data inside prompts and tool-call arguments.',
          },
        ],
      },
      {
        heading: 'Intellectual property',
        blocks: [
          {
            type: 'p',
            text: 'Rick Weng owns the intellectual property in the Services. Except for the source code licenses described below, these terms give you only a limited right to use the Services while you comply with them. You do not receive any ownership of the Services.',
          },
          {
            type: 'p',
            text: 'The source code of Eisoptric Workbench is offered under the Apache License, Version 2.0, and the source code of the Eisoptric SDK under the MIT License. Where we make the source code of the MCP backend and the console available, it is offered under the Functional Source License, Version 1.1, ALv2 Future License (FSL-1.1-ALv2). That license lets you read, audit, modify, and run the code for any purpose except a competing commercial product or service. Each version also becomes available under the Apache License 2.0 two years after we release it. The copyright holder of all of this code is Rick Weng.',
          },
          {
            type: 'p',
            text: 'Those licenses govern your rights in the source code. They do not replace these terms for the Services we operate. When you use the hosted console, the MCP backend, or Eisoptric Workbench together with our servers, these terms apply.',
          },
          {
            type: 'p',
            text: 'If you send us a suggestion, we may use it to operate and improve the Services without obligation to you. That does not transfer your customer data to us.',
          },
        ],
      },
      {
        heading: 'Fees',
        blocks: [
          {
            type: 'p',
            text: 'The Services are free. Every account, personal or organization, gets every feature, and these terms do not require you to pay. If we later offer a paid plan, we will show the price, the billing period, and the cancellation terms before you are charged. You owe fees only for a plan you choose to buy.',
          },
          {
            type: 'p',
            text: 'You may support Eisoptric with a donation through GitHub Sponsors. A donation is voluntary. It does not buy a plan, a feature, support, or any other service, and it does not change these terms. GitHub processes donations under its own terms, and refunds follow GitHub’s rules.',
          },
        ],
      },
      {
        heading: 'Confidentiality',
        blocks: [
          {
            type: 'p',
            text: 'We will use your customer data only to provide the Services, and we will not disclose it except as the Privacy Policy allows or as you instruct. You will not disclose non-public information we make available to you about the Services, except to your personnel who need it and are bound to keep it confidential.',
          },
        ],
      },
      {
        heading: 'Privacy',
        blocks: [
          {
            type: 'p',
            text: 'The Privacy Policy describes how personal data is handled. It is part of this contract. Where Taiwan’s Personal Data Protection Act applies, the notice required by Article 8 is given in that policy.',
          },
        ],
      },
      {
        heading: 'Disclaimers',
        blocks: [
          {
            type: 'p',
            text: 'The Services are provided as available. To the extent the law allows, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted or error-free, that a policy will block every call, or that an agent will behave as you expect.',
          },
          {
            type: 'p',
            text: 'Model providers and the MCP servers you connect are not part of the Services. Their terms apply between you and them.',
          },
        ],
      },
      {
        heading: 'Limitation of liability',
        blocks: [
          {
            type: 'p',
            text: 'Article 222 of the Taiwan Civil Code does not allow an agreement to disclaim liability for willful misconduct or gross negligence. These terms do not do so. Article 247-1 of the Civil Code makes void a standard term that, in the circumstances, is grossly unfair, including a term that exempts or reduces our liability, increases yours, or restricts your rights. If you are a consumer under the Consumer Protection Act, these terms do not take away the rights Articles 11 and 12 of that Act give you.',
          },
          {
            type: 'p',
            text: 'Except for liability the law does not allow us to limit, we are not liable for indirect, incidental, special, or consequential loss, including lost profits, lost data, or the acts of an agent or an upstream server. Our total liability arising out of the Services in a claim is limited to the fees you paid Rick Weng for the Services during the twelve months before the claim. If you paid nothing, that limit is zero.',
          },
        ],
      },
      {
        heading: 'Indemnity',
        blocks: [
          {
            type: 'p',
            text: 'You will indemnify Rick Weng against claims, losses, and reasonable expenses arising out of your customer data, your agents, the MCP servers you connect, or your breach of these terms. This indemnity does not apply to the extent the claim is caused by our willful misconduct or gross negligence.',
          },
        ],
      },
      {
        heading: 'Suspension and termination',
        blocks: [
          {
            type: 'p',
            text: 'You may stop using the Services at any time. We may suspend or end access if you breach these terms, if we must do so to protect the Services or another customer, or if we discontinue the Services. When we can do so without increasing the risk, we will tell you the reason.',
          },
          {
            type: 'p',
            text: 'Ending access does not revoke the Apache License 2.0, the MIT License or the FSL-1.1-ALv2 license you already have in Eisoptric’s source code. Sections that by their nature should continue, including those on customer data, intellectual property, confidentiality, disclaimers, liability, and indemnity, continue after the contract ends. The Privacy Policy states what happens to personal data when you ask for deletion.',
          },
        ],
      },
      {
        heading: 'Changes',
        blocks: [
          {
            type: 'p',
            text: 'We may update these terms by posting a new version on this page and changing the date above. If you have an account and a change materially affects your rights or obligations, we will notify you by email or in the console before it takes effect. If you continue to use the Services after the effective date, you accept the updated terms. If you do not accept them, stop using the Services.',
          },
        ],
      },
      {
        heading: 'Governing law',
        blocks: [
          {
            type: 'p',
            text: 'These terms are governed by the laws of Taiwan. The courts of Taiwan have jurisdiction. This does not remove a forum that the law does not allow you to waive.',
          },
        ],
      },
      {
        heading: 'General',
        blocks: [
          {
            type: 'p',
            text: 'These terms and the Privacy Policy are the entire agreement between you and Rick Weng about the Services. If a provision is held unenforceable, the rest remains in effect. You may not assign this contract without our consent. We may assign it to a successor that continues the Services. A failure to enforce a provision is not a waiver.',
          },
          {
            type: 'p',
            text: 'These terms are published in Traditional Chinese and English. If the two texts differ, the Traditional Chinese text controls.',
          },
        ],
      },
      {
        heading: 'Contact',
        blocks: [
          { type: 'p', text: 'Rick Weng' },
          { type: 'p', text: 'hello@eisoptric.com' },
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy — Eisoptric',
    description:
      'How Rick Weng handles personal data when you use the Eisoptric website, console, MCP backend, Eisoptric Workbench, and Eisoptric Workbench backend.',
    crumb: 'Privacy Policy',
    heading: 'Privacy Policy',
    updated: 'Updated 21 November 2026',
    relatedPath: '/terms',
    relatedLabel: 'Terms of Service',
    sections: [
      {
        heading: 'This policy',
        blocks: [
          {
            type: 'p',
            text: 'This policy tells you how personal data is collected, processed, and used when you use the Services. By using the Services, you agree to this policy together with the Terms of Service. It is the notice required by Article 8 of Taiwan’s Personal Data Protection Act when we collect personal data from you.',
          },
        ],
      },
      {
        heading: 'Who is responsible',
        blocks: [
          {
            type: 'p',
            text: 'Rick Weng, an individual in Taiwan, decides the purposes and means of using personal data to provide the Services. Contact hello@eisoptric.com.',
          },
          {
            type: 'p',
            text: 'Rick Weng owns the intellectual property and operates, maintains, and develops the Services.',
          },
        ],
      },
      {
        heading: 'What we collect',
        blocks: [
          {
            type: 'p',
            text: 'The categories follow the classification published for the Personal Data Protection Act. Identification data is category C001, which includes name, job title, and email address. Conversations, tool-call arguments, and files you choose to send may contain other categories. Which categories those are depends on what you submit.',
          },
          {
            type: 'p',
            text: 'The website at https://eisoptric.com has no forms and does not ask you for personal data. The page language is part of the address. The website does not use advertising cookies or a separate analytics product.',
          },
          {
            type: 'p',
            text: 'On the MCP console at https://console.eisoptric.com and the MCP backend at https://api.eisoptric.com, we process the account and the gateway records needed to run the service:',
          },
          {
            type: 'ul',
            items: [
              'Identity and account data, including name, email address, organization name if you create an organization account, role, and sign-in credentials. When you sign up, we email a verification code to the address you gave. Signing in from Eisoptric Workbench uses this same account.',
              'What you configure: members, permissions, agents, tool sets, policies and their versions, and which MCP servers a person may connect.',
              'Each tool call the gateway evaluates: the agent, the tool, the arguments, the policy version, the decision, the reviewer when there is one, and whether the call was executed.',
              'Upstream credentials you store in the vault, sealed so the gateway can make a call you have allowed. The console does not return the secret itself.',
              'Cost records, if you use cost tracking.',
            ],
          },
          {
            type: 'p',
            text: 'Eisoptric Workbench runs on your computer. Until it connects to our servers, agents, files, commands, chats, and model keys stay on that computer, and we do not receive them. When you sign in and use the Eisoptric Workbench backend, that backend — a server separate from the MCP backend — processes the App data it syncs and runs: agents, conversations, tasks, scheduled wakes, memories, and the MCP servers you attach in the App.',
          },
          {
            type: 'p',
            text: 'Downloads of Eisoptric Workbench and the source code are served by GitHub. If you donate through GitHub Sponsors, GitHub collects your payment details and shares with us what its Sponsors program shows, such as your GitHub username. GitHub processes those requests under its own terms.',
          },
        ],
      },
      {
        heading: 'Purposes and legal bases',
        blocks: [
          {
            type: 'p',
            text: 'We collect and use personal data for these specific purposes, as classified for the Personal Data Protection Act: contractual and similar relationships (code 069), customer management and service (code 090), information and database management (code 136), and information security (code 137).',
          },
          {
            type: 'p',
            text: 'Collection and use stay within what those purposes require, and must be honestly and reasonably connected to them (Articles 5 and 20). As a non-government party, we collect and process personal data because we have a contract or a similar relationship with you and maintain appropriate security measures, and because you consent by using the Services (Article 19, paragraph 1, subparagraphs 2 and 5).',
          },
        ],
      },
      {
        heading: 'Period, place, recipients, and method',
        blocks: [
          {
            type: 'p',
            text: 'We keep account data, console data, MCP backend data, and Eisoptric Workbench backend data while you use the Services. When the purpose ends, or you ask us to delete the data, we delete it or stop using it. We may keep what we still need to finish a request you already made, to resolve a dispute, or to comply with law (Article 11, paragraph 3).',
          },
          {
            type: 'p',
            text: 'The console, the MCP backend, and the Eisoptric Workbench backend are hosted on Google Cloud in Taiwan (asia-east1). The website is hosted by Cloudflare. Sign-up verification codes and account emails are sent through Resend. Eisoptric Workbench downloads and donations are handled by GitHub. A tool call is sent to an upstream MCP server only when your own configuration allows it. People in your organization see what their roles allow.',
          },
          {
            type: 'p',
            text: 'We do not sell personal data. We do not use it for advertising. Cloudflare, Resend, and GitHub may process the data they handle outside Taiwan, because that is how those services deliver the website, the email, the download, or the donation. If a competent authority restricts an international transfer under Article 21, we will comply with that restriction.',
          },
        ],
      },
      {
        heading: 'Google user data',
        blocks: [
          {
            type: 'p',
            text: 'You can connect Google services to the MCP backend: Gmail, Google Calendar, Google Drive, Google Docs, Google Sheets, Google Slides, Cloud Run, Cloud SQL, and Memorystore for Redis. You start each connection and approve it on Google’s own sign-in page. Eisoptric asks each service only for the access its tools need, and you can see that access on Google’s consent screen.',
          },
          {
            type: 'p',
            text: 'Through that connection, Eisoptric receives an access token and a refresh token from Google, and the data a tool returns when an agent you connected calls it, such as a message, an event, a file, or a spreadsheet range. Eisoptric reads Google data only when such a call is made. Your organization’s policies and approvers decide whether a call runs.',
          },
          {
            type: 'p',
            text: 'Eisoptric uses Google user data only to carry out the tool calls you and your organization set up: it sends the request to Google and returns the result to the agent that asked. The tokens are sealed in the credential vault with ML-KEM-1024 and AES-256-GCM. The call’s arguments and Google’s response are recorded in your organization’s audit log, encrypted, so the people your organization lets review calls can see what ran. They are kept while your organization uses the Services, and deleted when you ask us to delete them or when the account is deleted.',
          },
          {
            type: 'ul',
            items: [
              'We do not sell Google user data, and we do not transfer it to anyone except to provide the tool call you asked for, for security reasons, or to comply with law.',
              'We do not use Google user data for advertising, including personalized, retargeted, or interest-based advertising.',
              'We do not use Google user data to develop, improve, or train generalized or non-personalized AI or machine-learning models.',
              'We do not let anyone at Eisoptric read Google user data, except with your permission for a specific item, when it is needed for security, such as investigating abuse, or to comply with law.',
            ],
          },
          {
            type: 'p',
            text: 'Eisoptric’s use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.',
          },
          {
            type: 'p',
            text: 'Removing a Google connection in the console deletes the tokens Eisoptric holds for it. You can also revoke Eisoptric’s access at any time at https://myaccount.google.com/permissions. To delete the audit records of past calls, email hello@eisoptric.com.',
          },
        ],
      },
      {
        heading: 'If you do not provide data',
        blocks: [
          {
            type: 'p',
            text: 'You choose what to provide. You can browse the website without providing anything. If you do not provide account information, you cannot use the console, the MCP backend, or the parts of Eisoptric Workbench that require sign-in. Eisoptric Workbench can still be used on your computer for functions that do not connect to our servers.',
          },
        ],
      },
      {
        heading: 'Your rights',
        blocks: [
          {
            type: 'p',
            text: 'Under Article 3 of the Personal Data Protection Act, you may ask to inquire or review, to receive a copy, to supplement or correct, to stop collection, processing, or use, and to delete. These rights cannot be waived in advance. Email hello@eisoptric.com. We may need to confirm that the request is yours. We will respond within the period the Act requires.',
          },
        ],
      },
      {
        heading: 'Security',
        blocks: [
          {
            type: 'p',
            text: 'Article 27 requires appropriate security measures to prevent personal data from being stolen, altered, damaged, lost, or disclosed. Upstream credentials in the MCP backend are sealed with ML-KEM-1024 and AES-256-GCM. No method of storage or transmission is perfectly secure.',
          },
        ],
      },
      {
        heading: 'Legal capacity',
        blocks: [
          {
            type: 'p',
            text: 'The Services are not directed at anyone who lacks the legal capacity to accept the Terms of Service. If we learn that we hold personal data from such a person without the consent the Civil Code requires, we will delete it.',
          },
        ],
      },
      {
        heading: 'Changes',
        blocks: [
          {
            type: 'p',
            text: 'We may update this policy by posting a new version on this page and changing the date above. If you have an account and a change materially affects how we use personal data, we will notify you by email or in the console before it takes effect. If you continue to use the Services after that date, you accept the update. If you do not, stop using the Services and you may ask us to delete your personal data.',
          },
        ],
      },
      {
        heading: 'Contact',
        blocks: [
          { type: 'p', text: 'Rick Weng' },
          { type: 'p', text: 'hello@eisoptric.com' },
        ],
      },
    ],
  },
} as const
