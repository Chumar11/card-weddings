import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const WEDDING_DATE = new Date('2026-11-14T20:00:00+05:00');

const copy = {
  en: {
    language: 'Urdu', open: 'Tap to open', invitation: 'You are invited',
    welcome: 'We are honoured to welcome you to the wedding ceremony of',
    son: 'The Groom · Imam Imran Butt', daughter: 'The Bride · Aneeqa Nabeel Butt',
    scroll: 'Scroll to discover', story: 'Two hearts, one promise',
    storyText: 'With joyful hearts and the blessings of our families, we invite you to celebrate the beginning of our forever.',
    forever: 'Our forever begins', invited: "You're invited", date: 'November 14, 2026',
    day: 'Saturday · 8:00 PM', days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    timeline: 'Baraat Timeline', events: 'Wedding Events', venue: 'The Celebration',
    venueText: 'Dynasty Hall 21 · Garrison Golf & Country Club', venueSub: 'Saddar Town, Lahore',
    message: 'Send a Message', name: 'Your Name', namePlaceholder: 'Your full name', contacts: 'R.S.V.P. Contacts',
    attending: 'Will you be attending?', choose: 'Select an option', yes: 'Joyfully attending', no: 'Unable to attend',
    wishes: 'Your Message', wishesPlaceholder: 'Write your wishes…', send: 'Send Message',
    thanks: 'Thank you! Your wishes have been received.', footer: 'We cannot wait to celebrate with you',
    scratch: 'Scratch the heart to reveal the date', revealed: 'Keep scratching…', completeScratch: 'The date is yours — with love',
  },
  ur: {
    language: 'English', open: 'کھولنے کے لیے چھوئیں', invitation: 'آپ مدعو ہیں',
    welcome: 'ہمیں اپنی شادی کی تقریب میں آپ کا استقبال کرتے ہوئے خوشی ہوگی',
    son: 'دولہا · امام عمران بٹ', daughter: 'دلہن · انیقہ نبیل بٹ',
    scroll: 'مزید دیکھنے کے لیے اسکرول کریں', story: 'دو دل، ایک وعدہ',
    storyText: 'خوشیوں بھرے دل اور اپنے خاندانوں کی دعاؤں کے ساتھ، ہم آپ کو اپنی نئی زندگی کے آغاز کی خوشی میں مدعو کرتے ہیں۔',
    forever: 'ہمیشہ کا سفر شروع ہوتا ہے', invited: 'آپ مدعو ہیں', date: '14 نومبر، 2026',
    day: 'ہفتہ · رات 8 بجے', days: 'دن', hours: 'گھنٹے', minutes: 'منٹ', seconds: 'سیکنڈ',
    timeline: 'بارات کا پروگرام', events: 'شادی کی تقریبات', venue: 'جشن کی جگہ',
    venueText: 'ڈائنیسٹی ہال 21 · گیریژن گالف اینڈ کنٹری کلب', venueSub: 'صدر ٹاؤن، لاہور',
    message: 'پیغام بھیجیں', name: 'آپ کا نام', namePlaceholder: 'اپنا پورا نام لکھیں', contacts: 'رابطہ برائے شرکت',
    attending: 'کیا آپ تقریب میں شریک ہوں گے؟', choose: 'ایک آپشن منتخب کریں', yes: 'خوشی سے شریک ہوں گے', no: 'شریک نہیں ہو سکیں گے',
    wishes: 'آپ کا پیغام', wishesPlaceholder: 'اپنی نیک تمنائیں لکھیں…', send: 'پیغام بھیجیں',
    thanks: 'شکریہ! آپ کی نیک تمنائیں موصول ہوگئی ہیں۔', footer: 'ہم آپ کے ساتھ جشن منانے کے منتظر ہیں',
    scratch: 'تاریخ دیکھنے کے لیے دل کو کھرچیں', revealed: 'کچھ اور کھرچیں…', completeScratch: 'محبت کے ساتھ، تاریخ آپ کی ہوئی',
  },
};

