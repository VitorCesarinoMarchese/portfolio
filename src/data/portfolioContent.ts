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
  items: string[]
}

export const profile = {
  name: 'Vitor Cesarino Marchese',
  role: {
    en: 'Full Stack Developer',
    pt: 'Desenvolvedor Full Stack',
  } satisfies LocalizedText,
  bio: [
    {
      en: 'I design and build modern web products with strong user experience and maintainable architecture.',
      pt: 'Eu projeto e desenvolvo produtos web modernos com foco na experiência do usuário e em uma arquitetura de fácil manutenção.',
    },
    {
      en: 'This portfolio brings engineering, visual design, and interaction together in a desktop inspired by KDE Plasma.',
      pt: 'Este portfólio reúne engenharia, design visual e interação em um desktop inspirado no KDE Plasma.',
    },
  ] satisfies LocalizedText[],
}

export const projects: PortfolioProject[] = [
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
  {
    id: 'chat-terminal',
    title: {
      en: 'Chat Terminal',
      pt: 'Chat Terminal',
    },
    description: {
      en: 'A terminal chat app with a Go interface and a TypeScript backend.',
      pt: 'Uma aplicação de chat no terminal com interface em Go e backend em TypeScript.',
    },
    stack: ['Go', 'TypeScript', 'Redis', 'SQL'],
    details: {
      en: 'A Go terminal client connects to a TypeScript API. WebSockets deliver messages in real time, with authentication, friend requests, and persistent chat history.',
      pt: 'Um cliente de terminal em Go se conecta a uma API TypeScript. WebSockets entregam mensagens em tempo real, com autenticação, pedidos de amizade e histórico persistente.',
    },
    repoUrl: 'https://github.com/VitorCesarinoMarchese/chat-terminal',
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
    id: 'frontend',
    title: {
      en: 'Frontend',
      pt: 'Frontend',
    },
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML/CSS'],
  },
  {
    id: 'backend',
    title: {
      en: 'Backend',
      pt: 'Backend',
    },
    items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'SQL'],
  },
  {
    id: 'tooling',
    title: {
      en: 'Tooling',
      pt: 'Ferramentas',
    },
    items: ['Docker', 'Git', 'Linux', 'Vite', 'Figma'],
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
