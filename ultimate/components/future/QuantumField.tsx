'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { WaterPass } from 'three/examples/jsm/postprocessing/WaterPass.js';

interface QuantumParticle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  size: number;
  life: number;
  energy: number;
  connections: number[];
}

export default function QuantumField() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Post Processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    const waterPass = new WaterPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
    composer.addPass(waterPass);

    // Camera
    camera.position.set(0, 0, 40);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;

    // Quantum Lighting
    scene.add(new THREE.AmbientLight(0x404040, 1));
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00E5FF, 2, 50);
    pointLight1.position.set(10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFF6B35, 2, 50);
    pointLight2.position.set(-10, -5, -10);
    scene.add(pointLight2);

    // Quantum Particles
    const PARTICLE_COUNT = 500;
    const particles: QuantumParticle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
        size: Math.random() * 3 + 1,
        life: Math.random() * 100,
        energy: Math.random(),
        connections: [],
      });
    }

    // Particle Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = particles[i].position.x;
      positions[i * 3 + 1] = particles[i].position.y;
      positions[i * 3 + 2] = particles[i].position.z;
      
      colors[i * 3] = particles[i].color.r;
      colors[i * 3 + 1] = particles[i].color.g;
      colors[i * 3 + 2] = particles[i].color.b;
      
      sizes[i] = particles[i].size;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Texture for circular particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Quantum Orbitals
    const orbitals: THREE.Line[] = [];
    const orbitalMaterial = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.2,
    });

    for (let i = 0; i < 10; i++) {
      const orbitalGeom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const radius = 5 + Math.random() * 20;
      const segments = 100;

      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.3,
          Math.sin(angle * 2) * 3
        ));
      }

      orbitalGeom.setFromPoints(points);
      const orbital = new THREE.Line(orbitalGeom, orbitalMaterial);
      orbital.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(orbital);
      orbitals.push(orbital);
    }

    // Floating Geometric Shapes
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(2, 1),
      new THREE.TorusKnotGeometry(1.5, 0.5, 64, 8),
      new THREE.OctahedronGeometry(1.5),
      new THREE.DodecahedronGeometry(1.5),
    ];

    const shapes: THREE.Mesh[] = [];
    const shapeMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x00E5FF,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xFF6B35,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xA855F7,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x00FF9D,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];

    for (let i = 0; i < 12; i++) {
      const shape = new THREE.Mesh(
        shapeGeometries[i % shapeGeometries.length],
        shapeMaterials[i % shapeMaterials.length]
      );
      shape.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shape.scale.setScalar(0.5 + Math.random() * 1);
      scene.add(shape);
      shapes.push(shape);
    }

    // Energy Cores
    const coreGeoms = [new THREE.SphereGeometry(1, 32, 32), new THREE.TorusGeometry(1, 0.3, 16, 32)];
    const cores: THREE.Mesh[] = [];

    for (let i = 0; i < 3; i++) {
      const core = new THREE.Mesh(
        coreGeoms[i % coreGeoms.length],
        new THREE.MeshStandardMaterial({
          color: i === 0 ? 0x00E5FF : i === 1 ? 0xFF6B35 : 0xA855F7,
          emissive: i === 0 ? 0x00E5FF : i === 1 ? 0xFF6B35 : 0xA855F7,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.6,
          metalness: 0.8,
          roughness: 0.2,
        })
      );
      core.position.set(
        (i - 1) * 8,
        Math.sin(i * Math.PI) * 5,
        Math.cos(i * Math.PI) * 2
      );
      scene.add(core);
      cores.push(core);
    }

    // Animation Loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame++;

      // Update particles
      const posArray = geometry.attributes.position.array;
      const colArray = geometry.attributes.color.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        
        // Quantum wave motion
        const wave1 = Math.sin(frame * 0.05 + p.position.y * 0.1) * 0.02;
        const wave2 = Math.cos(frame * 0.03 + p.position.x * 0.1) * 0.03;
        
        p.velocity.x += Math.sin(p.position.y) * 0.001;
        p.velocity.y += Math.cos(p.position.z) * 0.001;
        p.velocity.z += Math.sin(p.position.x) * 0.001;
        
        p.position.add(p.velocity);
        p.position.x += wave1;
        p.position.y += wave2;

        // Boundary
        if (Math.abs(p.position.x) > 30) p.velocity.x *= -1;
        if (Math.abs(p.position.y) > 30) p.velocity.y *= -1;
        if (Math.abs(p.position.z) > 30) p.velocity.z *= -1;

        // Recycle
        p.life--;
        if (p.life < 0) {
          p.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60
          );
          p.life = 100 + Math.random() * 100;
        }

        // Update buffers
        posArray[i * 3] = p.position.x;
        posArray[i * 3 + 1] = p.position.y;
        posArray[i * 3 + 2] = p.position.z;

        // Color shift
        const hue = (frame * 0.001 + i / PARTICLE_COUNT) % 1;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        colArray[i * 3] = color.r;
        colArray[i * 3 + 1] = color.g;
        colArray[i * 3 + 2] = color.b;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Rotate orbitals
      for (let i = 0; i < orbitals.length; i++) {
        orbitals[i].rotation.x += 0.001 * (i + 1);
        orbitals[i].rotation.y += 0.002 * (i + 1);
      }

      // Rotate shapes
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].rotation.x += 0.01;
        shapes[i].rotation.y += 0.015;
        shapes[i].rotation.z += 0.005;
        shapes[i].position.y += Math.sin(frame * 0.01 + i) * 0.01;
      }

      // Pulse cores
      for (let i = 0; i < cores.length; i++) {
        cores[i].rotation.x += 0.02;
        cores[i].rotation.y += 0.03;
        cores[i].position.y += Math.sin(frame * 0.02 + i) * 0.03;
        cores[i].scale.setScalar(1 + Math.sin(frame * 0.05 + i) * 0.2);
      }

      controls.update();
      composer.render();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(material => material.dispose());
          }
        }
      });
      
      composer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
