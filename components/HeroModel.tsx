'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json';

interface DragState {
  active: boolean;
  lastX: number;
  lastY: number;
}

interface BracesModelProps {
  dragRef: React.MutableRefObject<DragState>;
  velocityRef: React.MutableRefObject<{ x: number; y: number }>;
}

function BracesModel({ dragRef, velocityRef }: BracesModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (dragRef.current.active) {
      // While dragging: apply velocity directly
      rotationRef.current.y += velocityRef.current.x;
      rotationRef.current.x += velocityRef.current.y;
    } else {
      // Idle: gentle auto-sway + momentum decay
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;
      rotationRef.current.y += velocityRef.current.x;
      rotationRef.current.x += velocityRef.current.y;

      // Soft drift back toward sway center
      const swayY = Math.sin(t * 0.22) * 0.18;
      const swayX = Math.cos(t * 0.16) * 0.08;
      rotationRef.current.y += (swayY - rotationRef.current.y) * 0.008;
      rotationRef.current.x += (swayX - rotationRef.current.x) * 0.008;
    }

    groupRef.current.rotation.y = rotationRef.current.y;
    groupRef.current.rotation.x = rotationRef.current.x;
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.07;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font={helvetikerBold as any}
          size={1.6}
          height={0.42}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.07}
          bevelSize={0.048}
          bevelSegments={10}
        >
          {'{x}'}
          <meshStandardMaterial
            color="#3DF2E0"
            emissive="#3DF2E0"
            emissiveIntensity={0.12}
            metalness={0.2}
            roughness={0.3}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export default function HeroModel() {
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<DragState>({ active: false, lastX: 0, lastY: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      velocityRef.current.x = dx * 0.012;
      velocityRef.current.y = dy * 0.012;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    };

    const onPointerUp = () => {
      dragRef.current.active = false;
      setDragging(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current.active = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    velocityRef.current = { x: 0, y: 0 };
    setDragging(true);
  };

  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        width: '100%',
        height: 'clamp(220px, 36vw, 420px)',
        position: 'relative',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 5]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={1.5} color="#3DF2E0" />
        <pointLight position={[3, -2, 2]} intensity={1.0} color="#ffffff" />
        <Suspense fallback={null}>
          <BracesModel dragRef={dragRef} velocityRef={velocityRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
