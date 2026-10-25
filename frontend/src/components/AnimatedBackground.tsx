import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-[0.08]" />
      
      {/* Floating dots */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bg-primary rounded-full"
          style={{ width: p.size, height: p.size, left: p.left, top: '100%' }}
          animate={{
            y: [0, -1000], // Moves up by 1000px
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
