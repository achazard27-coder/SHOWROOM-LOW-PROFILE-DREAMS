"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

type Props = {
  images: { src: string; alt: string; srcSet?: string }[];
  speed?: number; tileHeight?: number; aspectRatio?: number; gap?: number;
  axis?: number; curve?: number; fade?: number; className?: string;
};

export default function TiltedGridHero({ images, speed = 5, className = '' }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setDesktop(wide.matches); setReduced(motion.matches); };
    update(); wide.addEventListener('change', update); motion.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (viewport.current) observer.observe(viewport.current);
    return () => { wide.removeEventListener('change', update); motion.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  const scroll = (direction: number) => viewport.current?.scrollBy({ left: direction * viewport.current.clientWidth * .75, behavior: reduced ? 'instant' : 'smooth' });
  const group = (duplicate: boolean) => <div className="tgh-group" aria-hidden={duplicate || undefined} key={duplicate ? 'loop' : 'original'}>{images.map((image, index) => <figure className="tgh-card" key={index}><img src={image.src} srcSet={image.srcSet} sizes="(min-width: 1024px) 360px, 72vw" alt={duplicate ? '' : image.alt} width={800} height={1000} loading="lazy" decoding="async" /></figure>)}</div>;
  return <div className={'tgh-root ' + className}>
    <div ref={viewport} className="tgh-viewport" role="region" aria-label="Fotografias do showroom" tabIndex={0} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocus={() => setInteracting(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className={'tgh-track' + (desktop ? ' tgh-loop' : '')} style={{ animationDuration: `${Math.max(images.length * speed, 40)}s`, animationPlayState: paused || reduced || !visible || interacting ? 'paused' : 'running' }}>{group(false)}{desktop && group(true)}</div>
    </div>
    <div className="tgh-controls"><div className="tgh-scroll-controls"><button type="button" onClick={() => scroll(-1)} aria-label="Fotografias anteriores"><ArrowLeft size={20} /></button><button type="button" onClick={() => scroll(1)} aria-label="Próximas fotografias"><ArrowRight size={20} /></button></div><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused || reduced} disabled={reduced}>{paused || reduced ? <Play size={18} /> : <Pause size={18} />}{paused || reduced ? 'Reproduzir' : 'Pausar'}</button></div>
  </div>;
}
