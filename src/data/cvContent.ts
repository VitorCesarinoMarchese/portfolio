import type { LocalizedText } from './portfolioContent.ts'

export const cvContent = {
  phone: '+55 (11) 98755-1050',
  summary: {
    en: 'Software Engineering student at FIAP and Software Development Intern at Genova, building web applications, integrations, and process automations with React, TypeScript, Supabase, and n8n. Previous freelance experience with Next.js and Cypress. Seeking full stack opportunities, with personal projects in Rust desktop development and C++23 networking on Linux.',
    pt: 'Estudante de Engenharia de Software na FIAP e estagiário em Desenvolvimento de Software na Genova, com atuação em aplicações web, integrações e automação de processos usando React, TypeScript, Supabase e n8n. Experiência freelance anterior com Next.js e Cypress. Busco oportunidades full stack, com projetos pessoais em aplicações desktop em Rust e redes em C++23 no Linux.',
  } satisfies LocalizedText,
  experience: [
    {
      company: 'Genova',
      role: {
        en: 'Software Development Intern',
        pt: 'Estagiário em Desenvolvimento de Software',
      } satisfies LocalizedText,
      period: { en: 'Jul 2026 to present', pt: 'Jul 2026 até o presente' } satisfies LocalizedText,
      bullets: [
        {
          en: 'Build and maintain web applications, integrations, and dashboards for operational teams, reducing manual work and improving access to information.',
          pt: 'Desenvolvo e mantenho aplicações web, integrações e dashboards para equipes operacionais, reduzindo tarefas manuais e facilitando o acesso a informações.',
        },
        {
          en: 'Implement interfaces, database operations, and business rules with React, TypeScript, Supabase, n8n, APIs, and AI tools.',
          pt: 'Implemento interfaces, operações em banco de dados e regras de negócio com React, TypeScript, Supabase, n8n, APIs e ferramentas de IA.',
        },
        {
          en: 'Improve performance and access control, and investigate and fix application issues.',
          pt: 'Atuo em melhorias de desempenho e controle de acesso, além de investigar e corrigir problemas nas aplicações.',
        },
      ] satisfies LocalizedText[],
    },
    {
      company: 'Westpoint',
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
        en: 'Open-source Sims 4 mod manager for Linux in Rust with egui/eframe. Local library, folder/ZIP imports, mod activation, recoverable trash, and CurseForge discovery with browser-assisted installation. AppImage updates verify downloads and support rollback. First alpha in development.',
        pt: 'Gerenciador de mods do The Sims 4 para Linux em Rust com egui/eframe, de código aberto. Biblioteca local, importação de pastas/ZIPs, ativação de mods, lixeira recuperável e descoberta no CurseForge com instalação via navegador. Atualizações do AppImage verificam downloads e permitem reversão. Primeira alfa em desenvolvimento.',
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
