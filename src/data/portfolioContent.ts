import { cvContent } from './cvContent.ts'

export type LocaleCode = 'en' | 'pt'

export interface LocalizedText {
  en: string
  pt: string
}

export type ProjectArea = 'web' | 'systems'

export interface PortfolioProject {
  area: ProjectArea
  id: string
  title: LocalizedText
  description: LocalizedText
  details: LocalizedText
  stack: string[]
  liveUrl?: string
  liveLinkLabel?: LocalizedText
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
  location: { en: 'São Paulo, Brazil', pt: 'São Paulo, Brasil' } satisfies LocalizedText,
  website: 'https://www.vitorcesarinomarchese.site/',
  role: {
    en: 'Software Developer',
    pt: 'Desenvolvedor de Software',
  } satisfies LocalizedText,
  intro: {
    en: 'I build web applications at Genova and study Software Engineering at FIAP. Outside work, I develop Linux desktop tools and explore networking with Rust, Go, and C++.',
    pt: 'Desenvolvo aplicações web na Genova e estudo Engenharia de Software na FIAP. Fora do trabalho, desenvolvo ferramentas desktop para Linux e exploro redes com Rust, Go e C++.',
  } satisfies LocalizedText,
  bio: [
    {
      en: 'I\'m a software developer based in São Paulo, a Software Engineering student at FIAP, and a Software Development Intern at Genova since July 2026. I build web applications, dashboards, and process automations with React, TypeScript, Supabase, n8n, and APIs.',
      pt: 'Sou desenvolvedor de software em São Paulo, estudante de Engenharia de Software na FIAP e estagiário em Desenvolvimento de Software na Genova desde julho de 2026. Desenvolvo aplicações web, dashboards e automações de processos com React, TypeScript, Supabase, n8n e APIs.',
    },
    {
      en: 'My current projects include PlumCrate, a Sims 4 mod manager for Linux written in Rust, and L.A.R.P., an experimental C++ screen-streaming protocol. I also build web apps and APIs, including a Go terminal chat client with a TypeScript backend.',
      pt: 'Meus projetos atuais incluem o PlumCrate, um gerenciador de mods do The Sims 4 para Linux escrito em Rust, e o L.A.R.P., um protocolo experimental de transmissão de tela em C++. Também desenvolvo aplicações web e APIs, incluindo um cliente de chat no terminal em Go com backend TypeScript.',
    },
    {
      en: 'Previously, I worked as a freelance frontend developer at Westpoint with React, Next.js, and Cypress. I\'m interested in full stack opportunities where I can build useful software and keep developing my knowledge of Linux, networking, and systems programming. I speak Portuguese and English.',
      pt: 'Antes, trabalhei como desenvolvedor frontend freelancer na Westpoint com React, Next.js e Cypress. Busco oportunidades full stack para desenvolver software útil e aprofundar meus conhecimentos em Linux, redes e programação de sistemas. Falo português e inglês.',
    },
  ] satisfies LocalizedText[],
}