const schedule = {
  en: [
    { time: '08:00 PM', title: 'Dinner', note: 'Dinner will be served' },
    { time: '10:00 PM', title: 'Rukhsati', note: 'With prayers for a beautiful new beginning' },
  ],
  ur: [
    { time: 'رات 08:00', title: 'عشائیہ', note: 'مہمانوں کے لیے کھانا پیش کیا جائے گا' },
    { time: 'رات 10:00', title: 'رخصتی', note: 'ایک خوبصورت نئے سفر کے لیے دعاؤں کے ساتھ' },
  ],
};

const events = {
  en: [
    { name: 'Nikkah & Mehndi', date: 'November 13, 2026', place: 'With family and friends' },
    { name: 'Baraat', date: 'November 14, 2026 · Dinner 8:00 PM', place: 'Dynasty Hall 21, Garrison Golf & Country Club' },
  ],
  ur: [
    { name: 'نکاح اور مہندی', date: '13 نومبر، 2026', place: 'خاندان اور دوستوں کے ساتھ' },
    { name: 'بارات', date: '14 نومبر، 2026 · عشائیہ رات 8 بجے', place: 'ڈائنیسٹی ہال 21، گیریژن گالف اینڈ کنٹری کلب' },
  ],
};

function getCountdown() {
  const distance = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(distance / 86400000), hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60), seconds: Math.floor((distance / 1000) % 60),
  };
}

function traceHeart(ctx) {
  const { width: w, height: h } = ctx.canvas;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.93);
  ctx.bezierCurveTo(w * 0.42, h * 0.82, w * 0.08, h * 0.62, w * 0.08, h * 0.32);
  ctx.bezierCurveTo(w * 0.08, h * 0.08, w * 0.37, h * 0.02, w * 0.5, h * 0.27);
  ctx.bezierCurveTo(w * 0.63, h * 0.02, w * 0.92, h * 0.08, w * 0.92, h * 0.32);
  ctx.bezierCurveTo(w * 0.92, h * 0.62, w * 0.58, h * 0.82, w * 0.5, h * 0.93);
  ctx.closePath();
}

function ScratchHeart({ t, language }) {
  const canvasRef = useRef(null);
  const draggingRef = useRef(false);
  const lastPointRef = useRef(null);
  const basePixelsRef = useRef(1);
  const moveCountRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    traceHeart(ctx);
    ctx.save();
    ctx.clip();
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a85268');
    gradient.addColorStop(0.48, '#7c243e');
    gradient.addColorStop(1, '#541126');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.22;
    ctx.fillStyle = '#f6d9be';
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        const x = 45 + col * 68 + (row % 2) * 22;
        const y = 48 + row * 68;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x - 12, y); ctx.quadraticCurveTo(x, y - 14, x + 12, y);
        ctx.quadraticCurveTo(x, y + 14, x - 12, y); ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#f3d6ad';
    ctx.textAlign = 'center';
    ctx.font = '600 24px Montserrat, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(language === 'ur' ? 'SCRATCH' : 'SCRATCH TO REVEAL', canvas.width / 2, canvas.height * 0.5);
    ctx.font = '42px Georgia, serif';
    ctx.fillText('♥', canvas.width / 2, canvas.height * 0.61);
    ctx.restore();

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let opaque = 0;
    for (let index = 3; index < pixels.length; index += 4) if (pixels[index] > 10) opaque += 1;
    basePixelsRef.current = opaque;
    setProgress(0); setRevealed(false); setComplete(false);
  }, [language]);

  const pointFromEvent = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const measureProgress = () => {
    if (complete) return;
    const canvas = canvasRef.current;
    const pixels = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
    let remaining = 0;
    for (let index = 3; index < pixels.length; index += 4) if (pixels[index] > 10) remaining += 1;
    const amount = Math.min(100, Math.round((1 - remaining / basePixelsRef.current) * 100));
    setProgress(amount);
    if (amount >= 12) setRevealed(true);
    if (amount >= 68) {
      setComplete(true);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const scratchTo = (point, fromPoint = point) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 72;
    ctx.beginPath();
    ctx.moveTo(fromPoint.x, fromPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(point.x, point.y, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const handlePointerDown = (event) => {
    if (complete) return;
    event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointFromEvent(event);
    lastPointRef.current = point;
    scratchTo(point);
    measureProgress();
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current || complete) return;
    event.preventDefault();
    const point = pointFromEvent(event);
    scratchTo(point, lastPointRef.current || point);
    lastPointRef.current = point;
    moveCountRef.current += 1;
    if (moveCountRef.current % 3 === 0) measureProgress();
  };

  const stopScratching = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    lastPointRef.current = null;
    measureProgress();
  };

  const revealAll = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    setProgress(100); setRevealed(true); setComplete(true);
  };

  return (
    <div className={`scratch-experience ${revealed ? 'is-revealed' : ''} ${complete ? 'is-complete' : ''}`}>
      <div className={`scratch-flower-rain ${complete ? 'is-active' : ''}`} aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <i key={index} style={{ '--x': `${(index * 41) % 101}%`, '--delay': `${(index % 8) * 0.16}s`, '--drift': `${(index % 2 ? 1 : -1) * (24 + (index % 5) * 9)}px` }} />
        ))}
      </div>
      <div className="scratch-heart-shell">
        <div className="heart-date-content">
          <span>{t.invited}</span><strong>{t.date}</strong><small>{t.day}</small>
        </div>
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          width="680"
          height="600"
          role="button"
          tabIndex="0"
          aria-label={t.scratch}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopScratching}
          onPointerCancel={stopScratching}
          onPointerLeave={stopScratching}
          onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') revealAll(); }}
        />
        <svg className="scratch-heart-outline" viewBox="0 0 680 600" aria-hidden="true">
          <path d="M340 558 C286 492 54 372 54 192 C54 48 252 12 340 162 C428 12 626 48 626 192 C626 372 394 492 340 558 Z" />
        </svg>
      </div>
      <p className="scratch-instruction" aria-live="polite">
        {complete ? t.completeScratch : revealed ? `${t.revealed} ${progress}%` : t.scratch}
      </p>
      {!complete && <div className="scratch-progress"><i style={{ width: `${progress}%` }} /></div>}
    </div>
  );
}

