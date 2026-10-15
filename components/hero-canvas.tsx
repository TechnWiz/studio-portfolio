"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, Color, Group, MeshPhysicalMaterial, RepeatWrapping, SRGBColorSpace, SphereGeometry } from "three";
import type { ThreeEvent } from "@react-three/fiber";

const motionTuning = { spin: 0.035, pointer: 0.11, dpr: 1.25 };

/** Small deterministic canvas texture: crater rims give the moon detail without a downloaded texture. */
function createLunarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 512;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return new CanvasTexture(canvas);
  let seed = 27;
  const random = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const pixels = context.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
    const u = x / canvas.width * Math.PI * 2, v = y / canvas.height * Math.PI * 2;
    const wave = Math.sin(u * 3 + Math.sin(v * 2) * .4) * 4 + Math.sin(v * 5 + u * 2) * 3 + (random() - .5) * 4;
    const index = (y * canvas.width + x) * 4;
    pixels.data[index] = 104 + wave; pixels.data[index + 1] = 91 + wave; pixels.data[index + 2] = 133 + wave; pixels.data[index + 3] = 255;
  }
  context.putImageData(pixels, 0, 0);
  // Draw seamless copies at either horizontal edge to keep the UV seam quiet.
  for (let i = 0; i < 125; i++) {
    const x = random() * canvas.width, y = random() * canvas.height, radius = 1.4 + random() * 12, oval = .64 + random() * .6;
    for (const offset of [-canvas.width, 0, canvas.width]) {
      context.save(); context.translate(x + offset, y); context.scale(1, oval);
      const gradient = context.createRadialGradient(-radius * .22, -radius * .3, radius * .12, 0, 0, radius);
      gradient.addColorStop(0, "rgba(27,23,37,.28)"); gradient.addColorStop(.68, "rgba(42,35,55,.16)"); gradient.addColorStop(.82, "rgba(224,207,255,.22)"); gradient.addColorStop(1, "rgba(68,55,88,.035)");
      context.fillStyle = gradient; context.beginPath(); context.arc(0, 0, radius, 0, Math.PI * 2); context.fill(); context.restore();
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function Moon({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const material = useMemo(() => {
    const map = createLunarTexture();
    return new MeshPhysicalMaterial({ map, bumpMap: map, bumpScale: .085, color: new Color("#d4c9ee"), roughness: .76, metalness: .08, clearcoat: .18, clearcoatRoughness: .44 });
  }, []);
  const { size } = useThree();
  const mobile = size.width < 560;
  const geometry = useMemo(() => new SphereGeometry(1, mobile ? 72 : 96, mobile ? 64 : 80), [mobile]);
  useEffect(() => () => { geometry.dispose(); material.map?.dispose(); material.dispose(); }, [geometry, material]);
  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    const step = Math.min(delta, .04);
    const ease = 1 - Math.exp(-motionTuning.pointer * step * 60);
    group.current.rotation.y += step * motionTuning.spin;
    group.current.rotation.x += (pointer.current.y * .09 - group.current.rotation.x) * ease;
    group.current.rotation.z += (pointer.current.x * .09 - group.current.rotation.z) * ease;
  });
  function trackPointer(event: ThreeEvent<PointerEvent>) { if (event.pointerType !== "touch") pointer.current = { x: event.pointer.x, y: event.pointer.y }; }
  return <group ref={group} onPointerMove={trackPointer} scale={mobile ? 1.04 : 1.25}>
    <mesh geometry={geometry} material={material}/>
    <mesh scale={1.08}><sphereGeometry args={[1, 40, 32]}/><meshBasicMaterial color="#9078c9" transparent opacity={.025} side={1}/></mesh>
    <OrbitRings reduced={reduced} mobile={mobile}/>
  </group>;
}

function OrbitRings({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const first = useRef<Group>(null), second = useRef<Group>(null);
  useFrame((_, delta) => {
    if (reduced) return;
    if (first.current) first.current.rotation.z += delta * .012;
    if (second.current) second.current.rotation.z -= delta * .008;
  });
  return <>
    <group ref={first} rotation={[.48, .2, -.28]} scale={mobile ? .78 : 1}><mesh><torusGeometry args={[1.48, .006, 6, 180]}/><meshBasicMaterial color="#cfbdff" transparent opacity={.58}/></mesh></group>
    <group ref={second} rotation={[-.82, .3, .72]} scale={mobile ? .78 : 1}><mesh><torusGeometry args={[1.72, .004, 5, 180]}/><meshBasicMaterial color="#9ca2e2" transparent opacity={.34}/></mesh></group>
  </>;
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const handleLoss = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", handleLoss);
    return () => canvas.removeEventListener("webglcontextlost", handleLoss);
  }, [gl, onFailure]);
  return null;
}

/** A gentle, custom lunar surface with separate orbit speeds; all controls live here. */
export default function HeroCanvas({ reduced = false, mobile = false, onFailure }: { reduced?: boolean; mobile?: boolean; onFailure: () => void }) {
  return <Canvas className="hero-canvas" camera={{ position: [0, 0, mobile ? 4.35 : 4.8], fov: mobile ? 36 : 38 }} dpr={[1, motionTuning.dpr]} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
    <ContextGuard onFailure={onFailure}/><ambientLight intensity={1.15}/><directionalLight position={[-2.5, 2.8, 4]} color="#fff4e8" intensity={3.2}/><pointLight position={[2.5, -1.5, 2]} color="#a08be1" intensity={3}/><Moon reduced={reduced}/>
  </Canvas>;
}
