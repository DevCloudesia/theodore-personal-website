import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Globe } from 'lucide-react';
import logo from 'figma:asset/6eb5c49404e90ee5b457d5f3ad33d8c5d8395a61.png';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center mb-6"
      >
        <motion.img 
          src={logo} 
          alt="TheoUniverse" 
          className="w-48 h-48 md:w-56 md:h-56 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          animate={{ 
            filter: [
              'drop-shadow(0 0 30px rgba(59,130,246,0.5))',
              'drop-shadow(0 0 40px rgba(59,130,246,0.7))',
              'drop-shadow(0 0 30px rgba(59,130,246,0.5))'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-4"
      >
        <div className="inline-block p-3 rounded-full bg-blue-900/20 border border-blue-500/30 mb-4">
          <Sparkles className="text-blue-400 animate-pulse" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Welcome to the Void</h2>
        <p className="text-blue-200/70 leading-relaxed">
          This is my personal sector of the digital universe. A place where characters breathe and code takes form.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Terminal, title: "Development", desc: "Crafting interactive experiences with React and Scratch." },
          { icon: Globe, title: "Character Design", desc: "Building worlds through storytelling and digital art." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/30 flex items-start gap-4"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="text-blue-100 font-semibold">{item.title}</h3>
              <p className="text-blue-300/60 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-blue-900/30">
        <div className="bg-blue-900/10 rounded-xl p-4 border border-dashed border-blue-500/20">
          <p className="text-blue-400 text-xs text-center italic">
            "Space is not a void. It is a canvas."
          </p>
        </div>
      </div>
    </div>
  );
};