function OpeningFireworks({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    let frameId;
    let particles = [];
    let burstIndex = 0;
    const startedAt = performance.now();
    const palette = ['#7b1833', '#a93f58', '#d9979f', '#f5dfc3', '#d5a34d'];
    const bursts = [
      { delay: 0, x: 0.16, y: 0.2, scale: 1.08 },
      { delay: 0, x: 0.84, y: 0.22, scale: 1.08 },
      { delay: 70, x: 0.5, y: 0.12, scale: 1.2 },
      { delay: 190, x: 0.3, y: 0.38, scale: 0.92 },
      { delay: 230, x: 0.7, y: 0.37, scale: 0.92 },
      { delay: 390, x: 0.1, y: 0.53, scale: 0.8 },
      { delay: 420, x: 0.9, y: 0.52, scale: 0.8 },
      { delay: 560, x: 0.42, y: 0.25, scale: 1 },
      { delay: 620, x: 0.62, y: 0.28, scale: 1 },
      { delay: 760, x: 0.23, y: 0.16, scale: 0.88 },
      { delay: 790, x: 0.78, y: 0.15, scale: 0.88 },
      { delay: 900, x: 0.5, y: 0.48, scale: 1.15 },
    ];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.35 : 1.75);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createBurst = ({ x, y, scale = 1 }, burstNumber) => {
      const originX = window.innerWidth * x;
      const originY = window.innerHeight * y;
      const count = window.innerWidth < 600 ? 44 : 62;
      const offset = (burstNumber % 2) * 0.08;
      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count + offset;
        const speed = (2.5 + Math.random() * 3.8) * scale;
        particles.push({
          x: originX, y: originY, previousX: originX, previousY: originY,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, decay: 0.018 + Math.random() * 0.012,
          size: 1.1 + Math.random() * 1.5,
          color: palette[(index + burstNumber) % palette.length],
        });
      }
    };

    const animate = (now) => {
      const elapsed = now - startedAt;
      while (burstIndex < bursts.length && elapsed >= bursts[burstIndex].delay) {
        createBurst(bursts[burstIndex], burstIndex);
        burstIndex += 1;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.previousX = particle.x;
        particle.previousY = particle.y;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.975;
        particle.vy = particle.vy * 0.975 + 0.055;
        particle.life -= particle.decay;
        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, particle.life);
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size;
        ctx.beginPath();
        ctx.moveTo(particle.previousX, particle.previousY);
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();
      }
      ctx.restore();

      if (elapsed < 1500 || particles.length) frameId = window.requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);
    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="opening-fireworks" aria-hidden="true" />;
}

