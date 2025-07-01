import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const ParticleField = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = [];
    const particleCount = 100;
    const colors = ['#00d4ff', '#8a2be2', '#39ff14', '#ff1493'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      });
    }

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    containerRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    const animate = () => {
      if (!containerRef.current) return;

      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    const text = title.textContent;
    title.textContent = '';
    
    // Create animated text effect
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `opacity 0.5s ${i * 0.05}s, transform 0.5s ${i * 0.05}s`;
      title.appendChild(span);
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 100);
    });
  }, []);

  // Inside the return statement
  return (
    <div className="relative w-full min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-rich-black rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
  
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6 text-rich-black">
              Shaping Tomorrow's Workforce Today
            </h1>
            <p className="text-lg mb-8 text-rich-black/80">
              Join YugaYatra's innovative internship programs and embark on a journey of professional excellence. 
              We're not just training individuals; we're crafting future leaders.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/signup" className="modern-button">Get Started</a>
              <a href="#quiz" className="modern-button">
                Explore Opportunities
              </a>
              <a href="#about" className="modern-button">
                Learn More
              </a>
            </div>
          </div>
  
          {/* Dynamic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Web Development', count: '25+' },
              { title: 'Software Engineering', count: '40+' },
              { title: 'App Development', count: '30+' },
              { title: 'Digital Marketing', count: '20+' }
            ].map((item, index) => (
              <div 
                key={index}
                className="dynamic-card fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-bold mb-2 text-rich-black">{item.title}</h3>
                <p className="text-3xl font-bold text-lavish-gold">{item.count}</p>
                <p className="text-sm opacity-80">Available Positions</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Animated scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-rich-black rounded-full p-1">
          <div className="w-1 h-3 bg-rich-black rounded-full mx-auto animate-bounce" />
        </div>
      </div> */}
    </div>
  );
};

export default Hero;