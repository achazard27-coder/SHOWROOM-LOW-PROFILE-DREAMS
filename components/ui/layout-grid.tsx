"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LayoutGridCard = {
  id: number | string;
  content: ReactNode;
  className?: string;
  thumbnail: string;
  fullSrc?: string;
  srcSet?: string;
  alt: string;
  title?: string;
  sourceUrl?: string;
  sourceName?: string;
  kind?: 'showroom' | 'product';
};

export type Card = LayoutGridCard;

type LayoutGridProps = {
  cards: LayoutGridCard[];
  brandName: string;
  partnerHref: string;
  onOpenChange?: (open: boolean) => void;
};

function PhotoCredit({ card }: { card: LayoutGridCard }) {
  const label = card.sourceName || (card.kind === 'product' ? 'Catálogo oficial da marca' : 'Lowprofile & Dreams');
  return <span className="layout-photo-credit">{card.kind === 'product' ? 'Produto · ' : 'Showroom · '}{card.sourceUrl ? <a href={card.sourceUrl} target="_blank" rel="noopener noreferrer">{label} <ArrowUpRight size={11} aria-hidden="true" /></a> : label}</span>;
}

function ExpandedPhoto({ card, index, total, brandName, partnerHref, close, move }: {
  card: LayoutGridCard; index: number; total: number; brandName: string; partnerHref: string; close: () => void; move: (direction: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  const transition = reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 };
  return <motion.dialog ref={ref} className="layout-photo-dialog" aria-label={`Galeria de ${brandName}`} onCancel={event => { event.preventDefault(); close(); }}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}
    onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }}>
    <motion.div className="layout-photo-backdrop" onClick={close} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
    <button autoFocus type="button" className="layout-photo-close" onClick={close} aria-label="Fechar fotografia"><X size={25} /></button>
    <motion.div className="layout-photo-expanded" layoutId={reduced ? undefined : `card-${card.id}`} transition={transition}>
      <figure>
        <motion.img layoutId={reduced ? undefined : `image-${card.id}-image`} transition={transition} src={card.fullSrc || card.thumbnail} alt={card.alt} className="layout-photo-full" />
        <motion.figcaption key={card.id} layoutId={reduced ? undefined : `content-${card.id}`} initial={{ opacity: 0, y: reduced ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .25 }}>
          <div><div className="layout-photo-copy">{card.content}</div><PhotoCredit card={card} /></div>
          <span className="layout-photo-count" aria-live="polite">{index + 1} / {total}</span>
        </motion.figcaption>
      </figure>
      <div className="layout-photo-actions"><button type="button" aria-label="Foto anterior" onClick={() => move(-1)} disabled={total < 2}><ArrowLeft size={22} /></button><a href={partnerHref}>Seja parceiro <ArrowUpRight size={17} /></a><button type="button" aria-label="Próxima foto" onClick={() => move(1)} disabled={total < 2}><ArrowRight size={22} /></button></div>
    </motion.div>
  </motion.dialog>;
}

export function LayoutGrid({ cards, brandName, partnerHref, onOpenChange }: LayoutGridProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const id = useId();
  const open = (index: number) => { setLastSelected(selected); setSelected(index); onOpenChange?.(true); };
  const close = () => { setLastSelected(selected); setSelected(null); };
  const move = (direction: number) => { if (cards.length > 1) setSelected(index => ((index ?? 0) + direction + cards.length) % cards.length); };
  return <LayoutGroup id={id}>
    <div className="layout-photo-grid">
      {cards.map((card, index) => <motion.div key={card.id} layoutId={reduced ? undefined : `card-${card.id}`} className={cn('layout-photo-card', index % 4 === 0 || index % 4 === 3 ? 'layout-photo-wide' : '', card.className)} style={{ zIndex: lastSelected === index ? 2 : 1 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}>
        <button className="layout-photo-button" type="button" aria-label={'Ampliar: ' + card.alt} onClick={() => open(index)}>
          <motion.img layoutId={reduced ? undefined : `image-${card.id}-image`} src={card.thumbnail} srcSet={card.srcSet} sizes="(max-width: 760px) 100vw, 65vw" alt={card.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" width={1200} height={1600} />
          <span className="layout-photo-shade" />
          <motion.span layoutId={reduced ? undefined : `content-${card.id}`} className="layout-photo-label"><span>{card.title || 'Conheça a marca'}</span><ArrowUpRight size={20} aria-hidden="true" /></motion.span>
        </button>
        {(card.kind === 'product' || card.sourceUrl) && <div className="layout-card-credit"><PhotoCredit card={card} /></div>}
      </motion.div>)}
    </div>
    <AnimatePresence onExitComplete={() => onOpenChange?.(false)}>{selected !== null && cards[selected] && <ExpandedPhoto key="expanded-photo" card={cards[selected]} index={selected} total={cards.length} brandName={brandName} partnerHref={partnerHref} close={close} move={move} />}</AnimatePresence>
  </LayoutGroup>;
}