function App() {
  const previewMode = new URLSearchParams(window.location.search).get('preview');
  const [opening, setOpening] = useState(() => previewMode === 'fireworks');
  const [opened, setOpened] = useState(() => ['open', 'date'].includes(new URLSearchParams(window.location.search).get('preview')));
  const [language, setLanguage] = useState('en');
  const [soundOn, setSoundOn] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef(null);
  const t = copy[language];
  const currentSchedule = useMemo(() => schedule[language], [language]);
  const currentEvents = useMemo(() => events[language], [language]);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  useEffect(() => {
    if (!opened || !window.location.hash) return undefined;
    const timer = window.setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
        if (target.classList.contains('reveal')) target.classList.add('is-visible');
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
        window.setTimeout(() => { document.documentElement.style.scrollBehavior = previousBehavior; }, 40);
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [opened]);

  useEffect(() => {
    if (!opened) return undefined;
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.15 }
    );
    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((node) => revealObserver.observe(node));
    return () => { window.clearInterval(interval); revealObserver.disconnect(); };
  }, [opened]);

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setSoundOn(false);
  };

  useEffect(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/audio/wedding-song.mp3`);
    audio.loop = true;
    audio.volume = 0.42;
    audio.preload = 'auto';
    audioRef.current = audio;

    const playFromLandingPage = () => {
      audio.play()
        .then(() => setSoundOn(true))
        .catch(() => setSoundOn(false));
    };

    playFromLandingPage();
    window.addEventListener('pointerdown', playFromLandingPage, { once: true });
    window.addEventListener('keydown', playFromLandingPage, { once: true });

    return () => {
      window.removeEventListener('pointerdown', playFromLandingPage);
      window.removeEventListener('keydown', playFromLandingPage);
      audio.pause();
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, []);

  const startMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio(`${process.env.PUBLIC_URL}/audio/wedding-song.mp3`);
      audio.loop = true;
      audio.volume = 0.42;
      audio.preload = 'auto';
      audioRef.current = audio;
    }
    audioRef.current.play()
      .then(() => setSoundOn(true))
      .catch(() => setSoundOn(false));
  };

  const handleOpen = () => {
    if (opening) return;
    setOpening(true); startMusic();
    window.setTimeout(() => { setOpened(true); window.scrollTo(0, 0); }, 1250);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); setSubmitted(true); event.currentTarget.reset();
  };

  if (!opened) {
    return (
      <main className={`invitation-cover ${opening ? 'is-opening' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
        <div className="cover-grain" />
        <OpeningFireworks active={opening} />
        <button className="cover-language" onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}>{t.language}</button>
        <div className="cover-copy"><span className="cover-kicker">Aneeqa &amp; Imam</span><span className="cover-date">14 · 11 · 2026</span></div>
        <button className="envelope-button" onClick={handleOpen} aria-label={t.open}>
          <span className="envelope-shadow" /><span className="envelope-back" />
          <span className="letter-card"><span className="letter-monogram">A <i>&amp;</i> I</span><span>{t.invitation}</span></span>
          <span className="envelope-flap" /><span className="envelope-front" />
          <span className="wax-seal"><b>A</b><small>&amp;</small><b>I</b></span>
        </button>
        <button className="tap-prompt" onClick={handleOpen}><span className="tap-spark">✦</span>{opening ? 'Opening…' : t.open}</button>
        <p className="cover-note">A celebration written in the stars</p>
      </main>
    );
  }

  return (
    <div className={`wedding-app ${language === 'ur' ? 'urdu' : ''} ${previewMode === 'date' ? 'date-preview' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <div className="floating-controls" dir="ltr">
        <button onClick={() => (soundOn ? stopMusic() : startMusic())} aria-label={soundOn ? 'Mute music' : 'Play music'}>{soundOn ? '♪' : '♩'}</button>
        <button className="language-pill" onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}>{t.language}</button>
      </div>

      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="petals" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
        <div className="hero-content">
          <p className="eyebrow">{t.welcome}</p><div className="heart-mark">♥</div>
          <h1><span>Aneeqa</span><em>&amp;</em><span>Imam</span></h1>
          <div className="family-grid"><p>{t.son}</p><i>— ♥ —</i><p>{t.daughter}</p></div>
          <a href="#story" className="scroll-cue"><span>{t.scroll}</span><i>⌄</i></a>
        </div>
      </section>

      <section id="story" className="story-section paper-section">
        <div className="ornament reveal">❦</div><p className="section-kicker reveal">Aneeqa &amp; Imam</p>
        <h2 className="script-heading reveal">{t.story}</h2><p className="story-copy reveal">{t.storyText}</p>
        <div className="signature reveal">A <span>&amp;</span> I</div>
      </section>

      <section id="date" className="date-section paper-section">
        <div className="date-card reveal"><span className="tiny-heart">♥</span><h2>{t.forever}</h2>
          <ScratchHeart t={t} language={language} />
        </div>
      </section>

      <section className="countdown-section paper-section">
        <div className="countdown reveal">
          {[["days", t.days], ["hours", t.hours], ["minutes", t.minutes], ["seconds", t.seconds]].map(([key, label]) => (
            <div className="countdown-unit" key={key}><strong>{String(countdown[key]).padStart(2, '0')}</strong><span>{label}</span></div>
          ))}
        </div>
        <div className="timeline-wrap reveal"><div className="section-icon">◷</div><h2 className="script-heading">{t.timeline}</h2>
          <div className="timeline">{currentSchedule.map((item) => (
            <article key={item.title}><span className="timeline-dot" /><time>{item.time}</time><h3>{item.title}</h3><p>{item.note}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="events-section paper-section"><div className="reveal"><div className="section-icon">✧</div><h2 className="script-heading">{t.events}</h2>
        <div className="event-grid">{currentEvents.map((item, index) => (
          <article key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><time>{item.date}</time><p>{item.place}</p></article>
        ))}</div>
      </div></section>



      <section className="venue-section"><div className="venue-content reveal"><p className="section-kicker">14 · 11 · 2026</p>
        <h2 className="script-heading">{t.venue}</h2><strong>{t.venueText}</strong><p>{t.venueSub}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=Garrison+Golf+and+Country+Club+Saddar+Town+Lahore" target="_blank" rel="noreferrer">View location <span>↗</span></a>
      </div></section>

      <section className="rsvp-section paper-section"><div className="rsvp-card reveal"><div className="section-icon">✉</div>
        <p className="section-kicker">R.S.V.P.</p><h2 className="script-heading">{t.message}</h2>
        <p className="contact-heading">{t.contacts}</p>
        <div className="rsvp-contacts">
          <a href="tel:+923009417029"><span>Nabeel Butt</span><strong>0300-9417029</strong></a>
          <a href="tel:+923211014021"><span>Haris Butt</span><strong>0321-1014021</strong></a>
        </div>
        {submitted ? <div className="success-message" role="status"><span>♥</span><p>{t.thanks}</p><button type="button" onClick={() => setSubmitted(false)}>Send another</button></div> : (
          <form onSubmit={handleSubmit}>
            <label>{t.name}<input type="text" name="name" placeholder={t.namePlaceholder} required /></label>
            <label>{t.attending}<select name="attending" defaultValue="" required><option value="" disabled>{t.choose}</option><option value="yes">{t.yes}</option><option value="no">{t.no}</option></select></label>
            <label>{t.wishes}<textarea name="message" rows="4" placeholder={t.wishesPlaceholder} required /></label>
            <button type="submit">{t.send} <span>→</span></button>
          </form>
        )}
      </div></section>

      <footer><span className="footer-monogram">A <i>&amp;</i> I</span><p>{t.footer}</p><small>November 14, 2026 · Lahore</small></footer>
    </div>
  );
}

export default App;