export const projects: PortfolioProject[] = [
  {
    id: 'plumcrate',
    area: 'systems',
    title: { en: 'PlumCrate', pt: 'PlumCrate' },
    description: {
      en: 'An open-source Sims 4 mod manager for Linux, written in Rust. First alpha in development.',
      pt: 'Gerenciador de mods do The Sims 4 para Linux, de código aberto e escrito em Rust. Primeira versão alfa em desenvolvimento.',
    },
    details: {
      en: 'Browse a local mod library, import folders or ZIPs, enable and disable mods, and restore items from trash. CurseForge integration adds discovery, browser-assisted installation, and update checks. The AppImage updater verifies downloads and preserves the previous version for rollback.',
      pt: 'Organize uma biblioteca local de mods, importe pastas ou ZIPs, ative e desative mods e restaure itens da lixeira. A integração com o CurseForge permite descobrir mods, instalar com auxílio do navegador e verificar atualizações. O atualizador do AppImage verifica os downloads e preserva a versão anterior para reversão.',
    },
    stack: ['Rust', 'egui', 'eframe', 'Linux', 'AppImage'],
    liveUrl: 'https://plumcrate.vercel.app/',
    liveLinkLabel: { en: 'Project website', pt: 'Site do projeto' },
    repoUrl: 'https://github.com/VitorCesarinoMarchese/PlumCrate',
  },
  {
    id: 'larp',
    area: 'systems',
    title: { en: 'L.A.R.P.', pt: 'L.A.R.P.' },
    description: {
      en: 'An experimental Linux screen-streaming protocol in C++23 with H.264 video over UDP.',
      pt: 'Protocolo experimental de transmissão de tela no Linux em C++23, com vídeo H.264 sobre UDP.',
    },
    details: {
      en: 'PipeWire capture, FFmpeg encoding, and SDL3 playback connect through adaptive bitrate and receiver feedback. Authenticated sessions support recovery after network interruptions and process restarts. Verified between two Linux machines over Tailscale. Windows support is pending; NVIDIA acceleration is implemented but acceptance is blocked by driver leaks.',
      pt: 'Captura com PipeWire, codificação com FFmpeg e reprodução com SDL3, com bitrate adaptativo e feedback do receptor. Sessões autenticadas permitem recuperar a transmissão após interrupções de rede e reinícios dos processos. Verificado entre duas máquinas Linux via Tailscale. O suporte ao Windows está pendente; a aceleração NVIDIA está implementada, mas sua validação está bloqueada por vazamentos no driver.',
    },
    stack: ['C++23', 'UDP', 'FFmpeg', 'PipeWire', 'SDL3', 'libsodium'],
    repoUrl: 'https://github.com/VitorCesarinoMarchese/larp',
  },
  {
    id: 'Exchange_of_Currencies',
    area: 'web',
    title: {
      en: 'Currency Exchange',
      pt: 'Câmbio de moedas',
    },
    description: {
      en: 'Currency exchange app with USD/GBP wallets, live rates, and transaction history.',
      pt: 'App de câmbio com carteiras em USD/GBP, taxas em tempo real e histórico de transações.',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    details: {
      en: 'Account registration and login connect each user to their wallets. Transaction history keeps past exchanges and balances available to review.',
      pt: 'Cadastro e login conectam cada usuário às suas carteiras. O histórico permite consultar câmbios anteriores e saldos.',
    },
    repoUrl: 'https://github.com/VitorCesarinoMarchese/Exchange_of_Currencies',
  },
  {
    id: 'chat-terminal',
    area: 'web',
    title: {
      en: 'Chat Terminal',
      pt: 'Chat Terminal',
    },
    description: {
      en: 'A Go terminal chat client backed by a TypeScript API, JWT authentication, and persistent WebSocket messaging.',
      pt: 'Cliente de chat no terminal em Go, com API TypeScript, autenticação JWT e mensagens persistentes via WebSocket.',
    },
    stack: ['Go', 'TypeScript', 'WebSockets', 'Prisma', 'PostgreSQL', 'SQLite'],
    details: {
      en: 'A Go terminal client connects to a TypeScript API. WebSockets deliver messages in real time, with authentication, friend requests, and persistent chat history.',
      pt: 'Um cliente de terminal em Go se conecta a uma API TypeScript. WebSockets entregam mensagens em tempo real, com autenticação, pedidos de amizade e histórico persistente.',
    },
    repoUrl: 'https://github.com/VitorCesarinoMarchese/chat-terminal',
  },
  {
    id: 'portfolio',
    area: 'web',
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
]

export const professionalExperience: ProfessionalExperience[] = cvContent.experience.map(
  ({ bullets, ...experience }) => ({ ...experience, highlights: bullets }),
)

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
    id: 'frontend',
    title: {
      en: 'Frontend',
      pt: 'Frontend',
    },
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Mantine', 'HTML/CSS'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'backend',
    title: {
      en: 'Backend',
      pt: 'Backend',
    },
    items: ['Node.js', 'Express', 'Go', 'REST APIs', 'WebSockets', 'JWT'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'data',
    title: {
      en: 'Data & automation',
      pt: 'Dados e automação',
    },
    items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Supabase', 'n8n'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'systems',
    title: {
      en: 'Systems & desktop',
      pt: 'Sistemas e desktop',
    },
    items: ['C', 'C++23', 'Rust', 'UDP', 'FFmpeg', 'PipeWire', 'egui'].map((item) => ({ en: item, pt: item })),
  },
  {
    id: 'tooling',
    title: {
      en: 'Tools & testing',
      pt: 'Ferramentas e testes',
    },
    items: ['Git', 'Linux', 'Docker', 'CMake', 'Cypress', 'Vitest', 'Figma'].map((item) => ({ en: item, pt: item })),
  },
]

export const cvInfo = {
  files: {
    en: '/cv-en.pdf',
    pt: '/cv-pt.pdf',
  } satisfies Record<LocaleCode, string>,
  lastUpdated: '2026-10',
}

export const getCvFileUrl = (locale: LocaleCode): string => cvInfo.files[locale] ?? cvInfo.files.en

export const getLocalizedText = (value: LocalizedText, locale: LocaleCode): string => value[locale]
