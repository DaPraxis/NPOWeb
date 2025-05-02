'use client';
import { useWindowSize } from 'react-use' // or your preferred window hook

import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const STRIPE_COLORS = [
  new THREE.Color('rgb(242, 5, 48)'),
  new THREE.Color('rgb(3, 103, 166)'),
  new THREE.Color('rgb(3, 140, 101)'),
  new THREE.Color('rgb(242, 159, 5)'),
];

const Letter = ({ char, index, font, tumbleAmount, xOffset, onCharWidth, lineLength }) => {
  const mesh = useRef();
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const colorfulSide = useRef(new THREE.MeshStandardMaterial({ vertexColors: true, transparent: true, opacity: 0 }));
  const blackFront = useRef(new THREE.MeshStandardMaterial({ color: 'black', roughness: 0.5, metalness: 0.3 }));

  const elapsedRef = useRef(0);
  const activePhase = useRef('waiting');
  const storedTumbleRotation = useRef(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    if (!mesh.current) return;

    mesh.current.geometry.computeBoundingBox();
    const box = mesh.current.geometry.boundingBox;
    const width = box.max.x - box.min.x;
    onCharWidth(index, width);

    const geometry = mesh.current.geometry;
    const position = geometry.attributes.position;
    const colors = [];
    const stripeRepeat = 20;

    for (let i = 0; i < position.count; i++) {
      const stripeColor = STRIPE_COLORS[Math.floor((i / position.count) * stripeRepeat) % STRIPE_COLORS.length];
      colors.push(stripeColor.r, stripeColor.g, stripeColor.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    elapsedRef.current += delta;

    const center = (lineLength - 1) / 2;
    const offset = Math.abs(index - center);
    const delay = offset * 0.1;
    const cycleLength = 1.7;
    const localTime = (elapsedRef.current - delay + cycleLength) % cycleLength;

    const waitTime = 0.4;
    const tumbleInTime = 0.1;
    const holdTime = 0.7;
    const tumbleOutTime = 0.1;
    const tumbleSpeed = 1.2;

    if (localTime < waitTime) {
      activePhase.current = 'waiting';
      targetRotation.current.set(0, 0, 0);
    } else if (localTime < waitTime + tumbleInTime) {
      if (activePhase.current !== 'in') {
        const rx = Math.random() * tumbleAmount - tumbleAmount / 2;
        const ry = Math.random() * tumbleAmount - tumbleAmount / 2;
        const rz = Math.random() * tumbleAmount - tumbleAmount / 2;
        storedTumbleRotation.current.set(rx, ry, rz);
        activePhase.current = 'in';
      }
      targetRotation.current.copy(storedTumbleRotation.current);
    } else if (localTime < waitTime + tumbleInTime + holdTime) {
      activePhase.current = 'hold';
      targetRotation.current.copy(storedTumbleRotation.current);
    } else {
      if (activePhase.current !== 'out') {
        targetRotation.current.set(0, 0, 0);
        activePhase.current = 'out';
      }
    }

    const r = mesh.current.rotation;
    r.x += (targetRotation.current.x - r.x) * tumbleSpeed;
    r.y += (targetRotation.current.y - r.y) * tumbleSpeed;
    r.z += (targetRotation.current.z - r.z) * tumbleSpeed;

    const distance = new THREE.Vector3(r.x, r.y, r.z).length();
    const min = 0.02, max = 0.08;
    const targetOpacity = distance >= max ? 1 : distance <= min ? 0 : (distance - min) / (max - min);
    colorfulSide.current.opacity += (targetOpacity - colorfulSide.current.opacity) * 0.08;
  });

  return (
    <group position={[xOffset, 0, 0]}>
      <Text3D
        ref={mesh}
        font={font}
        size={1}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.03}
        bevelSegments={4}
        material={[blackFront.current, colorfulSide.current]}
      >
        {char}
      </Text3D>
    </group>
  );
};

export default function Tumbling3DText({
  spacing = 0.1,
  tumbleAmount = Math.PI / 4,
}) {
  const lines = ['FutureEra Research'];
  const [widthMap, setWidthMap] = useState({});

  const handleCharWidth = (key, width) => {
    setWidthMap(prev => (prev[key] === width ? prev : { ...prev, [key]: width }));
  };

  const { width: screenWidth } = useWindowSize()
  const scaleFactor = screenWidth < 768 ? 0.7 : 1 // 50% scale on mobile
  const xShift = scaleFactor < 1 ? 1.5 : 0 // tweak this number if needed

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={0.7} />
      <OrbitControls enableZoom={false} enablePan={false} />

      {lines.map((line, lineIdx) => {
        let cumulativeX = 0;
        const y = -lineIdx * 2.5;
        const charWidths = line.split('').map((_, i) => widthMap[`${lineIdx}-${i}`] || 0.6);
        const totalLineWidth = charWidths.reduce((acc, w) => acc + w, 0) + spacing * (line.length - 1);
        const centerOffset = -totalLineWidth / 2;

        return (
          <group key={lineIdx} position={[centerOffset + xShift / scaleFactor, y, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            {line.split('').map((char, i) => {
              const key = `${lineIdx}-${i}`;
              const charWidth = charWidths[i];
              const xOffset = cumulativeX;
              cumulativeX += charWidth + spacing;

              const isStatic = ['<', '>', '.'].includes(char);

              if (char!=' '){
                return (
                  <group key={key} position={[xOffset, 0, 0]}>
                    {isStatic ? (
                      <Text3D
                        font="/fonts/milligram_medium.typeface.json"
                        size={1}
                        height={0.2}
                        curveSegments={12}
                        bevelEnabled
                        bevelSize={0.01}
                        bevelThickness={0.01}
                        bevelSegments={1}
                        material={new THREE.MeshStandardMaterial({ color: 'black', roughness: 0.5, metalness: 0.3 })}
                        ref={ref => {
                          if (ref && ref.geometry) {
                            ref.geometry.computeBoundingBox();
                            const box = ref.geometry.boundingBox;
                            const width = box.max.x - box.min.x;
                            handleCharWidth(key, width);
                          }
                        }}
                      >
                        {char}
                      </Text3D>
                    ) : (
                      <Letter
                        char={char}
                        index={i}
                        font="/fonts/milligram_medium.typeface.json"
                        xOffset={0}
                        tumbleAmount={tumbleAmount}
                        lineLength={line.length}
                        onCharWidth={(i, w) => handleCharWidth(key, w)}
                      />
                    )}
                  </group>
                )
              };
            })}
          </group>
        );
      })}
    </Canvas>
  );
}
