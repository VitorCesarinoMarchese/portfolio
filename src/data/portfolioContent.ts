export type LocaleCode = 'en' | 'pt'

export interface LocalizedText {
  en: string
  pt: string
}

export interface PortfolioProject {
  id: string
  title: LocalizedText
  description: LocalizedText
  details: LocalizedText
  stack: string[]
  liveUrl?: string
  repoUrl: string
}

export interface ContactLink {
  id: string
  label: string
  value: string
  href: string
}

export interface SkillGroup {
  id: string
  title: LocalizedText
  items: LocalizedText[]
}

export interface ProfessionalExperience {
  id: string
  company: string
  role: LocalizedText
  period: LocalizedText
  highlights: LocalizedText[]
  stack: string[]
}

export const profile = {
  name: 'Vitor Cesarino Marchese',
  role: {
    en: 'Software Engineer',
    pt: 'Engenheiro de Software',
  } satisfies LocalizedText,
  bio: [
    {
      en: "I'm Vitor Cesarino Marchese, a software engineer focused on backend development, performance, and systems.",
      pt: 'Sou Vitor Cesarino Marchese, um engenheiro de software focado em desenvolvimento backend, desempenho e sistemas.',
    },
    {
      en: "I like turning abstract ideas into working software and understanding what happens beneath the surface. I'm especially interested in low-latency systems, networking, real-time applications, and the kinds of problems where performance actually matters.",
      pt: 'Gosto de transformar ideias abstratas em software que funciona e entender o que acontece por baixo dos panos. Tenho um interesse especial por sistemas de baixa latência, redes, aplicações em tempo real e problemas em que o desempenho realmente importa.',
    },
    {
      en: 'A large part of what I enjoy about engineering is investigation: profiling slow code, tracing unexpected behavior, debugging strange problems, and understanding a system well enough to make it better.',
      pt: 'Uma boa parte do que me atrai na engenharia é a investigação: analisar o desempenho de código lento, rastrear comportamentos inesperados, depurar problemas estranhos e entender um sistema bem o suficiente para melhorá-lo.',
    },
    {
      en: 'I mainly work with Go, TypeScript, React, C, and C++, and spend a lot of time around Linux. While I lean toward backend and systems work, I care just as much about how software feels to use. Good software should not only work—it should feel fast, deliberate, and well made.',
      pt: 'Trabalho principalmente com Go, TypeScript, React, C e C++, e passo bastante tempo no Linux. Embora meu foco seja backend e sistemas, me importo igualmente com a experiência de usar o software. Um bom software deve funcionar e transmitir rapidez, cuidado e qualidade em cada interação.',
    },
    {
      en: 'Long term, I want to work on technically demanding systems and develop a deep understanding of computers that lets me solve problems most engineers rarely encounter.',
      pt: 'No longo prazo, quero trabalhar em sistemas tecnicamente exigentes e desenvolver um conhecimento profundo de computadores que me permita resolver problemas que a maioria dos engenheiros raramente encontra.',
    },
  ] satisfies LocalizedText[],
}

export const projects: PortfolioProject[] = [
  {
    id: 'larp',
    title: { en: 'L.A.R.P.', pt: 'L.A.R.P.' },
    description: {
      en: 'A low-latency Linux screen-streaming prototype with adaptive bitrate over UDP.',
      pt: 'Um protótipo de transmissão de tela no Linux com baixa latência e bitrate adaptativo via UDP.',
    },
    details: {
      en: 'Low-latency Adaptive Remote Protocol captures the desktop with PipeWire, encodes H.264 with FFmpeg, and renders live video with SDL3. Receiver feedback adjusts bitrate, while authenticated encryption and session recovery support streaming over Tailscale.',
      pt: 'Low-latency Adaptive Remote Protocol captura o desktop com PipeWire, codifica H.264 com FFmpeg e exibe vídeo ao vivo com SDL3. O feedback do receptor ajusta o bitrate, enquanto a criptografia autenticada e a recuperação de sessões permitem transmitir via Tailscale.',
    },
    stack: ['C++23', 'UDP', 'PipeWire', 'FFmpeg', 'SDL3', 'libsodium', 'Tailscale'],
    repoUrl: 'https://github.com/VitorCesarinoMarchese/larp',
  },
  {
    id: 'portfolio',
    title: {
      en: 'Portfolio',
      pt: 'Portfólio',
    },
    description: {
      en: 'A portfolio inspired by the KDE Plasma desktop environment.',
      pt: 'Um portfólio inspirado no ambiente de desktop KDE Plasma.',
    },
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    details: {
      en: 'Movable windows on desktop, labeled navigation on mobile, and content in English and Portuguese. The Three.js forest loads independently of the work.',
      pt: 'Janelas móveis no desktop, navegação com rótulos no celular e conteúdo em inglês e português. A floresta em Three.js carrega de forma independente dos projetos.',
    },
    liveUrl: 'https://www.vitorcesarinomarchese.site/',
    repoUrl: 'https://github.com/VitorCesarinoMarchese/portfolio',
  },
  {
    id: 'Exchange_of_Currencies',
    title: {
      en: 'Currency Exchange',
      pt: 'Câmbio de moedas',
    },
    description: {
      en: 'Currency exchange app with USD/GBP wallets, live rates, and transaction history.',
      pt: 'App de câmbio com carteiras em USD/GBP, taxas em tempo real e histórico de transações.',
    },
    stack: ['Next', 'TypeScript', 'Tailwind', 'Node.js'],
    details: {
      en: 'Account registration and login connect each user to their wallets. Transaction history keeps past exchanges and balances available to review.',
      pt: 'Cadastro e login conectam cada usuário às suas carteiras. O histórico permite consultar câmbios anteriores e saldos.',
    },
    repoUrl: 'https://github.com/VitorCesarinoMarchese/Exchange_of_Currencies',
  },
]

