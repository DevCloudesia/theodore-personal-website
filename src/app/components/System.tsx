import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Star, Zap, ZoomIn, ZoomOut, Calendar, Plus, X } from "lucide-react";
import dangerballImg from "figma:asset/cfacb425681b2c9a0344628dd90b0730f6f465c7.png";
import paradiseImg from "figma:asset/18f9c03608dc54ea60f9a0dd0c55a70e9302ffdb.png";
import coldiImg from "figma:asset/db3e429267228294ea599e344fe8fb8216e1114f.png";
import gassyballImg from "figma:asset/4b1710d17b9057ea1f5c0329277b26b1614d932f.png";
import gagImg from "figma:asset/3254447eec675464ee6871dd6bdf61752816f98e.png";
import neptwoImg from "figma:asset/df986814ae90a3265de5a2c48ddb3e6f00ff4dca.png";

interface Planet {
  name: string;
  image: string;
  orbitRadiusAU: number;   // real AU value shown in labels
  visualRadius: number;    // pixels at 1× zoom — what drives layout
  orbitDuration: number;   // seconds for one full orbit
  size: number;            // planet image diameter in px
  color: string;
  description: string;
}

const planets: Planet[] = [
  {
    name: "Dangerball",
    image: dangerballImg,
    orbitRadiusAU: 0.1,
    visualRadius: 62,
    orbitDuration: 8,
    size: 18,
    color: "#ef4444",
    description: "First planet · 0.1 AU · 31 day orbit",
  },
  {
    name: "Paradise",
    image: paradiseImg,
    orbitRadiusAU: 0.55,
    visualRadius: 108,
    orbitDuration: 18,
    size: 20,
    color: "#22c55e",
    description: "Second planet · 0.55 AU",
  },
  {
    name: "Coldi",
    image: coldiImg,
    orbitRadiusAU: 0.9,
    visualRadius: 150,
    orbitDuration: 26,
    size: 36,
    color: "#3b82f6",
    description: "Third planet · 0.9 AU",
  },
  {
    name: "Gassyball",
    image: gassyballImg,
    orbitRadiusAU: 4.4,
    visualRadius: 210,
    orbitDuration: 60,
    size: 30,
    color: "#a855f7",
    description: "Fourth planet · 4.4 AU · Gas giant",
  },
  {
    name: "Gag",
    image: gagImg,
    orbitRadiusAU: 7.4,
    visualRadius: 258,
    orbitDuration: 85,
    size: 40,
    color: "#ec4899",
    description: "Fifth planet · 7.4 AU",
  },
  {
    name: "Neptwo",
    image: neptwoImg,
    orbitRadiusAU: 13.6,
    visualRadius: 308,
    orbitDuration: 120,
    size: 36,
    color: "#0ea5e9",
    description: "Sixth planet · 13.6 AU",
  },
];

