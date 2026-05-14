import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Shield,
  Zap,
  Heart,
  Cpu,
  Sword,
  Sparkles,
  Trophy,
  Star,
  X,
} from "lucide-react";
import dangerballImg from "figma:asset/cfacb425681b2c9a0344628dd90b0730f6f465c7.png";
import paradiseImg from "figma:asset/18f9c03608dc54ea60f9a0dd0c55a70e9302ffdb.png";
import coldiImg from "figma:asset/db3e429267228294ea599e344fe8fb8216e1114f.png";
import gassyballImg from "figma:asset/4b1710d17b9057ea1f5c0329277b26b1614d932f.png";
import gagImg from "figma:asset/3254447eec675464ee6871dd6bdf61752816f98e.png";
import neptwoImg from "figma:asset/df986814ae90a3265de5a2c48ddb3e6f00ff4dca.png";

const characters = [
  {
    name: "Dangerball",
    role: "First Line of Defense",
    image: dangerballImg,
    stats: [
      { label: "HP", value: 94, icon: Heart, color: "text-red-500" },
      { label: "ATK", value: 104, icon: Sword, color: "text-orange-500" },
      { label: "DEF", value: 202, icon: Shield, color: "text-blue-500" },
      { label: "SPD", value: 186, icon: Zap, color: "text-yellow-500" },
      { label: "M.ATK", value: 98, icon: Sparkles, color: "text-purple-500" },
      { label: "M.DEF", value: 147, icon: Star, color: "text-cyan-500" },
      { label: "CRG", value: 1.78, icon: Trophy, color: "text-emerald-500" },
    ],
    bio: "Dangerball is the first planet in the Theo system, orbiting the star in just 31 days. At a young age, he was taught some self-defense skills, and now he uses those skills to protect the star system from it's enemies. Dangerball is also a messenger, making sure to keep the star system updated on current events.",
  },
  {
    name: "Paradise",
    role: "World of Well-Being",
    image: paradiseImg,
    stats: [
      { label: "HP", value: 152, icon: Heart, color: "text-red-500" },
      { label: "ATK", value: 91, icon: Sword, color: "text-orange-500" },
      { label: "DEF", value: 123, icon: Shield, color: "text-blue-500" },
      { label: "SPD", value: 167, icon: Zap, color: "text-yellow-500" },
      { label: "M.ATK", value: 185, icon: Sparkles, color: "text-purple-500" },
      { label: "M.DEF", value: 178, icon: Star, color: "text-cyan-500" },
      { label: "CRG", value: 1.44, icon: Trophy, color: "text-emerald-500" },
    ],
    bio: "Paradise is the most Earth-like planet in the Theo system. He believes in a paradise without pain or work, and therefore he dedicates to taking care of the Theo system and ridding the star system of it's problems. Even though Paradise is a great place to support life, his atmospheric composition may be hostile for humans.",
  },
  {
    name: "Coldi",
    role: "Light in the Cold",
    image: coldiImg,
    stats: [
      { label: "HP", value: 141, icon: Heart, color: "text-red-500" },
      { label: "ATK", value: 89, icon: Sword, color: "text-orange-500" },
      { label: "DEF", value: 102, icon: Shield, color: "text-blue-500" },
      { label: "SPD", value: 153, icon: Zap, color: "text-yellow-500" },
      { label: "M.ATK", value: 173, icon: Sparkles, color: "text-purple-500" },
      { label: "M.DEF", value: 162, icon: Star, color: "text-cyan-500" },
      { label: "CRG", value: 1.8, icon: Trophy, color: "text-emerald-500" },
    ],
    bio: "Coldi was once the embodiment of Theo itself, and even though he isn't anymore, he is one of the most developed planets. Hidden under his thick atmosphere of nitrogen is a long battle between ice and water. Since Coldi is still partially in an ice age, he specializes in ice attacks, but he can use other attacks too. He may seem cold and bitter, but he is actually pretty optimistic. In the far future, Coldi may be a great place to support life.",
  },
  {
    name: "Gassyball",
    role: "Great Glutton",
    image: gassyballImg,
    stats: [
      { label: "HP", value: 241, icon: Heart, color: "text-red-500" },
      { label: "ATK", value: 142, icon: Sword, color: "text-orange-500" },
      { label: "DEF", value: 145, icon: Shield, color: "text-blue-500" },
      { label: "SPD", value: 91, icon: Zap, color: "text-yellow-500" },
      { label: "M.ATK", value: 100, icon: Sparkles, color: "text-purple-500" },
      { label: "M.DEF", value: 121, icon: Star, color: "text-cyan-500" },
      { label: "CRG", value: 1.64, icon: Trophy, color: "text-emerald-500" },
    ],
    bio: "Gassyball is the largest and most massive planet in the Theo system. He's even more massive than Jupiter! This mass has caused Gassyball to have a love for food, especially meat. He spends at least a quarter of his 14-hour long day eating. In battle, Gassyball stands in front of the planets and acts as a meat shield, but he occasionally hides and eats food to recover strength. Oh right, and Gassyball is allergic to chocolate, by the way.",
  },
  {
    name: "Gag",
    role: "Wave of Vomit",
    image: gagImg,
    stats: [
      { label: "HP", value: 152, icon: Heart, color: "text-red-500" },
      { label: "ATK", value: 90, icon: Sword, color: "text-orange-500" },
      { label: "DEF", value: 163, icon: Shield, color: "text-blue-500" },
      { label: "SPD", value: 100, icon: Zap, color: "text-yellow-500" },
      { label: "M.ATK", value: 130, icon: Sparkles, color: "text-purple-500" },
      { label: "M.DEF", value: 154, icon: Star, color: "text-cyan-500" },
      { label: "CRG", value: 1.43, icon: Trophy, color: "text-emerald-500" },
    ],
    bio: "Gag may seem like a really annoying planet to have, because she vomits so much, but this is actually her way of surviving! In battle, she spits out all kinds of acids to distract or even poison her enemies! Despite this problem of hers, she hasn't lost her appetite yet! She still eats a lot of food, just nowhere near as much as Gassyball. She spends more of her 12-hour long day interacting with others or dealing with her constant nausea.",
  },
  {
    name: "Neptwo",
    role: "Judicial Warrior",
    image: neptwoImg,
    stats: [
      { label: "HP", value: 155, icon: Heart, color: "text-red-500" },
      { label: "ATK", value: 178, icon: Sword, color: "text-orange-500" },
      { label: "DEF", value: 87, icon: Shield, color: "text-blue-500" },
      { label: "SPD", value: 143, icon: Zap, color: "text-yellow-500" },
      { label: "M.ATK", value: 190, icon: Sparkles, color: "text-purple-500" },
      { label: "M.DEF", value: 99, icon: Star, color: "text-cyan-500" },
      { label: "CRG", value: 1.94, icon: Trophy, color: "text-emerald-500" },
    ],
    bio: "Neptwo is one of the most developed characters in the Theo system, despite having a strong resemblance to the planet Neptune. The psychic powers that he wields can be pretty deadly, so if you get in his way, you're gonna have a bad time. Back then, he often attacked others for no reason or to protect his ego, but now he tries his best to help his family and friends, since he still has a nemesis to deal with.",
  },
];

