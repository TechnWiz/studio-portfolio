"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, Group, NormalBlending, ShaderMaterial } from "three";

const glassVertex = `varying vec3 vNormal; varying vec3 vView; varying vec3 vPoint;
void main(){ vec4 viewPosition=modelViewMatrix*vec4(position,1.0); vNormal=normalize(normalMatrix*normal); vView=normalize(-viewPosition.xyz); vPoint=position; gl_Position=projectionMatrix*viewPosition; }`;
const glassFragment = `uniform float uTime; varying vec3 vNormal; varying vec3 vView; varying vec3 vPoint;
void main(){ vec3 n=normalize(vNormal); float rim=pow(1.0-max(dot(n,normalize(vView)),0.0),2.2); float longitude=atan(vPoint.z,vPoint.x); float latitude=asin(clamp(vPoint.y,-1.0,1.0)); float warp=sin(latitude*5.0+sin(longitude*3.0+uTime*.16)*1.3+longitude*2.0); float flow=sin(longitude*7.0+latitude*5.0+warp*1.1); float ribbon=smoothstep(.28,.88,flow); float caustic=pow(max(sin(longitude*11.0-latitude*8.0+warp),0.0),12.0); vec3 deep=vec3(.055,.045,.11); vec3 lilac=vec3(.55,.39,.84); vec3 pearl=vec3(.94,.88,1.0); vec3 color=mix(deep,lilac,.28+.44*(.5+.5*sin(warp*2.2))); color=mix(color,pearl,ribbon*.48+caustic*.7+pow(rim,5.0)*.9); float alpha=.18+rim*.4+ribbon*.26+caustic*.2; gl_FragColor=vec4(color,alpha); }`;

function LiquidOrb({ reduced }: { reduced: boolean }) {
  const material = useRef<ShaderMaterial>(null);
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!reduced && material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (!reduced && group.current) group.current.rotation.y += Math.min(delta, .04) * .045;
  });
  return <group ref={group}>
    <mesh scale={.82}><sphereGeometry args={[1, 56, 48]}/><meshPhysicalMaterial color="#635486" roughness={.3} metalness={.25} clearcoat={1} clearcoatRoughness={.12} emissive="#241a3c" emissiveIntensity={.32}/></mesh>
    <mesh><sphereGeometry args={[1.08, 64, 56]}/><shaderMaterial ref={material} vertexShader={glassVertex} fragmentShader={glassFragment} uniforms={{ uTime: { value: 0 } }} transparent depthWrite={false} side={DoubleSide} blending={NormalBlending}/></mesh>
    <mesh rotation={[.52, .2, -.35]}><torusGeometry args={[1.52, .009, 8, 160]}/><meshStandardMaterial color="#d5c7ff" emissive="#9a7be7" emissiveIntensity={.8} metalness={.82} roughness={.18}/></mesh>
    <mesh rotation={[-.75, .4, .6]}><torusGeometry args={[1.68, .005, 6, 160]}/><meshStandardMaterial color="#8589ca" emissive="#4a4b9a" emissiveIntensity={.5} metalness={.8} roughness={.25}/></mesh>
    <mesh position={[-1.48,.78,.55]} scale={.055}><sphereGeometry args={[1,20,16]}/><meshBasicMaterial color="#f1eaff"/></mesh>
    <mesh position={[1.2,-.94,-.35]} scale={.035}><sphereGeometry args={[1,16,12]}/><meshBasicMaterial color="#bca7f4"/></mesh>
  </group>;
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

/** Lazy-mounted second scene: animated procedural liquid-glass shader with low-cost lighting. */
export default function StudioCanvas({ reduced = false, onFailure }: { reduced?: boolean; onFailure: () => void }) {
  return <Canvas className="studio-canvas" camera={{ position: [0, 0, 4.9], fov: 38 }} dpr={[1, 1.2]} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} fallback={<span className="studio-fallback-orb"/>}>
    <ContextGuard onFailure={onFailure}/><ambientLight intensity={1.4}/><directionalLight position={[-2, 2.4, 3]} color="#f1eaff" intensity={3.4}/><pointLight position={[2,-1.5,2]} color="#8a73d2" intensity={9}/><LiquidOrb reduced={reduced}/>
  </Canvas>;
}
