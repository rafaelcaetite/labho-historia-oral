import Link from "next/link";
import { SplitText } from "@/components/split-text";

export default function NotFound() {
  return (
    <div style={{ padding: "clamp(80px, 12vw, 160px) var(--gut)", maxWidth: "800px" }}>
      <p className="eyebrow rv">Erro 404</p>
      <h1 className="split" style={{ fontSize: "clamp(40px, 5vw, 76px)", color: "var(--sun)", margin: "0 0 24px" }}>
        <SplitText text="Página *não encontrada*" />
      </h1>
      <p className="rv" style={{ fontSize: "20px", color: "var(--ink-2)", lineHeight: 1.5, margin: "0 0 36px" }}>
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link href="/" className="cta cta--solid rv">
        Voltar ao início
      </Link>
    </div>
  );
}
