import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 60;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 6,
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.4,
        p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#818CF8" transparent opacity={0.35} />
    </instancedMesh>
  );
};

const FloatingRing = ({ position, rotation, scale, speed }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = rotation[0] + t * speed * 0.3;
    ref.current.rotation.z = rotation[2] + t * speed * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 64]} />
      <meshBasicMaterial color="#A5B4FC" transparent opacity={0.2} />
    </mesh>
  );
};

const HeroBackground3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <FloatingParticles />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <FloatingRing position={[-3, 1.5, -2]} rotation={[0.5, 0, 0.3]} scale={1.2} speed={0.5} />
        </Float>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
          <FloatingRing position={[3.5, -1, -1.5]} rotation={[1, 0.5, 0]} scale={0.8} speed={0.7} />
        </Float>
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
          <FloatingRing position={[0, -2.5, -3]} rotation={[0.3, 1, 0.5]} scale={1.5} speed={0.3} />
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroBackground3D;
