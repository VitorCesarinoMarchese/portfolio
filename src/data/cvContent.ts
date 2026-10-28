import type { LocalizedText } from './portfolioContent.ts'

export const cvContent = {
  phone: '+55 (11) 98755-1050',
  summary: {
    en: 'Software Engineering student at FIAP and Software Development Intern at Genova. Build recruitment applications, WhatsApp integrations, and AI screening workflows with React, TypeScript, PostgreSQL, Supabase, and n8n. Previous freelance work with Next.js and Cypress. Seeking full stack opportunities, with personal projects in Rust and C++ on Linux.',
    pt: 'Estudante de Engenharia de Software na FIAP e estagiário em Desenvolvimento de Software na Genova. Desenvolvo aplicações de recrutamento, integrações com WhatsApp e triagem com IA usando React, TypeScript, PostgreSQL, Supabase e n8n. Experiência freelance com Next.js e Cypress. Busco oportunidades full stack, com projetos pessoais em Rust e C++ no Linux.',
  } satisfies LocalizedText,
  experience: [
    {
      id: 'genova',
      company: 'Genova',
      stack: ['React', 'TypeScript', 'PostgreSQL', 'Supabase Edge Functions', 'n8n', 'Gupshup'],
      role: {
        en: 'Software Development Intern',
        pt: 'Estagiário em Desenvolvimento de Software',
      } satisfies LocalizedText,
      period: { en: 'Jul 2026 to present', pt: 'Jul 2026 até o presente' } satisfies LocalizedText,
      bullets: [
        {
          en: 'Built WhatsApp outreach and messaging inside the recruitment portal using Gupshup, Supabase Edge Functions, and PostgreSQL, including incoming messages, delivery tracking, and recruiter replies.',
          pt: 'Integrei comunicação por WhatsApp ao portal de recrutamento com Gupshup, Supabase Edge Functions e PostgreSQL, incluindo envio a candidatos, mensagens recebidas, status de entrega e respostas dos recrutadores.',
        },
        {
          en: 'Developed AI candidate screening with vacancy lookups, conversation stages, and recruiter handoff. Added semantic checks and a correction attempt to guard against repetitive questions.',
          pt: 'Desenvolvi triagem de candidatos com IA, consulta de vagas, etapas de conversa e transferência para recrutadores. Adicionei verificações semânticas e uma tentativa de correção para evitar perguntas repetitivas.',
        },
        {
          en: 'Hardened PostgreSQL/Supabase message workers with duplicate-processing protection, retries, interrupted-job recovery, and ownership checks to coordinate automated and recruiter responses.',
          pt: 'Reforcei o processamento de mensagens com PostgreSQL e Supabase, incluindo proteção contra duplicidade, retentativas, recuperação de tarefas interrompidas e controle das conversas entre IA e recrutadores.',
        },
      ] satisfies LocalizedText[],
    },
    {
      id: 'westpoint',
      company: 'Westpoint',
      stack: ['React', 'Next.js', 'TypeScript', 'Mantine', 'Cypress', 'Figma'],
      role: {
        en: 'Freelance Frontend Developer',
        pt: 'Desenvolvedor Frontend Freelancer',
      } satisfies LocalizedText,
      period: { en: 'Mar 2025 to May 2025', pt: 'Mar 2025 a mai 2025' } satisfies LocalizedText,
      bullets: [
        {
          en: 'Built responsive, accessible interfaces with React, Next.js, TypeScript, and Mantine, translating Figma designs into reusable components.',
          pt: 'Desenvolvi interfaces responsivas e acessíveis com React, Next.js, TypeScript e Mantine, transformando layouts do Figma em componentes reutilizáveis.',
        },
        {
          en: 'Integrated REST APIs for dynamic interface updates and implemented end-to-end tests with Cypress for critical application flows.',
          pt: 'Integrei APIs REST para atualização dinâmica das interfaces e implementei testes end-to-end com Cypress para os fluxos críticos da aplicação.',
        },
      ] satisfies LocalizedText[],
    },
  ],
  projects: [
    {
      id: 'plumcrate',
      description: {
        en: 'Open-source Sims 4 mod manager for Linux in Rust with egui/eframe. Folder/ZIP imports, mod activation, recoverable trash, and CurseForge integration. AppImage updates verify downloads and support rollback. First alpha in development.',
        pt: 'Gerenciador de mods do The Sims 4 para Linux em Rust com egui/eframe, de código aberto. Importação de pastas/ZIPs, ativação de mods, lixeira recuperável e integração com CurseForge. Atualizações do AppImage com verificação e reversão. Primeira alfa em desenvolvimento.',
      } satisfies LocalizedText,
    },
    {
      id: 'larp',
      description: {
        en: 'Experimental C++23 screen streaming over UDP with PipeWire, FFmpeg H.264, and SDL3. Adaptive bitrate, libsodium-authenticated sessions, and restart recovery verified between two Linux machines over Tailscale. Includes integration tests, sanitizers, and memory measurements.',
        pt: 'Transmissão experimental de tela em C++23 sobre UDP com PipeWire, FFmpeg H.264 e SDL3. Bitrate adaptativo, sessões autenticadas com libsodium e recuperação após reinícios, verificados entre duas máquinas Linux via Tailscale. Inclui testes de integração, sanitizadores e medições de memória.',
      } satisfies LocalizedText,
    },
  ],
  education: [
    {
      institution: 'FIAP',
      degree: {
        en: 'B.Sc. in Software Engineering, in progress',
        pt: 'Bacharelado em Engenharia de Software, em andamento',
      } satisfies LocalizedText,
      period: { en: '2024 to 2027, expected', pt: '2024 a 2027, previsão' } satisfies LocalizedText,
    },
    {
      institution: 'FIAP School',
      degree: {
        en: 'Technical High School, Web Development',
        pt: 'Ensino Médio Técnico em Desenvolvimento Web',
      } satisfies LocalizedText,
      period: { en: '2021 to 2023', pt: '2021 a 2023' } satisfies LocalizedText,
    },
  ],
  languages: {
    en: 'Portuguese, native · English, fluent',
    pt: 'Português nativo · Inglês fluente',
  } satisfies LocalizedText,
}