export const Bios: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);

  return (
    <div className="space-y-8 pb-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-[0.2em]">
          Character Archives
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((char, index) => (
          <motion.div
            key={char.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedCharacter(char)}
          >
            {/* Character Card — no opaque background, just a subtle border */}
            <div className="relative z-10 h-full border border-white/10 group-hover:border-white/25 rounded-[32px] overflow-hidden flex flex-col transition-colors duration-500">
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src={char.image}
                  alt={char.name}
                  className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 ${
                    ["Dangerball", "Paradise", "Gassyball"].includes(char.name)
                      ? "p-20"
                      : "p-4"
                  }`}
                />
                {/* Gradient from bottom so the name text stays readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <span className="text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-1 block drop-shadow-md">
                    {char.role}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                    {char.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-white/65 text-xs leading-relaxed line-clamp-3 drop-shadow-sm">
                  {char.bio}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {char.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-1.5 rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300"
                    >
                      <stat.icon
                        className={`mx-auto ${stat.color} mb-1 opacity-70 group-hover:opacity-100 transition-opacity`}
                        size={12}
                      />
                      <span className="block text-white text-[9px] font-bold drop-shadow">
                        {stat.value}
                      </span>
                      <span className="block text-[6px] uppercase text-white/40 tracking-tighter">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Click to expand hint */}
                <div className="text-center pt-2">
                  <span className="text-white/35 text-[9px] uppercase tracking-wider group-hover:text-white/70 transition-colors">
                    Click to expand →
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Character Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-950/90 to-blue-900/80 border-2 border-blue-400/40 rounded-3xl shadow-2xl shadow-blue-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 rounded-full transition-all duration-300 group"
              >
                <X className="text-blue-300 group-hover:text-white transition-colors" size={24} />
              </button>

              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Left Column - Character Image */}
                  <div className="space-y-6">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-blue-400/30 bg-black/40 shadow-2xl shadow-blue-500/20">
                      <ImageWithFallback
                        src={selectedCharacter.image}
                        alt={selectedCharacter.name}
                        className="w-full h-full object-contain p-6"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Stats Section */}
                    <div className="bg-blue-950/50 border border-blue-400/20 rounded-2xl p-6 backdrop-blur-sm">
                      <h3 className="text-blue-300 text-sm font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Cpu size={16} className="text-blue-400" />
                        Combat Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedCharacter.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 transition-all"
                          >
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <stat.icon className={stat.color} size={20} />
                            </div>
                            <div>
                              <span className="block text-white text-xl font-bold">
                                {stat.value}
                              </span>
                              <span className="block text-xs uppercase text-blue-400/70 tracking-wider">
                                {stat.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Character Info */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">
                        {selectedCharacter.role}
                      </span>
                      <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {selectedCharacter.name}
                      </h2>
                      <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </div>

                    {/* Biography */}
                    <div className="bg-blue-950/50 border border-blue-400/20 rounded-2xl p-6 backdrop-blur-sm">
                      <h3 className="text-blue-300 text-sm font-bold uppercase tracking-[0.2em] mb-4">
                        Biography
                      </h3>
                      <p className="text-blue-100/80 leading-relaxed text-base">
                        {selectedCharacter.bio}
                      </p>
                    </div>

                    {/* Additional Info Section - Placeholder for future content */}
                    <div className="bg-blue-950/50 border border-blue-400/20 rounded-2xl p-6 backdrop-blur-sm">
                      <h3 className="text-blue-300 text-sm font-bold uppercase tracking-[0.2em] mb-4">
                        Additional Information
                      </h3>
                      <div className="space-y-3 text-blue-100/60">
                        <p className="text-sm italic">More details coming soon...</p>
                        {/* You can add more character-specific information here */}
                      </div>
                    </div>

                    {/* Quick Facts */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl p-6">
                      <h3 className="text-blue-300 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                        Planet Classification
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">
                          Theo System
                        </span>
                        <span className="px-3 py-1.5 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs text-purple-200">
                          Planet
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};