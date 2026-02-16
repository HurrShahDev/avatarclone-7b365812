import { useEffect, useRef } from 'react';

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const drawHead = (cx: number, cy: number, w: number, h: number) => {
      const t = time * 0.008;
      const breathe = Math.sin(t * 1.2) * 2;

      ctx.save();
      ctx.translate(cx, cy + breathe);

      // Head shape - oval
      const headH = h * 0.42;
      const headW = w * 0.32;
      const headY = -h * 0.12;

      // Glow behind head
      const glow = ctx.createRadialGradient(0, headY, headW * 0.3, 0, headY, headW * 1.5);
      glow.addColorStop(0, 'hsla(210, 100%, 60%, 0.08)');
      glow.addColorStop(0.5, 'hsla(270, 80%, 60%, 0.04)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(-w / 2, -h / 2, w, h);

      // Wireframe head
      ctx.strokeStyle = 'hsla(210, 100%, 65%, 0.6)';
      ctx.lineWidth = 1;

      // Head outline
      ctx.beginPath();
      ctx.ellipse(0, headY, headW, headH, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner wireframe lines (horizontal)
      for (let i = -3; i <= 3; i++) {
        const yOff = (i / 3) * headH * 0.8;
        const xSpan = Math.sqrt(1 - (yOff / headH) ** 2) * headW;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(210, 100%, 65%, ${0.15 + Math.abs(Math.sin(t + i)) * 0.15})`;
        ctx.moveTo(-xSpan, headY + yOff);
        ctx.lineTo(xSpan, headY + yOff);
        ctx.stroke();
      }

      // Vertical wireframe lines
      for (let i = -2; i <= 2; i++) {
        const xOff = (i / 2) * headW * 0.6;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(270, 80%, 65%, ${0.1 + Math.abs(Math.cos(t + i)) * 0.15})`;
        ctx.moveTo(xOff, headY - headH * 0.8);
        ctx.lineTo(xOff, headY + headH * 0.8);
        ctx.stroke();
      }

      // Eyes
      const eyeY = headY - headH * 0.1;
      const eyeSpacing = headW * 0.35;
      const blink = Math.abs(Math.sin(t * 0.5)) > 0.05 ? 1 : 0.1;

      ctx.fillStyle = 'hsla(210, 100%, 70%, 0.8)';
      ctx.beginPath();
      ctx.ellipse(-eyeSpacing, eyeY, 4, 3 * blink, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(eyeSpacing, eyeY, 4, 3 * blink, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose hint
      ctx.strokeStyle = 'hsla(210, 100%, 65%, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, eyeY + 8);
      ctx.lineTo(2, eyeY + 18);
      ctx.lineTo(-2, eyeY + 20);
      ctx.stroke();

      // Mouth
      ctx.strokeStyle = 'hsla(270, 80%, 65%, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, eyeY + 30, 8, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Neck
      ctx.strokeStyle = 'hsla(210, 100%, 65%, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-headW * 0.25, headY + headH);
      ctx.lineTo(-headW * 0.3, headY + headH + 30);
      ctx.moveTo(headW * 0.25, headY + headH);
      ctx.lineTo(headW * 0.3, headY + headH + 30);
      ctx.stroke();

      // Shoulders hint
      ctx.strokeStyle = 'hsla(210, 100%, 65%, 0.15)';
      ctx.beginPath();
      ctx.moveTo(-headW * 0.3, headY + headH + 30);
      ctx.quadraticCurveTo(-headW * 1.2, headY + headH + 35, -headW * 1.5, headY + headH + 60);
      ctx.moveTo(headW * 0.3, headY + headH + 30);
      ctx.quadraticCurveTo(headW * 1.2, headY + headH + 35, headW * 1.5, headY + headH + 60);
      ctx.stroke();

      ctx.restore();
    };

    const drawScanRings = (cx: number, cy: number, w: number) => {
      const t = time * 0.005;

      for (let i = 0; i < 3; i++) {
        const radius = w * (0.28 + i * 0.1);
        const rotation = t * (i % 2 === 0 ? 1 : -1) * (1 + i * 0.3);
        const alpha = 0.15 + Math.sin(t * 2 + i) * 0.1;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);

        ctx.strokeStyle = i % 2 === 0
          ? `hsla(210, 100%, 60%, ${alpha})`
          : `hsla(270, 80%, 60%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 16, 3, 16]);

        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();
      }
    };

    const drawWaveform = (cx: number, cy: number, w: number) => {
      const t = time * 0.015;
      const waveW = w * 0.5;
      const startX = cx - waveW / 2;

      ctx.strokeStyle = 'hsla(210, 100%, 60%, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= waveW; i++) {
        const x = startX + i;
        const amp = Math.sin(i * 0.05) * 12;
        const y = cy + Math.sin(i * 0.08 + t) * amp * Math.sin(t * 0.5 + i * 0.01);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second waveform
      ctx.strokeStyle = 'hsla(270, 80%, 60%, 0.2)';
      ctx.beginPath();
      for (let i = 0; i <= waveW; i++) {
        const x = startX + i;
        const amp = Math.sin(i * 0.04 + 1) * 8;
        const y = cy + 15 + Math.sin(i * 0.1 + t * 1.3) * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawDataLines = (cx: number, cy: number, w: number, h: number) => {
      const t = time * 0.01;

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t * 0.3;
        const innerR = w * 0.22;
        const outerR = w * 0.38 + Math.sin(t + i) * 10;

        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR * 0.35;
        const x2 = cx + Math.cos(angle) * outerR;
        const y2 = cy + Math.sin(angle) * outerR * 0.35;

        ctx.strokeStyle = `hsla(210, 100%, 60%, ${0.1 + Math.sin(t * 2 + i) * 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Data point
        ctx.fillStyle = `hsla(270, 80%, 65%, ${0.3 + Math.sin(t * 3 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x2, y2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFloatingText = (cx: number, cy: number, w: number) => {
      const t = time * 0.008;
      ctx.font = '9px monospace';
      
      const labels = ['VOICE_ANALYSIS', 'NEURAL_MAP', 'FACE_SCAN', 'SYNC_OK'];
      labels.forEach((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2 + t * 0.2;
        const radius = w * 0.4;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.3 - 20;
        const alpha = 0.2 + Math.sin(t * 2 + i) * 0.15;

        ctx.fillStyle = `hsla(210, 100%, 70%, ${alpha})`;
        ctx.fillText(label, x - 25, y);
      });
    };

    const animate = () => {
      time++;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = `hsla(210, 100%, 70%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      drawScanRings(cx, cy - 10, w);
      drawDataLines(cx, cy - 10, w, h);
      drawHead(cx, cy - 10, w, h);
      drawWaveform(cx, cy + h * 0.32, w);
      drawFloatingText(cx, cy - 10, w);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(210, 100%, 60%, 0.06) 0%, hsla(270, 80%, 60%, 0.03) 40%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default HeroAnimation;
