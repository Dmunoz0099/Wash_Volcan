import { useEffect, useRef } from 'react';

function Hero() {
  const canvasRef = useRef(null);

  // Partículas volcánicas de fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.hue = Math.random() > 0.5 ? 15 : 0; // naranjo o rojo
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.02) * 0.3;
        this.life++;
        this.opacity *= 0.997;
        if (this.life > this.maxLife || this.y < -10 || this.opacity < 0.01) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 55%, ${this.opacity})`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
        ctx.shadowBlur = this.size * 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < 50; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height; // posición inicial dispersa
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="inicio" className="hero">
      {/* Fondo con capas de gradiente volcánico */}
      <div className="hero__bg" />
      <canvas ref={canvasRef} className="hero__particles" />

      <div className="hero__inner container">
        {/* Columna izquierda: Contenido */}
        <div className="hero__text">
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            Servicio a Domicilio
          </div>
          <h1 className="hero__title">
            Lavado<br />
            <span className="hero__title-accent">Premium</span>
          </h1>
          <p className="hero__subtitle">
            Llevamos la potencia del volcán hasta tu puerta.
            Productos premium, detallado profesional, sin que muevas tu auto.
          </p>
          <div className="hero__actions">
            <a href="#reservar" className="hero__btn-primary">
              <span>Reservar Ahora</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#servicios" className="hero__btn-ghost">
              Ver Servicios
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">500+</span>
              <span className="hero__stat-label">Autos lavados</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">4.9</span>
              <span className="hero__stat-label">Calificación</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">100%</span>
              <span className="hero__stat-label">A domicilio</span>
            </div>
          </div>
        </div>

        {/* Columna derecha: Logo con efecto volcánico */}
        <div className="hero__logo-wrapper">
          {/* Anillos orbitales de energía */}
          <div className="hero__ring hero__ring--1" />
          <div className="hero__ring hero__ring--2" />
          <div className="hero__ring hero__ring--3" />

          {/* Resplandor de lava detrás */}
          <div className="hero__lava-glow" />

          {/* Logo principal */}
          <div className="hero__logo-container">
            <img
              src="/logo.png"
              alt="Volcán Wash Móvil"
              className="hero__logo"
              loading="eager"
            />
          </div>

          {/* Badges flotantes */}
          <div className="hero__float-badge hero__float-badge--1">
            <span>⚡</span> Rápido
          </div>
          <div className="hero__float-badge hero__float-badge--2">
            <span>💎</span> Premium
          </div>
          <div className="hero__float-badge hero__float-badge--3">
            <span>🔥</span> Potente
          </div>
        </div>
      </div>

      {/* Onda inferior */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z" fill="var(--negro-suave)" />
        </svg>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 80px;
        }

        /* ── Fondo multicapa ─────────────────────── */
        .hero__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(212, 32, 32, 0.12) 0%, transparent 100%),
            radial-gradient(ellipse 60% 80% at 30% 80%, rgba(232, 96, 26, 0.06) 0%, transparent 100%),
            radial-gradient(ellipse 50% 50% at 80% 90%, rgba(45, 142, 201, 0.05) 0%, transparent 100%),
            linear-gradient(180deg, #060606 0%, #0a0a0a 40%, #0f0d0c 100%);
          z-index: 0;
        }
        .hero__particles {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        /* ── Layout split ────────────────────────── */
        .hero__inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          width: 100%;
          padding-top: 20px;
          padding-bottom: 80px;
        }

        /* ── Columna texto ───────────────────────── */
        .hero__text {
          animation: heroFadeIn 0.8s ease-out both;
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero__tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(232, 96, 26, 0.1);
          border: 1px solid rgba(232, 96, 26, 0.25);
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--naranjo-claro);
          margin-bottom: 28px;
        }
        .hero__tag-dot {
          width: 8px;
          height: 8px;
          background: var(--naranjo);
          border-radius: 50%;
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(232, 96, 26, 0.4); }
          50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(232, 96, 26, 0); }
        }

        .hero__title {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.05;
          text-transform: uppercase;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }
        .hero__title-accent {
          background: var(--gradiente-fuego);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 4.8rem;
          display: inline-block;
        }
        .hero__title-thin {
          font-weight: 300;
          font-size: 2.2rem;
          text-transform: none;
          letter-spacing: 2px;
          color: rgba(245, 245, 245, 0.5);
        }

        .hero__subtitle {
          font-size: 1.05rem;
          color: rgba(245, 245, 245, 0.55);
          max-width: 460px;
          line-height: 1.8;
          margin-bottom: 36px;
        }

        .hero__actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }
        .hero__btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: var(--gradiente-fuego);
          color: var(--blanco-puro);
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 24px rgba(212, 32, 32, 0.3);
        }
        .hero__btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 40px rgba(212, 32, 32, 0.5);
        }
        .hero__btn-primary svg {
          transition: transform 0.3s;
        }
        .hero__btn-primary:hover svg {
          transform: translateX(4px);
        }
        .hero__btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 16px 28px;
          border: 1px solid rgba(245, 245, 245, 0.15);
          border-radius: 14px;
          font-weight: 600;
          font-size: 0.95rem;
          color: rgba(245, 245, 245, 0.7);
          transition: all 0.3s;
        }
        .hero__btn-ghost:hover {
          border-color: var(--naranjo);
          color: var(--naranjo);
          background: rgba(232, 96, 26, 0.05);
          transform: translateY(-3px);
        }

        /* Stats */
        .hero__stats {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .hero__stat {
          display: flex;
          flex-direction: column;
        }
        .hero__stat-num {
          font-size: 1.6rem;
          font-weight: 800;
          background: var(--gradiente-fuego);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__stat-label {
          font-size: 0.75rem;
          color: rgba(245, 245, 245, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        .hero__stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(245, 245, 245, 0.1);
        }

        /* ── Columna logo ────────────────────────── */
        .hero__logo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1;
          max-width: 520px;
          margin: 0 auto;
          animation: heroLogoIn 1s ease-out 0.3s both;
        }
        @keyframes heroLogoIn {
          from { opacity: 0; transform: scale(0.8) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Anillos orbitales */
        .hero__ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .hero__ring--1 {
          width: 105%;
          height: 105%;
          border-color: rgba(212, 32, 32, 0.1);
          animation: ringRotate 20s linear infinite;
        }
        .hero__ring--2 {
          width: 120%;
          height: 120%;
          border-color: rgba(232, 96, 26, 0.07);
          border-style: dashed;
          animation: ringRotate 30s linear infinite reverse;
        }
        .hero__ring--3 {
          width: 135%;
          height: 135%;
          border-color: rgba(45, 142, 201, 0.05);
          animation: ringRotate 40s linear infinite;
        }
        @keyframes ringRotate {
          to { transform: rotate(360deg); }
        }

        /* Resplandor de lava */
        .hero__lava-glow {
          position: absolute;
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(212, 32, 32, 0.2) 0%,
            rgba(232, 96, 26, 0.1) 40%,
            transparent 70%
          );
          filter: blur(40px);
          animation: lavaGlow 4s ease-in-out infinite alternate;
        }
        @keyframes lavaGlow {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        /* Logo */
        .hero__logo-container {
          position: relative;
          z-index: 2;
          width: 72%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero__logo-wrapper:hover .hero__logo-container {
          transform: scale(1.04);
        }
        .hero__logo {
          width: 100%;
          height: auto;
          mix-blend-mode: lighten;
          filter:
            drop-shadow(0 0 40px rgba(212, 32, 32, 0.25))
            drop-shadow(0 0 80px rgba(232, 96, 26, 0.12));
        }

        /* Badges flotantes */
        .hero__float-badge {
          position: absolute;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(20, 20, 20, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(245, 245, 245, 0.8);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          white-space: nowrap;
        }
        .hero__float-badge span {
          font-size: 1rem;
        }
        .hero__float-badge--1 {
          top: 12%;
          right: -5%;
          animation: floatBadge 5s ease-in-out infinite;
        }
        .hero__float-badge--2 {
          bottom: 20%;
          left: -8%;
          animation: floatBadge 5s ease-in-out 1.5s infinite;
        }
        .hero__float-badge--3 {
          bottom: 8%;
          right: 2%;
          animation: floatBadge 5s ease-in-out 3s infinite;
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* ── Onda inferior ───────────────────────── */
        .hero__wave {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          z-index: 3;
          line-height: 0;
        }
        .hero__wave svg {
          width: 100%;
          height: 80px;
        }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 1024px) {
          .hero__inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero__text {
            order: 2;
          }
          .hero__logo-wrapper {
            order: 1;
            max-width: 350px;
          }
          .hero__tag {
            margin-left: auto;
            margin-right: auto;
          }
          .hero__subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .hero__actions {
            justify-content: center;
          }
          .hero__stats {
            justify-content: center;
          }
          .hero__float-badge--1 { right: 0; }
          .hero__float-badge--2 { left: 0; }
        }

        @media (max-width: 640px) {
          .hero {
            padding-top: 70px;
          }
          .hero__title {
            font-size: 2.6rem;
          }
          .hero__title-accent {
            font-size: 3.2rem;
          }
          .hero__title-thin {
            font-size: 1.5rem;
          }
          .hero__subtitle {
            font-size: 0.95rem;
          }
          .hero__actions {
            flex-direction: column;
            align-items: center;
          }
          .hero__btn-primary,
          .hero__btn-ghost {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          .hero__stats {
            gap: 20px;
          }
          .hero__stat-num {
            font-size: 1.3rem;
          }
          .hero__logo-wrapper {
            max-width: 280px;
          }
          .hero__float-badge {
            font-size: 0.7rem;
            padding: 8px 12px;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
