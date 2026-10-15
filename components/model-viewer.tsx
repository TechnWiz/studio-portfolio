"use client";

import { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function LoadedModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} scale={1.5}/>;
}

class ModelBoundary extends Component<{ children: React.ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** The WebGL bundle is fetched only when a case page's model control is opened. */
export default function ModelViewer({ src, onFailure }: { src: string; onFailure: () => void }) {
  return <div className="model-viewer"><ModelBoundary onFailure={onFailure}><Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]} gl={{ powerPreference: "low-power" }}><ambientLight intensity={1.5}/><directionalLight position={[3, 3, 3]} intensity={2}/><Suspense fallback={null}><LoadedModel src={src}/></Suspense></Canvas></ModelBoundary></div>;
}
