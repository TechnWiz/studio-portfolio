"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/content";
import { copy } from "@/lib/content";

const StudioCanvas = dynamic(() => import("@/components/studio-canvas"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: React.ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Lazy-load the separate glass study as it nears view; CSS artwork remains underneath as fallback. */
export function StudioArtwork({ locale, large = false }: { locale: Locale; large?: boolean }) {
  const supported = useSyncExternalStore(subscribeToWebGL, getWebGLSnapshot, () => false);
  const [failed, setFailed] = useState(false);
  const handleFailure = useCallback(() => setFailed(true), []);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: .12 });
  return <div ref={ref} className={`studio-art studio-art-3d${large ? " large" : ""}`} aria-hidden="true">
    <span className="studio-disc"/><span className="studio-disc second"/>
    {supported && visible && !failed && <SceneBoundary onFailure={handleFailure}><StudioCanvas reduced={Boolean(reduced)} onFailure={handleFailure}/></SceneBoundary>}
    <small>{copy[locale].studioLabel}</small>
  </div>;
}

function getWebGLSnapshot() { const canvas = document.createElement("canvas"); return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")); }
function subscribeToWebGL() { return () => {}; }
