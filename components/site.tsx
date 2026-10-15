"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, Project } from "@/lib/content";
import { copy, projects, studio } from "@/lib/content";

const ModelViewer = dynamic(() => import("@/components/model-viewer"), { ssr: false, loading: () => <div className="model-viewer model-loading" aria-hidden="true"/> });

/** Shared nav, project media, and form interactions for all localized pages. */
export function Header({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const routeTail = pathname.replace(/^\/(en|ru)/, "");
  const [open, setOpen] = useState(false);
  return <motion.header className="site-header" initial={reduced ? false : { y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
    <Link className="wordmark" href={`/${locale}`} aria-label={`${studio.name} home`}><span className="mark">◉</span>{studio.name}</Link>
    <button className="menu-toggle" aria-expanded={open} aria-label={open ? t.menuClose : t.menuOpen} onClick={() => setOpen(!open)}>{open ? `${t.menuClose} −` : `${t.menuOpen} +`}</button>
    <nav className={open ? "nav-links is-open" : "nav-links"} aria-label={t.mainNavigation}>
      {t.nav.map((label, i) => <Link key={label} onClick={() => setOpen(false)} href={`/${locale}${["/work", "/services", "/studio", "/contact"][i]}`}>{label}</Link>)}
      <span className="language" aria-label={t.language}><Link aria-current={locale === "en" ? "page" : undefined} href={`/en${routeTail}`}>EN</Link><i>/</i><Link aria-current={locale === "ru" ? "page" : undefined} href={`/ru${routeTail}`}>RU</Link></span>
    </nav>
  </motion.header>;
}

/** A compact reveal system; transform and opacity keep scrolling smooth. */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.68, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

/** Fade and settle the current route while leaving Next navigation in control. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const reduced = useReducedMotion();
  return <AnimatePresence mode="wait" initial={false}><motion.div key={path} initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduced ? 0 : 0.28, ease: "easeOut" }}>{children}</motion.div></AnimatePresence>;
}

function ProjectArtwork({ project }: { project: Project }) {
  const [play, setPlay] = useState(false);
  const title = project.title;
  const locale: Locale = usePathname().startsWith("/ru") ? "ru" : "en";
  return <div className={`artwork ${project.colors}`} onMouseEnter={() => project.media?.video && setPlay(true)} onMouseLeave={() => setPlay(false)} onFocus={() => project.media?.video && setPlay(true)} onBlur={() => setPlay(false)}>
    {project.media?.video && play && <video className={`project-video${project.media.poster ? "" : " video-no-poster"}`} autoPlay muted playsInline loop preload="none" poster={project.media.poster} aria-label={title[locale]} onLoadedData={(event) => event.currentTarget.dataset.ready = "true"} onError={(event) => event.currentTarget.classList.add("media-error")}><source media="(max-width: 700px)" src={project.media.mobileVideo}/><source src={project.media.video} type={project.media.video.toLowerCase().endsWith(".mp4") ? "video/mp4" : "video/webm"}/></video>}
    <span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="orb-core"/><span className="art-grain"/><span className="art-index">{copy[locale].artworkLabel} / {String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
  </div>;
}

export function HeroHeadline({ first, second }: { first: string; second: string }) {
  const reduced = useReducedMotion();
  // A short stagger reveals both headline lines without delaying the page.
  return <motion.h1 initial={reduced ? false : "hidden"} animate={reduced ? undefined : "visible"} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.14 } } }}><motion.span className="hero-line" variants={{ hidden: { y: "105%", opacity: 0 }, visible: { y: 0, opacity: 1 } }}>{first}</motion.span><br/><motion.em className="hero-line hero-line-accent" variants={{ hidden: { y: "105%", opacity: 0 }, visible: { y: 0, opacity: 1 } }}>{second}</motion.em></motion.h1>;
}
export function HeroSupporting({ text, action, href }: { text: string; action: string; href: string }) {
  const reduced = useReducedMotion();
  return <motion.div className="hero-bottom" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.58, duration: reduced ? 0 : 0.58 }}><p>{text}</p><Link className="text-link" href={href}>{action}<span>↘</span></Link></motion.div>;
}

export function ProjectGrid({ locale, all = false }: { locale: Locale; all?: boolean }) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const shown = (all ? projects : projects.filter((p) => p.featured)).filter((p) => filter === "all" || p.category.toLowerCase() === filter);
  const t = copy[locale];
  return <>
    {all && <div className="filters" aria-label={t.filterProjects}>{["all", "motion", "digital", "identity"].map((key, i) => <button className={filter === key ? "filter active" : "filter"} key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{t.filters[i]}</button>)}</div>}
    <div className="project-grid">{shown.map((p, i) => <motion.div className={`project-card card-${i % 3}`} key={p.slug} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : (i % 2) * 0.08 }}><Link href={`/${locale}/work/${p.slug}`}><ProjectArtwork project={p}/><div className="project-caption"><div><span className="meta-label">{t.category[p.category]} / {t.projectConcept}</span><h3>{p.title[locale]}</h3></div><span className="arrow" aria-hidden="true">↗</span></div><p className="project-summary">{p.summary[locale]}</p></Link></motion.div>)}</div>
  </>;
}

/** Mount the WebGL viewer only after a visitor explicitly asks to inspect a supplied GLB. */
export function OptionalModel({ src, locale }: { src: string; locale: Locale }) {
  const [open, setOpen] = useState(false); const [failed, setFailed] = useState(false); const t = copy[locale];
  return <section className="model-section"><button type="button" className="text-link model-trigger" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? t.hideModel : t.exploreModel}<span>↗</span></button>{open && (failed ? <p role="status">{t.modelUnavailable}</p> : <ModelViewer src={src} onFailure={() => setFailed(true)}/>)}</section>;
}

/** Submits validated inquiries to the optional same-origin API route. */
export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "failure" | "unavailable">("idle");
  const [error, setError] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const form = event.currentTarget;
    if (!form.reportValidity()) { setError(t.formInvalid); return; }
    const data = new FormData(form); setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(data)), headers: { "Content-Type": "application/json" } });
      if (response.status === 503) setStatus("unavailable");
      else if (response.ok) { setStatus("success"); form.reset(); }
      else setStatus("failure");
    } catch { setStatus("failure"); }
  }
  const notice = status === "success" ? t.formSuccess : status === "failure" ? t.formFailure : status === "unavailable" ? t.formUnavailable : "";
  return <form className="contact-form" onSubmit={handleSubmit} noValidate><label>{t.formName}<input required name="name" autoComplete="name" maxLength={120}/></label><label>{t.formEmail}<input required type="email" name="email" autoComplete="email" maxLength={254}/></label><label>{t.formType}<select name="type"><option value="digital">{t.projectTypes[0]}</option><option value="identity">{t.projectTypes[1]}</option><option value="motion">{t.projectTypes[2]}</option><option value="other">{t.projectTypes[3]}</option></select></label><label>{t.formDescription}<textarea required name="message" rows={4} maxLength={5000}/></label><button className="button button-light" type="submit" disabled={status === "sending"}>{status === "sending" ? t.formSending : t.formSubmit}<span>↗</span></button>{(notice || error) && <p role={error || status === "failure" ? "alert" : "status"} className="form-note">{error || notice}{status === "unavailable" && studio.email && <> <a href={`mailto:${studio.email}`}>{studio.email}</a></>}</p>}</form>;
}

