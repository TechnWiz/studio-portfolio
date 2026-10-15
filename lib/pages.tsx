import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/content";
import { copy, projects, studio } from "@/lib/content";
import { ContactForm, Header, HeroHeadline, HeroSupporting, OptionalModel, PageTransition, ProjectGrid, Reveal } from "@/components/site";
import { HeroScene } from "@/components/hero-scene";
import { StudioArtwork } from "@/components/studio-scene";

export function validLocale(value: string): value is Locale { return value === "en" || value === "ru"; }
function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <footer className="site-footer"><Link className="wordmark" href={`/${locale}`}><span className="mark">◉</span>{studio.name}</Link><p>{t.footer}</p><div><span>{studio.location[locale]}</span><span>© 2026</span></div></footer>;
}
export function PageShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  if (!validLocale(locale)) notFound();
  return <><Header locale={locale}/><PageTransition>{children}</PageTransition><SiteFooter locale={locale}/></>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <PageShell locale={locale}><main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="live-dot"/>{t.eyebrow}</p><HeroHeadline first={t.heroA} second={t.heroB}/><HeroSupporting text={t.intro} action={t.explore} href={`/${locale}/work`}/></div><HeroScene locale={locale}/><a className="scroll-hint" href="#selected">{t.scroll}<span>↓</span></a><span className="hero-counter">01 — {String(projects.length).padStart(2, "0")}</span></section>
    <Reveal><section className="section work-section" id="selected"><div className="section-heading"><div><span className="eyebrow">01 / {t.portfolioTag}</span><h2>{t.work}<span className="accent-dot">.</span></h2><p>{t.workNote}</p></div><Link className="text-link" href={`/${locale}/work`}>{t.allWork}<span>↗</span></Link></div><ProjectGrid locale={locale}/></section></Reveal>
    <Reveal><section className="manifesto"><span className="eyebrow">02 / {t.approachTag}</span><p>{t.studio}</p><span className="manifesto-orbit" aria-hidden="true">◎</span></section></Reveal>
    <Reveal><section className="section services-preview"><div className="section-heading"><div><span className="eyebrow">03 / {t.capabilitiesTag}</span><h2>{t.services}<span className="accent-dot">.</span></h2><p>{t.servicesNote}</p></div><Link className="text-link" href={`/${locale}/services`}>{t.allServices}<span>↗</span></Link></div><div className="service-lines">{t.serviceList.map((service, i) => <Link href={`/${locale}/services`} key={service}><span>0{i + 1}</span><b>{service}</b><i>↗</i></Link>)}</div></section></Reveal>
    <Reveal><section className="studio-strip"><StudioArtwork locale={locale}/><div><span className="eyebrow">04 / {t.studioTag}</span><h2>{t.studio}</h2><p>{t.studioText}</p><p className="location-note">{t.location}</p><Link className="text-link" href={`/${locale}/studio`}>{t.aboutStudio}<span>↗</span></Link></div></section></Reveal>
    <Reveal><section className="contact-band"><span className="eyebrow">05 / {t.openProjectsTag}</span><h2>{t.contact}</h2><p>{t.contactText}</p><Link className="button button-light" href={`/${locale}/contact`}>{t.startProject}<span>↗</span></Link></section></Reveal>
  </main></PageShell>;
}
export function WorkPage({ locale }: { locale: Locale }) { const t = copy[locale]; return <PageShell locale={locale}><main className="inner-page"><div className="page-intro"><span className="eyebrow">01 / {t.portfolioTag} · {studio.location[locale]}</span><h1>{t.work}<span className="accent-dot">.</span></h1><p>{t.workNote}</p></div><ProjectGrid locale={locale} all/></main></PageShell>; }
export function ProjectPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const t = copy[locale]; const index = projects.indexOf(project); const next = projects[(index + 1) % projects.length];
  return <PageShell locale={locale}><main className="inner-page case-page"><Link className="back-link" href={`/${locale}/work`}>← {t.back}</Link><div className="case-heading"><span className="eyebrow">{t.category[project.category]} / {t.projectConcept}</span><h1>{project.title[locale]}</h1><p>{project.summary[locale]}</p><span className="concept-label">{project.status[locale]}</span></div>
    <div className={`case-art artwork ${project.colors}`}><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="orb-core"/><span className="art-grain"/><span className="art-index">{t.projectConcept} / {String(index + 1).padStart(2, "0")}</span>{project.media?.video && <video className={`case-video${project.media.poster ? "" : " video-no-poster"}`} muted playsInline loop controls preload="none" poster={project.media.poster} aria-label={project.summary[locale]} onLoadedData={(event) => event.currentTarget.dataset.ready = "true"} onError={(event) => event.currentTarget.classList.add("media-error")}><source media="(max-width: 700px)" src={project.media.mobileVideo}/><source src={project.media.video} type={project.media.video.toLowerCase().endsWith(".mp4") ? "video/mp4" : "video/webm"}/><span>{t.mediaFallback}</span></video>}</div>
    <div className="case-copy"><div><span className="eyebrow">{t.case}</span><p>{project.narrative[locale]}</p></div><div><span className="eyebrow">{t.role}</span><ul>{project.services[locale].map((service) => <li key={service}>{service}</li>)}</ul></div></div>
    {project.media?.gallery?.length ? <section className="case-gallery" aria-label={t.gallery}>{project.media.gallery.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt[locale]} width={1600} height={1100} sizes="(max-width: 700px) 100vw, 80vw" loading="lazy"/></figure>)}</section> : null}
    {project.media?.model && <OptionalModel src={project.media.model} locale={locale}/>}
    <Link className="next-project" href={`/${locale}/work/${next.slug}`}><span className="eyebrow">{t.next}</span><b>{next.title[locale]} ↗</b></Link></main></PageShell>;
}
export function ServicesPage({ locale }: { locale: Locale }) { const t = copy[locale]; return <PageShell locale={locale}><main className="inner-page"><div className="page-intro"><span className="eyebrow">02 / {t.capabilitiesTag}</span><h1>{t.services}<span className="accent-dot">.</span></h1><p>{t.servicesNote}</p></div><div className="service-lines service-page-lines">{t.serviceList.map((service, i) => <article key={service}><span>0{i + 1}</span><b>{service}</b><p>{t.serviceDescriptions[i]}</p></article>)}</div></main></PageShell>; }
export function StudioPage({ locale }: { locale: Locale }) { const t = copy[locale]; return <PageShell locale={locale}><main className="inner-page studio-page"><span className="eyebrow">03 / {studio.location[locale]}</span><h1>{t.studio}</h1><p className="studio-lead">{t.studioText}</p><StudioArtwork locale={locale} large/><div className="studio-values"><span className="eyebrow">{t.pointOfView}</span><p>{t.studioPhilosophy}</p></div></main></PageShell>; }
export function ContactPage({ locale }: { locale: Locale }) { const t = copy[locale]; return <PageShell locale={locale}><main className="inner-page contact-page"><div className="contact-intro"><span className="eyebrow">04 / {t.contactTag} · {studio.location[locale]}</span><h1>{t.contact}</h1><p>{t.contactText}</p></div><div className="contact-layout"><ContactForm locale={locale}/><aside><span className="eyebrow">{t.locationTag}</span><p>{studio.location[locale]}</p>{studio.email ? <a href={`mailto:${studio.email}`}>{studio.email} ↗</a> : <p className="contact-note">{t.emailMissing}</p>}<span className="contact-coordinate">42°52′N<br/>74°36′E</span></aside></div></main></PageShell>; }
