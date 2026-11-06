import type { Metadata, Viewport } from "next";

import { StudioClient } from "@/components/studio-client";
import { sanityEstaConfigurado } from "@/lib/cms/projeto-sanity";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Painel de conteúdo — LabHO",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  if (!sanityEstaConfigurado) {
    return <AvisoDeConfiguracao />;
  }
  return <StudioClient />;
}

function AvisoDeConfiguracao() {
  return (
    <main style={{ maxWidth: "680px", margin: "0 auto", padding: "80px 24px", fontFamily: "var(--sans)" }}>
      <p style={{ letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "12px", color: "var(--sun)", fontWeight: 500, margin: "0 0 16px" }}>
        Painel de Edição Sanity Studio
      </p>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, color: "var(--ink)", margin: "0 0 24px" }}>
        O painel ainda não está conectado ao Sanity
      </h1>
      <p style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 32px" }}>
        O site está no ar com 100% das páginas e dados de exemplo ativos. Para que a equipe do Laboratório de História Oral
        possa editar projetos, entrevistas, fotos, falas 3D, eventos e contatos em tempo real pelo Sanity Studio,
        basta conectar seu projeto gratuito no Sanity:
      </p>

      <ol style={{ borderTop: "1px solid var(--line)", padding: "28px 0 0 20px", color: "var(--ink)", lineHeight: 1.8, fontSize: "16px" }}>
        <li style={{ marginBottom: "16px" }}>
          <strong>Crie um projeto gratuito:</strong> Acesse{" "}
          <a
            href="https://sanity.io/manage"
            target="_blank"
            rel="noreferrer noopener"
            style={{ color: "var(--sun)", textDecoration: "underline" }}
          >
            sanity.io/manage
          </a>{" "}
          e copie o seu <em>Project ID</em>.
        </li>
        <li style={{ marginBottom: "16px" }}>
          <strong>Preencha o arquivo <code>.env.local</code>:</strong> Adicione seu ID na variável:
          <pre style={{ background: "rgba(0,0,0,0.06)", padding: "10px 14px", borderRadius: "6px", margin: "8px 0", fontSize: "14px" }}>
            NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
          </pre>
        </li>
        <li style={{ marginBottom: "16px" }}>
          <strong>Libere o endereço do site (CORS):</strong> Em <em>API &rarr; CORS origins</em> no painel do Sanity, adicione <code>http://localhost:3000</code> (e o domínio de produção).
        </li>
        <li style={{ marginBottom: "16px" }}>
          <strong>Importe os dados iniciais com 1 clique:</strong> Rode no terminal:
          <pre style={{ background: "rgba(0,0,0,0.06)", padding: "10px 14px", borderRadius: "6px", margin: "8px 0", fontSize: "14px" }}>
            npm run seed
          </pre>
        </li>
      </ol>

      <div style={{ marginTop: "40px" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            background: "var(--sun)",
            color: "var(--sand)",
            borderRadius: "999px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Voltar ao site
        </a>
      </div>
    </main>
  );
}
