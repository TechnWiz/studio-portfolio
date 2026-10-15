"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { copy } from "@/lib/content";

const InteractiveScene = dynamic(() => import("@/components/hero-canvas"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: React.ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Keep the same WebGL scene on phones; only unsupported browsers use the CSS moon fallback. */
export function HeroScene({ locale }: { locale: "en" | "ru" }) {
  const t = copy[locale];
  const [failed, setFailed] = useState(false);
  const canRender = useSyncExternalStore(subscribeToDisplay, getDisplaySnapshot, () => false);
  const mobile = useSyncExternalStore(subscribeToViewport, getViewportSnapshot, () => false);
  const reduced = useReducedMotion();
  const handleFailure = useCallback(() => setFailed(true), []);
  const activeScene = canRender && !failed;
  return <div className={`hero-orb${activeScene ? " hero-orb-3d" : ""}`} aria-hidden="true">
    {activeScene && <motion.div className="hero-canvas-wrap" initial={reduced ? false : { opacity: 0, scale: .96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : .28, ease: [.22, 1, .36, 1] }}><SceneBoundary onFailure={handleFailure}><InteractiveScene reduced={Boolean(reduced)} mobile={mobile} onFailure={handleFailure}/></SceneBoundary></motion.div>}
    <span className="hero-ring ring-a"/><span className="hero-ring ring-b"/><span className="hero-sphere"/>
    <span className="hero-coordinate">42°52′ N<br/>74°36′ E</span><span className="hero-caption">{t.heroVisualCaption[0]}<br/>{t.heroVisualCaption[1]}</span>
    <motion.span className="hero-glass-label" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.8, duration: reduced ? 0 : 0.6 }}>{t.heroVisualLabel}&nbsp; / &nbsp;{t.cityLabel}</motion.span>
  </div>;
}

function getDisplaySnapshot() {
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}
function subscribeToDisplay() { return () => {}; }
function getViewportSnapshot() { return window.matchMedia("(max-width: 700px)").matches; }
function subscribeToViewport(callback: () => void) { window.addEventListener("resize", callback); window.addEventListener("orientationchange", callback); return () => { window.removeEventListener("resize", callback); window.removeEventListener("orientationchange", callback); }; }
