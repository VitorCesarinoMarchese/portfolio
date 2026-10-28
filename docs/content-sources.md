# Content sources

Reviewed on October 28, 2026. The profile and CV target full stack roles with Linux and systems projects, as requested by Vitor.

## Employment and background

- Genova comes from the newer local CV, `vitor_cesarino_marchese_estagio_em_ti.pdf` in Documents. It lists Software Development Intern, July 2026 to present, with React, TypeScript, Supabase, n8n, APIs, dashboards, automation, performance improvements, and access control.
- Vitor subsequently supplied his Genova responsibilities and ten concrete deliveries directly. The published experience selects WhatsApp integration, AI screening with safeguards and recruiter handoff, and reliable background messaging. Technologies and qualitative outcomes come from that account. No numerical impact or performance claim was added. This direct account replaces the need to infer deliverables from inaccessible work threads.
- Westpoint comes from the previous English and Portuguese portfolio CVs. They list Freelance Frontend Developer, March to May 2025, with React, Next.js, TypeScript, Mantine, REST APIs, Cypress, and Figma.
- Both CV sources agree on FIAP Software Engineering, 2024 to 2027, expected; FIAP School Web Development, 2021 to 2023; contact details; Portuguese native; and English fluent.
- GitHub also lists São Paulo. No new employment dates, usage metrics, or performance claims were inferred from commit activity.
- The supplied [LinkedIn profile](https://www.linkedin.com/in/vitor-cesarino/) blocks direct fetching. Its public search listing confirms FIAP dates and Alura courses in C and Go, but shows an older Colde Labs affiliation without a role or dates. A newer [LinkedIn directory listing](https://br.linkedin.com/pub/dir/%2B/Marchese/br-6368-S%C3%A3o-Paulo-e-Regi%C3%A3o) shows Genova AI for Business. Vitor explicitly requested that Colde Labs be excluded from the CV. Do not add it based on LinkedIn or other source material. The existing CV's language levels were retained.

## Projects

- [PlumCrate README](https://github.com/VitorCesarinoMarchese/PlumCrate/blob/2986334e/README.md) and [native Cargo manifest](https://github.com/VitorCesarinoMarchese/PlumCrate/blob/2986334e/native/Cargo.toml) confirm Rust, egui/eframe, Linux support, local mod management, CurseForge integration, and AppImage updates. The first alpha release was a draft at review time. The [project website](https://plumcrate.vercel.app/) is linked as a website, not an in-browser app demo.
- [L.A.R.P. README](https://github.com/VitorCesarinoMarchese/larp/blob/677b7d90/README.md), [adaptive streaming](https://github.com/VitorCesarinoMarchese/larp/blob/677b7d90/docs/adaptive.md), and [session verification](https://github.com/VitorCesarinoMarchese/larp/blob/677b7d90/docs/session-verification.md) describe the current Linux implementation. Adaptive bitrate, authenticated sessions, recovery, and two-machine Tailscale verification are documented. Windows is unimplemented. NVIDIA acceleration is implemented, with acceptance blocked by driver leaks. The GitHub version is newer than this machine's local L.A.R.P. checkout.
- [Chat Terminal README](https://github.com/VitorCesarinoMarchese/chat-terminal#readme) confirms the Go client, TypeScript/Express API, JWT, WebSockets, Prisma, PostgreSQL container runtime, and SQLite tests/client state. Redis exists as optional infrastructure, so it is no longer a main project stack label.
- [Currency Exchange README](https://github.com/VitorCesarinoMarchese/Exchange_of_Currencies#readme) and its frontend manifest confirm the existing project description and Next.js stack.

Private thread context was used to understand the work, then checked against the public repositories. Internal thread links, machine addresses, and local environment details are not included in portfolio copy or CVs.

## Evidence shown on the site

- L.A.R.P.'s [two-machine rendering report](https://github.com/VitorCesarinoMarchese/larp/blob/677b7d9076984d7d3f95266290883fd9cee6fc6d/docs/rendering.md#two-machine-tailscale-acceptance-on-2026-10-03) records 900 presented frames at a 30 FPS sender target, with mean decode time 2,571 microseconds and mean presentation-call time 7,585 microseconds. These are recorded test results from October 3, 2026, not new portfolio-session measurements. The site distinguishes call timing from end-to-end latency and discloses losses in sanitizer runs.
- The separate adaptive and session reports supply the controlled-loss and recovery descriptions. The architecture diagram describes the actual capture/codec/transport/display path; it is not a screenshot. No recorded demo, CPU utilization, or end-to-end latency claim was added.
- PlumCrate's library and settings PNGs are copied unchanged from commit `2986334ebef2a471534f62c7f38f48254d8e1f60`. Their source and third-party cover-art credits are linked in the screenshot caption. Installation and safety descriptions come from that revision's development and AppImage-update guides. The first alpha remained unpublished at review time.
