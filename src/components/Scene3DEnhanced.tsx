import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// Cursor-reactive floating crystal
const FloatingCrystal = ({ 
  position, 
  scale, 
  speed,
  mousePosition 
}: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number;
  mousePosition: { x: number; y: number };
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15;
      
      // Cursor reactivity
      const targetX = initialPos.current[0] + mousePosition.x * 0.5;
      const targetY = initialPos.current[1] + mousePosition.y * 0.3;
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#8B0000" 
          wireframe 
          transparent 
          opacity={0.4}
          emissive="#4a0000"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

// Glass sphere with refraction
const GlassSphere = ({ 
  position, 
  scale,
  mousePosition 
}: { 
  position: [number, number, number]; 
  scale: number;
  mousePosition: { x: number; y: number };
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      
      // Subtle cursor reactivity
      const targetX = initialPos.current[0] + mousePosition.x * 0.2;
      const targetY = initialPos.current[1] + mousePosition.y * 0.15;
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.015;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial
        color="#660000"
        transmission={0.9}
        thickness={0.5}
        roughness={0.1}
        chromaticAberration={0.05}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.1}
      />
    </mesh>
  );
};

// Enhanced particle field with depth layers
const EnhancedParticleField = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 300;
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const sz = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Create depth layers
      const layer = Math.floor(Math.random() * 3);
      const depth = -5 - layer * 5;
      
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = depth + Math.random() * 3;
      
      sz[i] = 0.015 + Math.random() * 0.025;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015 + mousePosition.x * 0.1;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01 + mousePosition.y * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8B0000"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated grid lines
const GridLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      linesRef.current.position.z = -8 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  const lines = useMemo(() => {
    const linePositions: [number, number, number][] = [];
    for (let i = -10; i <= 10; i += 2) {
      linePositions.push([i, -10, 0]);
      linePositions.push([i, 10, 0]);
    }
    return linePositions;
  }, []);

  return (
    <group ref={linesRef} position={[0, 0, -10]}>
      {lines.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <planeGeometry args={[0.01, 20]} />
          <meshBasicMaterial color="#330000" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// Scroll-reactive scene wrapper
const SceneContent = ({ scrollY }: { scrollY: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * -2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // Scroll-responsive camera movement
    const targetZ = 8 + scrollY * 0.003;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#8B0000" />
      <pointLight position={[-5, -5, -5]} intensity={0.25} color="#A30000" />
      <pointLight position={[0, 3, 2]} intensity={0.15} color="#660000" />
      
      <FloatingCrystal position={[-4, 2, -3]} scale={1.5} speed={0.25} mousePosition={mousePosition} />
      <FloatingCrystal position={[4, -1, -2]} scale={1} speed={0.4} mousePosition={mousePosition} />
      <FloatingCrystal position={[2, 3, -4]} scale={0.8} speed={0.35} mousePosition={mousePosition} />
      <FloatingCrystal position={[-3, -2, -5]} scale={1.2} speed={0.3} mousePosition={mousePosition} />
      
      <GlassSphere position={[-2, 0, -4]} scale={0.6} mousePosition={mousePosition} />
      <GlassSphere position={[3, 2, -6]} scale={0.4} mousePosition={mousePosition} />
      
      <EnhancedParticleField mousePosition={mousePosition} />
      <GridLines />
    </>
  );
};

const Scene3DEnhanced = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Scene3DEnhanced;
