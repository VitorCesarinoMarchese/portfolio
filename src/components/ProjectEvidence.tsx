import type { LocaleCode } from '../data/portfolioContent.ts'

const larpSource = 'https://github.com/VitorCesarinoMarchese/larp/blob/677b7d9076984d7d3f95266290883fd9cee6fc6d'
const plumSource = 'https://github.com/VitorCesarinoMarchese/PlumCrate/blob/2986334ebef2a471534f62c7f38f48254d8e1f60'

export function ProjectEvidence({ projectId, locale }: { projectId: string; locale: LocaleCode }) {
  const pt = locale === 'pt'
  if (projectId === 'larp') {
    return (
      <div className="project-evidence">
        <figure className="architecture">
          <figcaption>{pt ? 'Como a transmissão funciona' : 'How the stream works'}</figcaption>
          <div className="architecture-machines">
            <div><strong>{pt ? 'Linux · emissor' : 'Linux · sender'}</strong><ol><li>{pt ? 'Captura PipeWire' : 'PipeWire capture'}</li><li>FFmpeg · H.264</li></ol></div>
            <span className="architecture-transport">UDP / Tailscale <span aria-hidden="true">→</span><small>libsodium</small></span>
            <div><strong>{pt ? 'Linux · receptor' : 'Linux · receiver'}</strong><ol><li>{pt ? 'Remontagem e decodificação' : 'Reassembly & decode'}</li><li>{pt ? 'Exibição SDL3' : 'SDL3 display'}</li></ol></div>
          </div>
          <p className="architecture-feedback">← {pt ? 'Feedback do receptor ajusta o bitrate do emissor' : 'Receiver feedback adjusts the sender bitrate'}</p>
        </figure>
        <details className="case-study">
          <summary>{pt ? 'Testes, método e limitações' : 'Tests, method & limitations'}</summary>
          <h5>{pt ? 'Duas máquinas Linux via Tailscale' : 'Two Linux machines over Tailscale'}</h5>
          <p>{pt ? 'Execução Release de 3 de outubro de 2026, com vídeo H.264 sintético. Estas medições foram coletadas no projeto e estão acompanhadas dos logs originais.' : 'Release run on October 3, 2026, using synthetic H.264 video. These measurements were collected in the project and are backed by the original logs.'}</p>
          <dl className="evidence-metrics">
            <div><dt>{pt ? 'Meta de envio' : 'Sender target'}</dt><dd>30 FPS</dd></div>
            <div><dt>{pt ? 'Frames exibidos' : 'Frames presented'}</dt><dd>900 / 900</dd></div>
            <div><dt>{pt ? 'Decodificação média' : 'Mean decode time'}</dt><dd>{pt ? '2,571 ms' : '2.571 ms'}</dd></div>
            <div><dt>{pt ? 'Chamada de exibição média' : 'Mean presentation call'}</dt><dd>{pt ? '7,585 ms' : '7.585 ms'}</dd></div>
          </dl>
          <p>{pt ? 'O receptor mede a duração das chamadas de decodificação e apresentação. A apresentação inclui cópia RGB, escala e atualização SDL. Os tempos não incluem a varredura do monitor e não representam latência de ponta a ponta. O FPS é a meta do emissor, não uma garantia de entrega em outras redes.' : 'The receiver times decode and presentation calls. Presentation includes the RGB copy, scaling, and SDL update. These timings exclude display scanout and are not end-to-end latency. FPS is the sender target, not a delivery guarantee on other networks.'}</p>
          <p>{pt ? 'No teste adaptativo separado, o proxy descartou 20 pacotes de vídeo e oito respostas de feedback. Todos os 340 frames restantes foram decodificados e exibidos, sem corrupção. O bitrate caiu durante a perda e voltou a subir nos períodos limpos. Testes de sessão também cobrem reinícios e um bloqueio bidirecional de 1,5 segundo.' : 'In a separate adaptive test, the proxy dropped 20 video packets and eight feedback replies. All 340 surviving frames decoded and displayed without corruption. Bitrate fell during loss and increased during clean periods. Session tests also cover restarts and a 1.5-second bidirectional blackhole.'}</p>
          <h5>{pt ? 'Reproduzir a medição' : 'Reproduce the measurement'}</h5>
          <p>{pt ? 'Compile a mesma versão nas duas máquinas Linux. Substitua os endereços e o caminho do build no comando; o guia registra os pré-requisitos e o método completo.' : 'Build the same revision on both Linux machines. Replace the addresses and build path below; the guide records prerequisites and the full method.'}</p>
          <pre><code>{`python3 benchmarks/render.py build-release --frames 900 --fps 30 \
  --bind RECEIVER_TAILSCALE_IP --remote user@SENDER_TAILSCALE_IP \
  --remote-build /path/to/sender/build-release`}</code></pre>
          <p className="evidence-caveat">{pt ? 'Ainda não há vídeo gravado da demonstração, medição de uso de CPU ou latência de ponta a ponta. Algumas execuções com sanitizadores perderam frames; a causa não foi isolada. Windows não está implementado e a validação NVIDIA está bloqueada por vazamentos no driver.' : 'A recorded demonstration, CPU utilization, and end-to-end latency measurements are still missing. Some sanitizer runs lost frames; the cause was not isolated. Windows is unimplemented and NVIDIA acceptance is blocked by driver leaks.'}</p>
          <div className="evidence-links">
            <a href={`${larpSource}/docs/rendering.md#two-machine-tailscale-acceptance-on-2026-10-03`} target="_blank" rel="noreferrer">{pt ? 'Método e resultados' : 'Method & results'}</a>
            <a href={`${larpSource}/benchmarks/results/milestone-six-tailscale-release.log`} target="_blank" rel="noreferrer">{pt ? 'Log original' : 'Original log'}</a>
            <a href={`${larpSource}/docs/adaptive.md`} target="_blank" rel="noreferrer">{pt ? 'Teste de perda de pacotes' : 'Packet-loss test'}</a>
            <a href={`${larpSource}/docs/session-verification.md`} target="_blank" rel="noreferrer">{pt ? 'Recuperação de sessões' : 'Session recovery'}</a>
          </div>
        </details>
      </div>
    )
  }
  if (projectId === 'plumcrate') {
    return (
      <div className="project-evidence">
        <figure className="app-screenshot">
          <a href="/projects/plumcrate/library-light.png" target="_blank" rel="noreferrer"><img src="/projects/plumcrate/library-light.png" width="1440" height="1000" loading="lazy" alt={pt ? 'PlumCrate em modo claro, com biblioteca de mods por foto, busca e controles de ativação' : 'PlumCrate in light mode with a photo-based mod library, search, and activation switches'} /></a>
          <figcaption>{pt ? 'Aplicação real em uma biblioteca de demonstração isolada. Clique para ampliar.' : 'The real application in an isolated demo library. Select to enlarge.'} <a href={`${plumSource}/docs/images/README.md`} target="_blank" rel="noreferrer">{pt ? 'Créditos das capas e método de captura' : 'Cover credits & capture method'}</a></figcaption>
        </figure>
        <details className="case-study">
          <summary>{pt ? 'Instalação, segurança de arquivos e testes' : 'Installation, file safety & tests'}</summary>
          <p className="release-status">{pt ? 'Pré-lançamento · primeira alfa em preparação. Ainda não há versão pública para download.' : 'Pre-release · first alpha in preparation. No public release download yet.'}</p>
          <h5>{pt ? 'Executar a partir do código' : 'Run from source'}</h5>
          <p>{pt ? 'Requer Linux com sessão gráfica, Rust 1.98 ou mais recente e as dependências gráficas descritas no guia. Na raiz do repositório:' : 'Requires a graphical Linux session, Rust 1.98 or newer, and the graphics dependencies in the guide. From the repository root:'}</p>
          <pre><code>cargo run --manifest-path native/Cargo.toml --locked</code></pre>
          <ul>
            <li>{pt ? 'Importação e ativação: operações revisadas, metadados por mod e verificações de propriedade antes de alterar arquivos ou links. Arquivos não gerenciados não são removidos.' : 'Imports and activation: reviewed operations, per-mod metadata, and ownership checks before changing files or links. Unmanaged files are not removed.'}</li>
            <li>{pt ? 'Atualizações interrompidas: o download fica em um arquivo temporário. Tamanho, SHA-256, formato, arquitetura e versão são verificados antes da substituição. Falhas de rede ou verificação mantêm a aplicação instalada.' : 'Interrupted updates: downloads stay in a temporary file. Size, SHA-256, format, architecture, and version are checked before replacement. Network or verification failures leave the installed application unchanged.'}</li>
            <li>{pt ? 'Reversão: o AppImage anterior é preservado. A aplicação só fecha após a nova janela confirmar a inicialização; falhas restauram a versão anterior. Os testes cobrem instalação, backups e falhas de inicialização em diretórios temporários.' : 'Rollback: the previous AppImage is preserved. The application closes only after the new window acknowledges startup; failures restore the previous version. Tests exercise installation, backups, and startup failures in temporary directories.'}</li>
            <li>{pt ? 'Segurança de arquivos: a lixeira permite restaurar mods gerenciados. A recuperação de inicialização preserva caminhos alterados ou ambíguos. A verificação de catálogo usa bibliotecas sintéticas de até 10.000 grupos e confere que os arquivos de entrada não mudaram.' : 'File safety: trash supports restoring managed mods. Startup recovery preserves changed or ambiguous paths. Catalog verification uses synthetic libraries of up to 10,000 groups and checks that input files remain unchanged.'}</li>
          </ul>
          <figure className="app-screenshot"><img src="/projects/plumcrate/settings.png" width="1440" height="1000" loading="lazy" alt={pt ? 'Configurações reais do PlumCrate com opções de aparência e pastas do jogo' : 'Actual PlumCrate settings with appearance options and game folders'} /><figcaption>{pt ? 'Configurações da aplicação, capturadas em um ambiente de demonstração.' : 'Application settings, captured in a demo environment.'}</figcaption></figure>
          <div className="evidence-links">
            <a href={`${plumSource}/docs/development.md`} target="_blank" rel="noreferrer">{pt ? 'Instalação e verificação' : 'Installation & verification'}</a>
            <a href={`${plumSource}/docs/app-updates.md`} target="_blank" rel="noreferrer">{pt ? 'Atualizações e testes de reversão' : 'Updates & rollback tests'}</a>
            <a href="https://github.com/VitorCesarinoMarchese/PlumCrate/releases" target="_blank" rel="noreferrer">{pt ? 'Consultar versões publicadas' : 'Check published releases'}</a>
          </div>
        </details>
      </div>
    )
  }
  return null
}
