import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = { children: ReactNode; gap?: number; className?: string };

export function InfiniteSlider({ children, gap = 32, className }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const touchStart = useRef<number | null>(null);
  const width = useRef(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stop = paused || hovered || focused || reduced;

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const element = group.current;
    if (!element) return;
    const observer = new ResizeObserver(() => { width.current = element.getBoundingClientRect().width; });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stop) return;
    let frame = 0, previous = 0;
    const tick = (time: number) => {
      const distance = width.current;
      if (distance && track.current) {
        if (previous && !stop && !document.hidden) position.current += Math.min(time - previous, 64) * 0.032;
        position.current = ((position.current % distance) + distance) % distance;
        track.current.style.transform = `translate3d(${-position.current}px,0,0)`;
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stop]);

  const move = (direction: number) => {
    setPaused(true);
    const card = group.current?.firstElementChild as HTMLElement | null;
    position.current += direction * ((card?.offsetWidth ?? 220) + gap);
    const distance = width.current;
    if (distance && track.current) {
      position.current = ((position.current % distance) + distance) % distance;
      track.current.style.transform = `translate3d(${-position.current}px,0,0)`;
    }
  };

  return <div className={cn('logo-carousel', className)} role="region" aria-label="Marcas representadas"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    <div className="logo-viewport" onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStart.current === null) return;
        const delta = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 30) move(delta > 0 ? 1 : -1);
        touchStart.current = null;
      }}>
      <div ref={track} className="logo-track">
        <div ref={group} className="logo-group" style={{ gap, paddingRight: gap }}>{children}</div>
        <div className="logo-group" style={{ gap, paddingRight: gap }} aria-hidden="true">{children}</div>
      </div>
    </div>
    <div className="carousel-controls">
      <span>Explore nossas marcas</span>
      <button type="button" onClick={() => move(-1)} aria-label="Ver marcas anteriores"><ArrowLeft size={18}/></button>
      <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused || reduced} disabled={reduced} aria-label={paused ? 'Reproduzir carrossel' : 'Pausar carrossel'}>{paused || reduced ? <Play size={16}/> : <Pause size={16}/>}</button>
      <button type="button" onClick={() => move(1)} aria-label="Ver próximas marcas"><ArrowRight size={18}/></button>
    </div>
  </div>;
}
