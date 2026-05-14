import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Zap, Maximize2, X } from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface PlanetConfig {
  name: string;
  orbitRadius: number;
  orbitSpeed: number;
  scale: number;
  color: string;
  stlPath: string;
  description: string;
}

const planetsConfig: PlanetConfig[] = [
  {
    name: "Dangerball",
    orbitRadius: 2.2,
    orbitSpeed: 2.0,
    scale: 0.38,
    color: "#ef4444",
    stlPath: "/models/Dangerball 3d design (1).stl",
    description: "First planet in the Theo system. Orbits the star in just 31 days and uses self-defense skills to protect the system.",
  },
  {
    name: "Paradise",
    orbitRadius: 3.8,
    orbitSpeed: 1.5,
    scale: 0.44,
    color: "#22c55e",
    stlPath: "/models/Paradise 3d design (1).stl",
    description: "Most Earth-like planet in the Theo system. Dedicated to taking care of the star system and ridding it of injustice.",
  },
  {
    name: "Coldi",
    orbitRadius: 5.6,
    orbitSpeed: 1.2,
    scale: 0.41,
    color: "#3b82f6",
    stlPath: "/models/Coldi 3d design (1).stl",
    description: "Once the embodiment of Theo itself. Hidden under a thick nitrogen atmosphere is a long battle between ice and fire.",
  },
  {
    name: "Gassyball",
    orbitRadius: 8.0,
    orbitSpeed: 0.6,
    scale: 0.62,
    color: "#a855f7",
    stlPath: "/models/Gassyball 3d design (1).stl",
    description: "Largest and most massive planet — more massive than Jupiter. His great mass gives him a love for food, especially meat.",
  },
  {
    name: "Gag",
    orbitRadius: 10.2,
    orbitSpeed: 0.4,
    scale: 0.46,
    color: "#ec4899",
    stlPath: "/models/Gag 3d design (1).stl",
    description: "Spits acids in battle to distract and poison enemies. What looks like a flaw is actually her greatest survival weapon.",
  },
  {
    name: "Neptwo",
    orbitRadius: 13.0,
    orbitSpeed: 0.25,
    scale: 0.50,
    color: "#0ea5e9",
    stlPath: "/models/Neptwo 3d design (1).stl",
    description: "One of the most developed characters, despite resembling Neptune. His psychic powers are deadly — stay on his good side.",
  },
];

interface System3DProps {
  isActive?: boolean;
}

