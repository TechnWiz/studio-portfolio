"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale, Project } from "@/lib/content";
import { copy, projects, studio } from "@/lib/content";

/** Shared navigation and interactive project filters for localized pages. */
export function Header({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const pathname = usePathname();
  const routeTail = pathname.replace(/^\/(en|ru)/, "");
  const [open, setOpen] = useState(false);
  return <header className="site-header"><Link className="wordmark" href={`/${locale}`} aria-label={`${studio.name} home`}><span className="mark">◉</span>{studio.name}</Link>
    <button className="menu-toggle" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "CLOSE −" : "MENU +"}</button>
    <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">{t.nav.map((label, i) => <Link key={label} onClick={() => setOpen(false)} href={`/${locale}${["/work", "/services", "/studio", "/contact"][i]}`}>{label}</Link>)}<span className="language"><Link aria-current={locale === "en" ? "page" : undefined} href={`/en${routeTail}`}>EN</Link><i>/</i><Link aria-current={locale === "ru" ? "page" : undefined} href={`/ru${routeTail}`}>RU</Link></span></nav>
  </header>;
}

function Artwork({ project }: { project: Project }) {
  // Keep placeholder art local and cheap; swap the CSS artwork for real local media per project.
  if (project.media?.video) return <div className={`artwork ${project.colors}`}><video muted playsInline loop autoPlay poster={project.media.poster} aria-label={project.title.en} preload="none"><source src={project.media.video} type="video/webm" /></video></div>;
  return <div className={`artwork ${project.colors}`} aria-hidden="true"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="orb-core"/><span className="art-grain"/><span className="art-index">FIELD STUDY / 0{projects.indexOf(project) + 1}</span></div>;
}

export function ProjectGrid({ locale, all = false }: { locale: Locale; all?: boolean }) {
  const [filter, setFilter] = useState("all");
  const shown = (all ? projects : projects.filter((p) => p.featured)).filter((p) => filter === "all" || p.category.toLowerCase() === filter);
  return <>
    {all && <div className="filters" aria-label="Filter projects">{["all", "motion", "digital", "identity"].map((key, i) => <button className={filter === key ? "filter active" : "filter"} key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{copy[locale].filters[i]}</button>)}</div>}
    <div className="project-grid">{shown.map((p, i) => <Link className={`project-card card-${i % 3}`} href={`/${locale}/work/${p.slug}`} key={p.slug}><Artwork project={p}/><div className="project-caption"><div><span className="meta-label">{p.category} / 2026</span><h3>{p.title[locale]}</h3></div><span className="arrow" aria-hidden="true">↗</span></div><p className="project-summary">{p.summary[locale]}</p></Link>)}</div>
  </>;
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [sent, setSent] = useState(false);
  const isRu = locale === "ru";
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (studio.email) {
      const subject = encodeURIComponent(`Project inquiry — ${data.get("name")}`);
      const body = encodeURIComponent(`From: ${data.get("name")} (${data.get("email")})\nType: ${data.get("type")}\n\n${data.get("message")}`);
      window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
      setSent(true);
    } else setSent(true);
  }
  return <form className="contact-form" onSubmit={handleSubmit}><label>{isRu ? "Ваше имя" : "Your name"}<input required name="name" autoComplete="name" /></label><label>{isRu ? "Электронная почта" : "Email address"}<input required type="email" name="email" autoComplete="email" /></label><label>{isRu ? "Тип проекта" : "Project type"}<select name="type"><option>Digital</option><option>Identity</option><option>3D / Motion</option><option>Other</option></select></label><label>{isRu ? "Расскажите об идее" : "A little about the project"}<textarea required name="message" rows={4}/></label><button className="button button-light" type="submit">{isRu ? "Отправить запрос ↗" : "Send inquiry ↗"}</button>{sent && <p role="status" className="form-note">{studio.email ? (isRu ? "Почтовый клиент откроет подготовленный запрос." : "Your email app will open with the inquiry ready.") : (isRu ? "Форма готова. Добавьте рабочий адрес в lib/content.ts, чтобы включить отправку через почтовый клиент." : "Form is ready. Add a working inbox in lib/content.ts to enable the email handoff.")}</p>}</form>;
}



