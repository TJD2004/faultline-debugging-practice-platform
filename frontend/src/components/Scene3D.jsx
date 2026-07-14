import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus } from "@react-three/drei";

function GlowIcosahedron({ position, scale, color }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.22;
  });
  return (
    <Icosahedron ref={ref} args={[1, 1]} position={position} scale={scale}>
      <MeshDistortMaterial color={color} distort={0.35} speed={1.6} roughness={0.15} metalness={0.5} wireframe />
    </Icosahedron>
  );
}

function GlowTorus({ position, scale, color }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.z += delta * 0.16;
  });
  return (
    <Torus ref={ref} args={[0.6, 0.18, 32, 100]} position={position} scale={scale}>
      <MeshDistortMaterial color={color} distort={0.5} speed={2} roughness={0.2} metalness={0.4} />
    </Torus>
  );
}

/**
 * Decorative, non-interactive 3D layer. Sits behind UI content —
 * pointerEvents: none so clicks pass through to the real page underneath.
 */
export default function Scene3D({ className = "" }) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#7C6FFF" />
        <pointLight position={[-5, -3, -4]} intensity={1} color="#4FD1E8" />

        <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.3}>
          <GlowIcosahedron position={[2.6, 1, -2]} scale={1} color="#7C6FFF" />
        </Float>
        <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.6}>
          <GlowTorus position={[-2.8, -0.9, -1.6]} scale={1} color="#4FD1E8" />
        </Float>
        <Float speed={2.2} rotationIntensity={0.9} floatIntensity={1.2}>
          <GlowIcosahedron position={[-2, 1.6, -2.4]} scale={0.5} color="#34D399" />
        </Float>
      </Canvas>
    </div>
  );
}