export const professionalExperience: ProfessionalExperience[] = [
  {
    id: 'genova-ai',
    company: 'Genova AI for Business',
    role: { en: 'Intern', pt: 'Estagiário' },
    period: { en: 'July 2026 to present', pt: 'Julho de 2026 até o momento' },
    highlights: [
      {
        en: 'I develop systems and automate processes, building web applications, integrations, and dashboards to support teams. I work to understand operational needs and build solutions that reduce manual tasks and make information easier to access.',
        pt: 'Trabalho com desenvolvimento de sistemas e automação de processos, criando aplicações web, integrações e dashboards para apoiar o trabalho das equipes. Minha atuação envolve entender as necessidades da operação e desenvolver soluções que reduzam tarefas manuais e facilitem o acesso às informações.',
      },
      {
        en: 'I use React, TypeScript, Supabase, and n8n, as well as APIs and AI tools. I work on interfaces, databases, and business logic, both developing features and maintaining and improving systems.',
        pt: 'Utilizo React, TypeScript, Supabase e n8n, além de APIs e recursos de inteligência artificial. Trabalho nas interfaces, no banco de dados e nas regras de negócio, tanto na criação de funcionalidades quanto na manutenção e melhoria dos sistemas.',
      },
      {
        en: 'I also handle performance, access control, and fixes for problems encountered while using the applications.',
        pt: 'Também cuido de desempenho, controle de acesso e correção de problemas no uso das aplicações.',
      },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'n8n', 'APIs'],
  },
]

export const contacts: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'vitorcesarino1@gmail.com',
    href: 'mailto:vitorcesarino1@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/VitorCesarinoMarchese',
    href: 'https://github.com/VitorCesarinoMarchese',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/vitor-cesarino',
    href: 'https://www.linkedin.com/in/vitor-cesarino/',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: { en: 'Backend', pt: 'Backend' },
    items: ['Go', 'Node.js', 'Express', 'REST APIs', 'SQL', 'MongoDB'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'frontend',
    title: {
      en: 'Frontend',
      pt: 'Frontend',
    },
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'tooling',
    title: {
      en: 'Systems & Tooling',
      pt: 'Sistemas e ferramentas',
    },
    items: ['Linux', 'Docker', 'Git', 'Vite'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'exploring',
    title: { en: 'Exploring', pt: 'Explorando' },
    items: [
      { en: 'C', pt: 'C' },
      { en: 'C++', pt: 'C++' },
      { en: 'Systems programming', pt: 'Programação de sistemas' },
    ],
  },
  {
    id: 'interests',
    title: { en: 'Technical Interests', pt: 'Interesses técnicos' },
    items: [
      { en: 'Performance profiling', pt: 'Análise de desempenho' },
      { en: 'Low-latency systems', pt: 'Sistemas de baixa latência' },
      { en: 'Networking', pt: 'Redes' },
      { en: 'Real-time applications', pt: 'Aplicações em tempo real' },
      { en: 'Observability & debugging', pt: 'Observabilidade e depuração' },
    ],
  },
]

export const cvInfo = {
  files: {
    en: '/cv-en.pdf',
    pt: '/cv-pt.pdf',
  } satisfies Record<LocaleCode, string>,
  lastUpdated: '2026-04',
}

export const getCvFileUrl = (locale: LocaleCode): string => cvInfo.files[locale] ?? cvInfo.files.en

export const getLocalizedText = (value: LocalizedText, locale: LocaleCode): string => value[locale]
