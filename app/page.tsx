import Link from "next/link";
import { cms } from "@/lib/cms";
import { HeroWordmark } from "@/components/hero-wordmark";
import { SplitText } from "@/components/split-text";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { VoicesSection } from "@/components/voices-section";
import { Carousel } from "@/components/carousel";

export const revalidate = 60;

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const [year, month, day] = iso.split("-");
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  } catch {
    return iso;
  }
}

export default async function HomePage() {
  const [homeData, vozes, projetos, proximoEvento] = await Promise.all([
    cms.getHomePage(),
    cms.getVozesDestaque(),
    cms.getProjetos(),
    cms.getProximoEvento(),
  ]);

  return (
    <div className="home-page">
      <HeroWordmark lines={homeData.heroTitleLines} />

      <section className="intro">
        <div className="intro__text">
          <h2 className="intro__title split">
            <SplitText text={homeData.introTitle} />
          </h2>
          <p className="intro__lead rv">{homeData.introLead}</p>
          <div className="intro__body rv" style={{ "--d": ".12s" } as React.CSSProperties}>
            {homeData.introText ? (
              homeData.introText.split("\n\n").map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>
                O LabHO reúne pesquisadoras, pesquisadores e estudantes do
                Departamento de História da UFV em torno da história oral como
                método, fonte e compromisso público.
              </p>
            )}
            <Link className="link-it" href="/laboratorio">
              Conheça o laboratório
            </Link>
          </div>
        </div>
        <MediaPlaceholder
          image={homeData.introImage}
          className="intro__media rv"
          aspectRatio="5/6"
          priority
        />
      </section>

      {vozes.length >= 2 && (
        <VoicesSection
          title={homeData.voicesTitle}
          hint={homeData.voicesHint}
          vozes={vozes}
        />
      )}

      {homeData.gallery && homeData.gallery.length > 0 && (
        <Carousel title={homeData.galleryTitle} items={homeData.gallery} />
      )}

      {projetos.map((p, i) => (
        <section
          key={p._id}
          className={`split-block ${i % 2 !== 0 ? "rev" : ""}`}
        >
          <MediaPlaceholder
            image={p.coverImage}
            className="rv"
            aspectRatio="4/5"
            seed={i}
          />
          <div>
            <p className="eyebrow rv">
              Acervo · {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="split">
              <SplitText text={p.title} />
            </h2>
            {p.excerpt && <p className="rv">{p.excerpt}</p>}
            <Link className="cta rv" href={`/acervo/${p.slug}#entrevistas`}>
              Ver entrevistas
            </Link>
          </div>
        </section>
      ))}

      <section className="split-block">
        <div>
          <p className="eyebrow rv">{homeData.agendaEyebrow || "Agenda"}</p>
          <h2 className="split">
            <SplitText
              text={
                homeData.agendaTitle ||
                "Encontros, oficinas e *rodas de conversa.*"
              }
            />
          </h2>
          <p className="rv">{homeData.agendaText}</p>
          <Link className="cta cta--solid rv" href="/eventos">
            Todos os eventos
          </Link>
        </div>
        {proximoEvento ? (
          <Link
            href={`/eventos/${proximoEvento.slug}`}
            aria-label={proximoEvento.title}
          >
            <MediaPlaceholder
              image={proximoEvento.coverImage}
              className="rv"
              aspectRatio="4/5"
              tag={`${formatDate(proximoEvento.data)} — ${proximoEvento.title}`}
              seed={2}
            />
          </Link>
        ) : (
          <MediaPlaceholder className="rv" aspectRatio="4/5" seed={2} />
        )}
      </section>
    </div>
  );
}