export const System: React.FC = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Generated once so star positions don't shuffle on every re-render
  const starDots = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        size: Math.random() * 1.8 + 0.5,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.2,
      })),
    []
  );

  return (
    <div className="space-y-8 pb-10">
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
          Theo System
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full" />
        <p className="text-orange-300/70 text-sm max-w-2xl mx-auto">
          An orange dwarf star with 0.4 solar masses — home to six unique planetary bodies.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 items-center flex-wrap">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          <Zap size={14} />
          {isPaused ? "Resume Orbits" : "Pause Orbits"}
        </button>

        <div className="flex items-center gap-2 bg-blue-950/30 border border-blue-400/20 rounded-full p-1">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.4, z - 0.2))}
            className="p-2 hover:bg-blue-600/40 rounded-full text-blue-300 transition-all"
          >
            <ZoomOut size={16} />
          </button>
          <span className="px-3 text-blue-300 text-xs font-mono min-w-[52px] text-center">
            {(zoomLevel * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
            className="p-2 hover:bg-blue-600/40 rounded-full text-blue-300 transition-all"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* ── Flat 2D Solar System ─────────────────────────────────────────── */}
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl border border-blue-500/10"
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* Space background */}
        <div className="absolute inset-0 bg-black">
          {/* Static star dots (stable between renders) */}
          {starDots.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white pointer-events-none"
              style={{
                width: s.size + "px",
                height: s.size + "px",
                top: s.top + "%",
                left: s.left + "%",
                opacity: s.opacity,
              }}
            />
          ))}
        </div>

        {/* Zoomable system container — centered in the square */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.3s ease" }}
        >
          {/* Orbit rings */}
          {planets.map((planet) => (
            <div
              key={`ring-${planet.name}`}
              className="absolute rounded-full border border-dashed pointer-events-none"
              style={{
                width: planet.visualRadius * 2,
                height: planet.visualRadius * 2,
                borderColor: planet.color + "55",
                boxShadow: `0 0 8px ${planet.color}22, inset 0 0 8px ${planet.color}11`,
              }}
            />
          ))}

          {/* Central star */}
          <div className="absolute z-20">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(251,146,60,0.8), 0 0 60px rgba(251,146,60,0.3)",
                  "0 0 50px rgba(251,146,60,1),   0 0 90px rgba(251,146,60,0.5)",
                  "0 0 30px rgba(251,146,60,0.8), 0 0 60px rgba(251,146,60,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-orange-700 relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/30" />
            </motion.div>
            <p className="text-center text-orange-300 text-[10px] font-bold mt-1 select-none">
              Theo
            </p>
          </div>

          {/* Orbiting planets */}
          {planets.map((planet) => (
            <motion.div
              key={planet.name}
              className="absolute"
              style={{ width: 0, height: 0 }}
              animate={isPaused ? false : { rotate: [0, 360] }}
              transition={{
                duration: planet.orbitDuration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {/* Arm extending to orbit radius */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: planet.visualRadius,
                  height: 0,
                  transform: "translateY(-50%)",
                }}
              >
                {/* Planet at the end of the arm */}
                <motion.div
                  className="absolute right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer group z-10"
                  animate={isPaused ? false : { rotate: [0, -360] }}
                  transition={{
                    duration: planet.orbitDuration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  onHoverStart={() => setHoveredPlanet(planet.name)}
                  onHoverEnd={() => setHoveredPlanet(null)}
                  onClick={() => setSelectedPlanet(planet)}
                  whileHover={{ scale: 1.35 }}
                >
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="object-contain select-none"
                    style={{
                      width: planet.size,
                      height: planet.size,
                      filter: `drop-shadow(0 0 8px ${planet.color}cc) drop-shadow(0 0 18px ${planet.color}55)`,
                    }}
                    draggable={false}
                  />

                  {/* Hover label */}
                  <AnimatePresence>
                    {hoveredPlanet === planet.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-black/90 border border-white/10 rounded-lg px-3 py-1.5 pointer-events-none backdrop-blur-sm"
                      >
                        <p className="text-white text-xs font-bold">{planet.name}</p>
                        <p className="text-blue-300/70 text-[9px]">{planet.orbitRadiusAU} AU</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 border border-blue-400/20 rounded-full px-4 py-2 pointer-events-none backdrop-blur-sm">
          <p className="text-blue-300/60 text-[10px] uppercase tracking-wider">
            Click a planet for info · Use zoom controls above
          </p>
        </div>
      </div>

      {/* Planet info popup */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            key={selectedPlanet.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto rounded-2xl border p-5 flex items-center gap-5 relative"
            style={{
              backgroundColor: selectedPlanet.color + "0d",
              borderColor: selectedPlanet.color + "44",
            }}
          >
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
            >
              <X size={16} />
            </button>
            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.name}
              className="w-16 h-16 object-contain flex-shrink-0"
              style={{
                filter: `drop-shadow(0 0 6px ${selectedPlanet.color}cc)`,
              }}
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: selectedPlanet.color }}>
                {selectedPlanet.orbitRadiusAU} AU from Theo
              </p>
              <h3 className="text-white font-bold text-xl">{selectedPlanet.name}</h3>
              <p className="text-white/55 text-xs mt-1">{selectedPlanet.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planet legend */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-3">
        {planets.map((planet) => (
          <motion.button
            key={planet.name}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedPlanet(planet)}
            className="bg-blue-950/30 hover:bg-blue-950/50 border border-blue-500/20 rounded-2xl p-3 text-center space-y-2 transition-colors cursor-pointer"
            style={{
              borderColor:
                hoveredPlanet === planet.name || selectedPlanet?.name === planet.name
                  ? planet.color
                  : undefined,
            }}
            onMouseEnter={() => setHoveredPlanet(planet.name)}
            onMouseLeave={() => setHoveredPlanet(null)}
          >
            <img
              src={planet.image}
              alt={planet.name}
              className="w-12 h-12 mx-auto object-contain"
              style={{
                filter: `drop-shadow(0 0 5px ${planet.color}cc)`,
              }}
            />
            <div>
              <p className="text-white text-xs font-bold leading-tight">{planet.name}</p>
              <p className="text-blue-300/50 text-[9px]">{planet.orbitRadiusAU} AU</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info note */}
      <div className="max-w-2xl mx-auto bg-blue-950/20 border border-blue-400/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
          <div className="space-y-1.5 text-xs text-blue-200/60">
            <p>
              <strong className="text-blue-300">Astronomical Unit (AU):</strong> Average
              Earth–Sun distance (~150 million km). Orbits are not to scale — inner planets are
              enlarged for visibility.
            </p>
            <p>
              <strong className="text-blue-300">Animation speed:</strong> Scaled for
              visualization, not real orbital periods.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block"
          >
            <Calendar className="text-blue-400 mx-auto mb-2" size={28} />
          </motion.div>
          <h3 className="text-xl font-bold text-white uppercase tracking-[0.2em]">
            Featured Events
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-gradient-to-br from-blue-950/40 to-purple-950/30 border border-blue-500/20 rounded-2xl p-6 overflow-hidden cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500" />
              <div className="relative space-y-3 text-center">
                <div className="w-14 h-14 mx-auto bg-blue-600/20 border border-blue-400/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="text-blue-400" size={22} />
                </div>
                <h4 className="text-white/40 text-sm font-semibold uppercase tracking-wider">
                  Event Slot {i}
                </h4>
                <p className="text-blue-300/30 text-xs">Add upcoming system events here</p>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-blue-400/40 text-xs uppercase tracking-wider py-3"
        >
          More events coming soon
        </motion.p>
      </div>
    </div>
  );
};
