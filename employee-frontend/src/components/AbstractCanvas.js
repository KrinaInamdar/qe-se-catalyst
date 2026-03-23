import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';


const AnimatedShape = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 4]} />
        <MeshDistortMaterial 
          color="#3b82f6" 
          attach="material" 
          distort={0.4} 
          speed={1.5} 
          roughness={0} 
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

export default function AbstractCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <AnimatedShape />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#000000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