export const System3D: React.FC<System3DProps> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);

  const [isPaused, setIsPaused] = useState(false);
  const [loadedModels, setLoadedModels] = useState<Record<string, boolean>>({});
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetConfig | null>(null);

  // Mutable refs — never cause re-renders
  const isPausedRef = useRef(false);
  const animIdRef = useRef<number | null>(null);
  const cameraRot = useRef({ x: 0.35, y: 0 });
  const cameraZoom = useRef(22);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    planets: Array<{ mesh: THREE.Mesh; orbit: THREE.Group; config: PlanetConfig }>;
    star: THREE.Mesh;
    glow: THREE.Mesh;
    corona: THREE.Mesh;
  } | null>(null);

  // Keep isPausedRef in sync
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // ── Initialize Three.js scene once ──────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    // Read from the parent container — canvas.clientWidth is unreliable because
    // renderer.setSize() stamps an inline style on the canvas that overrides CSS.
    const container = canvas.parentElement!;
    const w = container.clientWidth || 900;
    const h = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.set(0, 8, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    // false = don't set canvas.style.width/height; let CSS w-full/h-full control display size
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const sunLight = new THREE.PointLight(0xfb923c, 4, 120);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x8ab4ff, 0.4);
    rimLight.position.set(-15, 10, -10);
    scene.add(rimLight);

    // ── Central Star ──────────────────────────────────────────────────────────
    const star = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xfb923c,
        emissiveIntensity: 2.5,
      })
    );
    scene.add(star);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.18 })
    );
    scene.add(glow);

    const corona = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.06 })
    );
    scene.add(corona);

    // ── Starfield ─────────────────────────────────────────────────────────────
    const sfVerts: number[] = [];
    for (let i = 0; i < 9000; i++) {
      sfVerts.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
    }
    const sfGeo = new THREE.BufferGeometry();
    sfGeo.setAttribute("position", new THREE.Float32BufferAttribute(sfVerts, 3));
    scene.add(
      new THREE.Points(
        sfGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.75 })
      )
    );

    // ── Planets ───────────────────────────────────────────────────────────────
    const planets: typeof sceneRef.current["planets"] = [];

    planetsConfig.forEach((config) => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(config.scale, 48, 48),
        new THREE.MeshStandardMaterial({
          color: config.color,
          roughness: 0.65,
          metalness: 0.1,
          emissive: config.color,
          emissiveIntensity: 0.08,
        })
      );
      mesh.position.x = config.orbitRadius;
      orbitGroup.add(mesh);

      // Orbit ring
      const ringGeo = new THREE.RingGeometry(
        config.orbitRadius - 0.018,
        config.orbitRadius + 0.018,
        128
      );
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide,
        })
      );
      ring.rotation.x = -Math.PI / 2;
      scene.add(ring);

      planets.push({ mesh, orbit: orbitGroup, config });
    });

    sceneRef.current = { scene, camera, renderer, planets, star, glow, corona };

    // ── Mouse / touch controls ────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      cameraRot.current.y += (e.clientX - lastMouse.current.x) * 0.005;
      cameraRot.current.x += (e.clientY - lastMouse.current.y) * 0.005;
      cameraRot.current.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, cameraRot.current.x));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraZoom.current = Math.max(4, Math.min(40, cameraZoom.current + e.deltaY * 0.025));
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // ── ResizeObserver — watches the container, not the canvas ───────────────
    const ro = new ResizeObserver(() => {
      if (!canvas || !sceneRef.current) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw > 0 && nh > 0) {
        sceneRef.current.renderer.setSize(nw, nh, false);
        sceneRef.current.camera.aspect = nw / nh;
        sceneRef.current.camera.updateProjectionMatrix();
      }
    });
    ro.observe(container);

    return () => {
      animIdRef.current && cancelAnimationFrame(animIdRef.current);
      animIdRef.current = null;
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      ro.disconnect();
      renderer.dispose();
      sceneRef.current = null;
    };
  }, []); // run once

  // ── Animation loop (start/stop based on isActive) ─────────────────────────
  useEffect(() => {
    if (!isActive) {
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
      return;
    }

    // Wait two frames so the browser has painted the now-visible canvas
    // before reading its client dimensions.
    let setupRaf: number;
    const startWithResize = () => {
      if (sceneRef.current && canvasRef.current?.parentElement) {
        const container = canvasRef.current.parentElement;
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        if (nw > 0 && nh > 0) {
          sceneRef.current.renderer.setSize(nw, nh, false);
          sceneRef.current.camera.aspect = nw / nh;
          sceneRef.current.camera.updateProjectionMatrix();
        }
      }
      loop();
    };
    setupRaf = requestAnimationFrame(() => requestAnimationFrame(startWithResize));

    const loop = () => {
      animIdRef.current = requestAnimationFrame(loop);
      if (!sceneRef.current) return;

      const { scene, camera, renderer, planets, star, glow, corona } = sceneRef.current;

      // Update camera orbit
      const r = cameraZoom.current;
      const { x, y } = cameraRot.current;
      camera.position.set(
        r * Math.sin(y) * Math.cos(x),
        r * Math.sin(x),
        r * Math.cos(y) * Math.cos(x)
      );
      camera.lookAt(0, 0, 0);

      if (!isPausedRef.current) {
        const t = Date.now() * 0.001;
        star.rotation.y += 0.0025;
        glow.scale.setScalar(1 + Math.sin(t * 1.2) * 0.06);
        corona.scale.setScalar(1 + Math.sin(t * 0.7 + 1) * 0.04);

        planets.forEach((p) => {
          p.orbit.rotation.y += p.config.orbitSpeed * 0.001;
          p.mesh.rotation.x += 0.007;
          p.mesh.rotation.y += 0.011;
        });
      }

      renderer.render(scene, camera);

      // Update label positions directly via DOM (avoids React re-renders at 60fps)
      const cw = renderer.domElement.clientWidth;
      const ch = renderer.domElement.clientHeight;
      planets.forEach((p, i) => {
        const el = labelEls.current[i];
        if (!el) return;
        const worldPos = new THREE.Vector3();
        p.mesh.getWorldPosition(worldPos);
        const proj = worldPos.clone().project(camera);
        const sx = (proj.x * 0.5 + 0.5) * cw;
        const sy = (-proj.y * 0.5 + 0.5) * ch;
        const behind = proj.z >= 1;
        el.style.left = `${sx}px`;
        el.style.top = `${sy}px`;
        el.style.opacity = behind ? "0" : "1";
        el.style.pointerEvents = behind ? "none" : "auto";
      });
    };

    loop();

    return () => {
      cancelAnimationFrame(setupRaf);
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
    };
  }, [isActive]);

  // ── STL loading (once after mount) ────────────────────────────────────────
  useEffect(() => {
    const loader = new STLLoader();

    const tryLoad = () => {
      if (!sceneRef.current) {
        // Scene not ready yet — retry shortly
        setTimeout(tryLoad, 200);
        return;
      }
      planetsConfig.forEach((config) => {
        const url = `${import.meta.env.BASE_URL}${config.stlPath.replace(/^\//, '')}`;
        loader.load(
          url,
          (geometry) => {
            const planet = sceneRef.current?.planets.find((p) => p.config.name === config.name);
            if (!planet) return;
            geometry.computeVertexNormals();
            planet.mesh.geometry.dispose();
            geometry.center();
            planet.mesh.geometry = geometry;
            const box = new THREE.Box3().setFromObject(planet.mesh);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            planet.mesh.scale.setScalar((config.scale * 2.2) / maxDim);
            setLoadedModels((prev) => ({ ...prev, [config.name]: true }));
          },
          undefined,
          () => {
            setLoadedModels((prev) => ({ ...prev, [config.name]: false }));
          }
        );
      });
    };

    tryLoad();
  }, []);

  const handleRecenter = () => {
    cameraRot.current = { x: 0.35, y: 0 };
    cameraZoom.current = 22;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="inline-block"
        >
          <Star className="text-orange-400 mx-auto mb-2" size={40} fill="currentColor" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white uppercase tracking-[0.3em]">
          Theo System — 3D
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full" />
        <p className="text-orange-300/70 text-sm max-w-2xl mx-auto">
          An orange dwarf star system with 0.4 solar masses, home to six unique planetary bodies.
          Click a planet to learn more.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          <Zap size={14} />
          {isPaused ? "Resume Orbits" : "Pause Orbits"}
        </button>
        <button
          onClick={handleRecenter}
          className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-400/30 rounded-full text-purple-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          <Maximize2 size={14} />
          Reset Camera
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-[580px] max-w-6xl mx-auto rounded-3xl border border-blue-500/20 overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* CSS Planet Labels — positioned via direct DOM updates in the loop */}
        <div ref={labelContainerRef} className="absolute inset-0 pointer-events-none">
          {planetsConfig.map((config, i) => (
            <div
              key={config.name}
              ref={(el) => { labelEls.current[i] = el; }}
              onClick={() => setSelectedPlanet(config)}
              className="absolute -translate-x-1/2 transition-opacity duration-150 pointer-events-auto cursor-pointer group"
              style={{ opacity: 0 }}
            >
              {/* dot above label */}
              <div
                className="w-2 h-2 rounded-full mx-auto mb-1 group-hover:scale-150 transition-transform"
                style={{ backgroundColor: config.color, boxShadow: `0 0 6px ${config.color}` }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border whitespace-nowrap group-hover:bg-black/90 transition-all"
                style={{ color: config.color, borderColor: `${config.color}55` }}
              >
                {config.name}
              </span>
              {loadedModels[config.name] === true && (
                <span className="block text-center text-[8px] text-green-400/70 mt-0.5">STL</span>
              )}
            </div>
          ))}
        </div>

        {/* Controls hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 border border-blue-400/30 rounded-full px-4 py-2 pointer-events-none backdrop-blur-sm">
          <p className="text-blue-300/60 text-[10px] uppercase tracking-wider">
            Drag to Rotate · Scroll to Zoom · Click Planet for Info
          </p>
        </div>
      </div>

      {/* Planet Info Panel (shown on click) */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            key={selectedPlanet.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto rounded-2xl border p-5 relative"
            style={{
              backgroundColor: `${selectedPlanet.color}0d`,
              borderColor: `${selectedPlanet.color}44`,
            }}
          >
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: selectedPlanet.color,
                  boxShadow: `0 0 12px ${selectedPlanet.color}`,
                }}
              />
              <h3 className="text-white font-bold text-lg tracking-wider">
                {selectedPlanet.name}
              </h3>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full border ml-auto mr-8"
                style={{
                  color: selectedPlanet.color,
                  borderColor: `${selectedPlanet.color}55`,
                  backgroundColor: `${selectedPlanet.color}15`,
                }}
              >
                {loadedModels[selectedPlanet.name] === true
                  ? "✓ STL Loaded"
                  : "○ Default Shape"}
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{selectedPlanet.description}</p>
            <div className="mt-3 flex gap-6 text-xs text-white/40">
              <span>Orbit: {selectedPlanet.orbitRadius} units</span>
              <span>Speed: ×{selectedPlanet.orbitSpeed}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model Status Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
        {planetsConfig.map((planet) => (
          <button
            key={planet.name}
            onClick={() => setSelectedPlanet(planet)}
            className="bg-blue-950/20 hover:bg-blue-950/40 border border-blue-500/20 rounded-xl p-3 text-left transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: planet.color,
                  boxShadow: `0 0 6px ${planet.color}88`,
                }}
              />
              <span className="text-white text-xs font-bold group-hover:text-opacity-100">
                {planet.name}
              </span>
            </div>
            <div
              className={`px-2 py-1.5 rounded-lg text-[10px] text-center font-medium ${
                loadedModels[planet.name] === true
                  ? "bg-green-600/20 border border-green-400/30 text-green-300"
                  : loadedModels[planet.name] === false
                  ? "bg-slate-600/20 border border-slate-400/20 text-slate-400"
                  : "bg-blue-600/20 border border-blue-400/30 text-blue-300"
              }`}
            >
              {loadedModels[planet.name] === true
                ? "✓ STL Model"
                : loadedModels[planet.name] === false
                ? "○ Default Sphere"
                : "⌛ Loading…"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
