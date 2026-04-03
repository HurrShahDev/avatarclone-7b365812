const HeroTransition = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ marginTop: '-1px' }}>
      {/* SVG Wave */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{ height: '80px' }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Background wave */}
        <path
          d="M0,80 C240,20 480,100 720,60 C960,20 1200,90 1440,40 L1440,120 L0,120 Z"
          fill="url(#waveGrad)"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,80 C240,20 480,100 720,60 C960,20 1200,90 1440,40 L1440,120 L0,120 Z;
              M0,60 C240,100 480,30 720,80 C960,40 1200,70 1440,50 L1440,120 L0,120 Z;
              M0,80 C240,20 480,100 720,60 C960,20 1200,90 1440,40 L1440,120 L0,120 Z
            "
          />
        </path>
        {/* Foreground wave */}
        <path
          d="M0,90 C360,40 720,100 1080,50 C1260,30 1380,60 1440,55 L1440,120 L0,120 Z"
          fill="url(#waveGrad)"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,90 C360,40 720,100 1080,50 C1260,30 1380,60 1440,55 L1440,120 L0,120 Z;
              M0,70 C360,90 720,40 1080,80 C1260,50 1380,70 1440,65 L1440,120 L0,120 Z;
              M0,90 C360,40 720,100 1080,50 C1260,30 1380,60 1440,55 L1440,120 L0,120 Z
            "
          />
        </path>
        {/* Thin accent line */}
        <path
          d="M0,85 C360,50 720,90 1080,55 C1260,40 1380,65 1440,60"
          stroke="#6366F1"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          fill="none"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0,85 C360,50 720,90 1080,55 C1260,40 1380,65 1440,60;
              M0,65 C360,85 720,45 1080,75 C1260,55 1380,70 1440,50;
              M0,85 C360,50 720,90 1080,55 C1260,40 1380,65 1440,60
            "
          />
        </path>
      </svg>

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { left: '10%', top: '30%', size: 4, delay: '0s', dur: '4s' },
          { left: '25%', top: '50%', size: 3, delay: '1s', dur: '5s' },
          { left: '45%', top: '25%', size: 5, delay: '0.5s', dur: '6s' },
          { left: '65%', top: '55%', size: 3, delay: '2s', dur: '4.5s' },
          { left: '80%', top: '35%', size: 4, delay: '1.5s', dur: '5.5s' },
          { left: '90%', top: '60%', size: 3, delay: '0.8s', dur: '4s' },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              background: 'linear-gradient(135deg, #6366F1, #A855F7)',
              opacity: 0.4,
              animation: `floatDot ${dot.dur} ease-in-out ${dot.delay} infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroTransition;
