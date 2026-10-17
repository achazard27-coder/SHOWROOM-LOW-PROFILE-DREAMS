import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronDown, Mail, Menu, X } from 'lucide-react';
import TiltedGridHero from '@/components/ui/tilted-grid-hero';
import { LayoutGrid, type LayoutGridCard } from '@/components/ui/layout-grid';
import { brandGalleries, homeGalleryPhotos, type BrandGallery } from './data/brand-gallery';
import { imageUrl, imageSet } from './data/gallery';
import PartnerForm from './PartnerForm';
import { getPageMeta, resolvePage } from './routing';

const brandHref = (brand: BrandGallery) => `/marcas/${brand.slug}/`;
const partnerHref = (brand?: BrandGallery) => '/seja-parceiro/' + (brand ? '?marca=' + encodeURIComponent(brand.slug) : '');
const aboutParagraphs = [
  'A Lowprofile & Dreams é referência em representação comercial de moda no Espírito Santo. Há mais de 23 anos, conectamos marcas de destaque nacional e internacional a lojistas multimarcas que buscam qualidade, estilo, diferenciação e novas oportunidades de negócio.',
  'Representamos um portfólio de 12 marcas de peso, com nomes ligados a grandes grupos da moda brasileira, como Grupo Soma, Grupo Dass e Grupo Grendene, além de marcas que são referência em seus segmentos.',
  'Com mais de 400 lojistas atendidos, construímos uma trajetória pautada pela credibilidade, pelo relacionamento e pelo conhecimento do mercado.',
  'Nosso portfólio reúne moda casual adulta e infantil, com opções nacionais e internacionais para diferentes perfis de público e posicionamentos de loja.',
  'Mais do que apresentar coleções, oferecemos uma curadoria de marcas pensada para conectar o seu negócio às tendências do mercado e às oportunidades do varejo de moda.',
];

function BrandLogo({ brand }: { brand: BrandGallery }) {
  const [broken, setBroken] = useState(false);
  return <>{!broken ? <img src={brand.logo} alt={brand.name} decoding="async" onError={() => setBroken(true)} /> : <span>{brand.name}</span>}{brand.caption && <span className="brand-caption">{brand.caption}</span>}</>;
}
function BrandGrid({ onChoose }: { onChoose?: () => void }) {
  return <div className="brand-grid">{brandGalleries.map((brand, i) => <a href={brandHref(brand)} key={brand.slug} className="brand-tile" onClick={onChoose}>
    <span className="tile-index">{String(i + 1).padStart(2, '0')}</span><div className="tile-logo"><BrandLogo brand={brand} /></div>
    <span className="tile-link"><span>{brand.name}</span><ArrowUpRight size={18} aria-hidden="true" /></span>
  </a>)}</div>;
}
function Modal({ label, onClose, children, className = '', onKeyDown }: { label: string; onClose: () => void; children: ReactNode; className?: string; onKeyDown?: (event: ReactKeyboardEvent<HTMLDialogElement>) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  return <dialog ref={ref} className={'site-dialog ' + className} aria-label={label} onKeyDown={onKeyDown} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="dialog-close" type="button" autoFocus onClick={onClose} aria-label="Fechar"><X size={24} /></button>{children}
  </dialog>;
}
function AboutSection({ standalone = false, openBrands }: { standalone?: boolean; openBrands: () => void }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section className={'about-section section-shell' + (standalone ? ' standalone' : '')} id="sobre-nos" aria-labelledby="about-title">
    <div className="about-intro"><p className="eyebrow">SOBRE NÓS / LOWPROFILE & DREAMS</p><Heading id="about-title">Mais de 23 anos conectando grandes marcas aos melhores lojistas do Espírito Santo.</Heading></div>
    <div className="about-body"><h3>Sua próxima grande marca começa aqui.</h3>{aboutParagraphs.map(text => <p key={text}>{text}</p>)}
      <p className="about-closing">Sua loja merece marcas que agregam valor. Nós ajudamos você a encontrá-las.</p>
      <button type="button" className="solid-button" onClick={openBrands}>QUERO CONHECER AS MARCAS <ArrowUpRight size={18} /></button>
    </div>
    <div className="about-numbers" aria-label="Nossa trajetória"><div><strong>23<span>+</span></strong><span>anos de história</span></div><div><strong>12</strong><span>marcas no portfólio</span></div><div><strong>400<span>+</span></strong><span>lojistas atendidos</span></div></div>
  </section>;
}
function PartnershipInvite() {
  return <section className="invite-section"><p className="eyebrow white">NOVAS CONEXÕES. NOVAS POSSIBILIDADES.</p><h2>Seja um lojista parceiro da Lowprofile & Dreams.</h2><p>Preencha o formulário e entre em contato com nossa equipe comercial.</p><a href="/seja-parceiro/">Seja parceiro <ArrowUpRight size={20} /></a></section>;
}

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const [location, setLocation] = useState(() => typeof window === 'undefined' ? initialPath : window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const brandsButtonRef = useRef<HTMLButtonElement>(null);
  const firstRoute = useRef(true);
  const page = resolvePage(location);
  const currentBrand = page.kind === 'brand' ? page.brand : undefined;
  const selectedBrand = page.kind === 'partner' ? brandGalleries.find(brand => brand.slug === new URLSearchParams(location.split('?')[1] || '').get('marca')) : currentBrand;
  const meta = getPageMeta(location);


  useEffect(() => {
    // Query-string context is applied after hydration of the static route.
    setLocation(window.location.pathname + window.location.search);
    const onPopState = () => setLocation(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => {
    setMenuOpen(false); setBrandsOpen(false); setSelectorOpen(false); setGalleryOpen(false);
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', meta.description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = meta.canonical;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.append(robots); }
    robots.content = meta.noindex ? 'noindex, follow' : 'index, follow';
    for (const [property, content] of [['og:title', meta.title], ['og:description', meta.description], ['og:url', meta.canonical]]) document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', content);
    if (firstRoute.current) { firstRoute.current = false; return; }
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [location, meta.title, meta.description, meta.canonical, meta.noindex]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); if (brandsOpen) { setBrandsOpen(false); brandsButtonRef.current?.focus(); } } };
    const outside = (event: PointerEvent) => { if (!menuRef.current?.contains(event.target as Node)) { setBrandsOpen(false); setMenuOpen(false); } };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); };
  }, [brandsOpen]);
  useEffect(() => {
    setFormVisible(false);
    const form = document.getElementById('contato');
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(form);
    return () => observer.disconnect();
  }, [location]);
  function navigate(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      setMenuOpen(false); setBrandsOpen(false); setSelectorOpen(false);
      if (!url.hash) { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'instant' }); }
      return;
    }
    event.preventDefault(); window.history.pushState({}, '', url.pathname + url.search + url.hash); setLocation(url.pathname + url.search);
  }
  const openBrands = () => { setBrandsOpen(false); setMenuOpen(false); setSelectorOpen(true); };

  return <div onClick={navigate}>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <header ref={menuRef} className="site-header">
      <div className="header-shell">
        <a href="/" className="logo-lockup" aria-label="Lowprofile & Dreams — início"><img src="/logo-lp.png" alt="LOW PROFILE + DREAMS" width={556} height={100} /></a>
        <nav className="desktop-links" aria-label="Navegação principal">
          <button ref={brandsButtonRef} type="button" className={'nav-brands' + (brandsOpen ? ' is-open' : '')} aria-expanded={brandsOpen} aria-controls="brand-mega-menu" onClick={() => setBrandsOpen(!brandsOpen)}>Marcas <ChevronDown size={14} /></button>
          <a href="/sobre-nos/" aria-current={page.kind === 'about' ? 'page' : undefined}>Sobre nós</a>
        </nav>
        <a className="header-contact" aria-current={page.kind === 'partner' ? 'page' : undefined} href={partnerHref(currentBrand)}>Seja parceiro <ArrowUpRight size={16} /></a>
        <button type="button" className="menu-toggle" onClick={() => { setMenuOpen(!menuOpen); setBrandsOpen(false); }} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {brandsOpen && <div id="brand-mega-menu" className="brand-mega-menu"><div className="mega-intro"><p className="eyebrow">NOSSO PORTFÓLIO</p><h2>Uma marca.<br />Novas possibilidades.</h2><a className="text-arrow" href="/marcas/">Explore todas as marcas <ArrowUpRight size={17} /></a></div><nav className="mega-brands" aria-label="Escolha uma marca">{brandGalleries.map((brand, i) => <a href={brandHref(brand)} key={brand.slug}><span className="mega-number">{String(i + 1).padStart(2, '0')}</span>{brand.name}<ArrowUpRight size={16} /></a>)}</nav></div>}
      {menuOpen && <Modal label="Navegação mobile" onClose={() => setMenuOpen(false)} className="mobile-drawer"><nav id="mobile-menu" className="mobile-links" aria-label="Navegação mobile"><details><summary>Marcas <ChevronDown size={18} /></summary><div className="mobile-brand-list">{brandGalleries.map(brand => <a href={brandHref(brand)} aria-current={currentBrand?.slug === brand.slug ? 'page' : undefined} key={brand.slug}>{brand.name}</a>)}</div><a href="/marcas/">Explore todas as marcas <ArrowUpRight size={18} /></a></details><a href="/sobre-nos/" aria-current={page.kind === 'about' ? 'page' : undefined}>Sobre nós <ArrowUpRight size={18} /></a><a href={partnerHref(currentBrand)} aria-current={page.kind === 'partner' ? 'page' : undefined}>Seja parceiro <ArrowUpRight size={18} /></a></nav></Modal>}
    </header>

    <main id="main" tabIndex={-1}>
      {page.kind === 'home' && <>
        <section className="hero" aria-labelledby="hero-title">
          {homeGalleryPhotos[4] && <img className="hero-photo" src={imageUrl(homeGalleryPhotos[4].url, 1600)} srcSet={imageSet(homeGalleryPhotos[4].url)} sizes="100vw" decoding="async" alt={homeGalleryPhotos[4].alt} {...{ fetchpriority: 'high' }} width={1200} height={1600} />}
          <div className="hero-shade" /><div className="hero-copy"><span className="eyebrow white">LOW PROFILE + DREAMS <span className="dash" /> VILA VELHA / ES</span><h1 id="hero-title">Referência de<br />moda no estado <em>ES.</em></h1><p>Há mais de 23 anos conectando marcas e lojistas no Espírito Santo.</p><div className="hero-actions"><a className="hero-button" href="/seja-parceiro/">Seja parceiro <ArrowUpRight size={18} /></a><a className="hero-secondary" href="#galeria">Conheça nosso universo <ArrowDown size={16} /></a></div></div>
          <div className="hero-footnote"><span>MODA, CURADORIA E RELACIONAMENTO</span><a href="#galeria" aria-label="Explorar galeria"><span>EXPLORAR</span><ArrowDown size={15} /></a></div>
        </section>
        <section className="showroom-section" id="galeria" aria-labelledby="gallery-title">
          <div className="section-shell showroom-heading"><div><p className="eyebrow">01 / NOSSO UNIVERSO</p><h2 id="gallery-title">Um encontro<br /><em>com a sua próxima marca.</em></h2></div><div className="showroom-pitch"><p>Um olhar por dentro da Lowprofile & Dreams. Conheça as marcas e descubra novas possibilidades para a sua loja.</p><span>Fotografias reais. Novas perspectivas para a sua loja.</span></div></div>
          <nav className="section-shell gallery-category-nav" aria-label="Explore a Lowprofile & Dreams"><button type="button" onClick={openBrands}><span>01</span> Marcas <ChevronDown size={17} /></button><a href="/sobre-nos/"><span>02</span> Sobre nós <ArrowUpRight size={17} /></a><a href="/seja-parceiro/"><span>03</span> Seja parceiro <ArrowUpRight size={17} /></a></nav>
          <TiltedGridHero images={homeGalleryPhotos.map(item => ({ src: imageUrl(item.url, 800), srcSet: imageSet(item.url), alt: item.alt }))} speed={5} tileHeight={59} aspectRatio={4 / 5} gap={9} axis={48} curve={70} fade={12} className="showroom-curved-gallery" />
          <div className="section-shell gallery-selector-action"><button className="solid-button" type="button" onClick={openBrands}>Veja a galeria completa <ArrowUpRight size={18} /></button><p>Escolha uma marca para explorar sua galeria.</p></div>
        </section>
        <section className="brands-section section-shell"><div className="section-head"><p className="eyebrow">02 / NOSSAS MARCAS</p><div className="section-heading-row"><h2>Identidades que<br />se conectam<span className="period">.</span></h2><p>Um portfólio de 12 marcas. Encontre as que fazem sentido para sua loja.</p></div></div><BrandGrid /></section>
        <AboutSection openBrands={openBrands} /><PartnershipInvite /><PartnerForm />
      </>}
      {page.kind === 'brands' && <section className="section-shell brands-page"><p className="eyebrow">PORTFÓLIO / 12 MARCAS</p><h1>Nossas marcas<span className="period">.</span></h1><p className="page-lead">Conheça cada marca de perto. Escolha uma para explorar a galeria e conversar com nossa equipe.</p><BrandGrid /><div className="page-bottom-link"><a href="/"> <ArrowLeft size={16} /> Voltar ao início</a><a href="/seja-parceiro/">Seja parceiro <ArrowUpRight size={16} /></a></div></section>}
      {page.kind === 'about' && <><AboutSection standalone openBrands={openBrands} /><PartnershipInvite /></>}
      {page.kind === 'partner' && <><section className="section-shell partner-page-intro"><p className="eyebrow">SEJA PARCEIRO</p><h1>Seja um lojista parceiro da Lowprofile & Dreams.</h1>{selectedBrand && <p className="brand-interest">Seu interesse: <strong>{selectedBrand.name}</strong> <a href={brandHref(selectedBrand)}>Voltar à marca <ArrowUpRight size={15} /></a></p>}<p>Preencha o formulário e entre em contato com nossa equipe comercial.</p></section><PartnerForm key={selectedBrand?.slug || 'portfolio'} brandName={selectedBrand?.name} /></>}
      {page.kind === 'brand' && <>
        <section className="section-shell brand-page-head"><nav className="breadcrumbs" aria-label="Você está aqui"><a href="/">Início</a><span>/</span><a href="/marcas/">Marcas</a><span>/</span><span aria-current="page">{page.brand.name}</span></nav>
          <div className="brand-page-heading"><div><p className="eyebrow">GALERIA DA MARCA</p><h1 className="brand-page-logo"><BrandLogo key={page.brand.slug} brand={page.brand} /></h1></div><div className="brand-page-pitch"><p>Conheça {page.brand.name} com a Lowprofile & Dreams.</p><a className="solid-button" href={partnerHref(page.brand)}>Seja parceiro <ArrowUpRight size={18} /></a><button className="text-button" type="button" onClick={openBrands}>Selecionar outra marca <ChevronDown size={16} /></button></div></div>
        </section>
        {page.brand.photos.length > 0 ? <section className="section-shell brand-photo-section" aria-label={'Fotografias de ' + page.brand.name}><LayoutGrid key={page.brand.slug} brandName={page.brand.name} partnerHref={partnerHref(page.brand)} onOpenChange={setGalleryOpen} cards={page.brand.photos.map((item, index) => {
            const photo = item as typeof item & Pick<LayoutGridCard, 'title' | 'sourceUrl' | 'sourceName' | 'kind'>;
            return { id: `${page.brand.slug}-${index}`, thumbnail: imageUrl(photo.url, 1200), fullSrc: imageUrl(photo.url, 1600), srcSet: imageSet(photo.url), alt: photo.alt, title: photo.title || photo.label, content: <p>{photo.title || photo.label}</p>, sourceUrl: photo.sourceUrl, sourceName: photo.sourceName, kind: photo.kind || 'showroom' };
          })} /><p className="photo-help">Toque em uma foto para ampliar. Fotos de showroom e referências dos catálogos das marcas; consulte nossa equipe sobre coleções e disponibilidade.</p></section> : <section className="section-shell"><div className="empty-brand-gallery"><p className="eyebrow">EM BREVE</p><h2>As imagens desta marca serão disponibilizadas em breve.</h2><p>Nossa equipe pode apresentar as coleções e as oportunidades de {page.brand.name} para sua loja.</p><a className="solid-button" href={partnerHref(page.brand)}>Conhecer as coleções <ArrowUpRight size={18} /></a></div></section>}
        <div className="section-shell brand-page-bottom"><a className="text-arrow" href="/marcas/"><ArrowLeft size={18} /> Todas as marcas</a><button className="text-button" type="button" onClick={openBrands}>Selecionar outra marca <ArrowUpRight size={18} /></button></div>
        <section className="brand-partner-band section-shell"><div><p className="eyebrow">PARA SUA LOJA</p><h2>Uma nova conexão<br />começa aqui.</h2></div><a className="solid-button" href={partnerHref(page.brand)}>Seja parceiro de {page.brand.name} <ArrowUpRight size={18} /></a></section>
      </>}
      {page.kind === 'notfound' && <section className="section-shell not-found"><p className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</p><h1>Vamos encontrar<br />um novo caminho.</h1><p>Esta página não está disponível. Explore nosso portfólio para encontrar a marca que procura.</p><a className="solid-button" href="/marcas/">Conheça nossas marcas <ArrowUpRight size={18} /></a><a className="text-button" href="/"> <ArrowLeft size={16} /> Voltar ao início</a></section>}
    </main>

    <footer className="footer"><div className="section-shell"><div className="footer-upper"><div><a href="/"><img src="/logo-lp.png" alt="Low Profile + Dreams — início" width={556} height={100} /></a><p>Representação de moda. Espírito Santo.</p></div><nav className="footer-links" aria-label="Navegação do rodapé"><a href="/marcas/">Marcas <ArrowUpRight size={14} /></a><a href="/sobre-nos/">Sobre nós <ArrowUpRight size={14} /></a><a href="/seja-parceiro/">Seja parceiro <ArrowUpRight size={14} /></a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} LOW PROFILE + DREAMS</span><span>VILA VELHA / ES</span><a href="mailto:low.dreams@hotmail.com" aria-label="Enviar e-mail"><Mail size={18} /></a></div><details id="privacidade" className="privacy-info"><summary>Privacidade e dados</summary><p>As informações deste cadastro são destinadas exclusivamente ao contato comercial com lojistas. A política definitiva, o canal do titular e os prazos de retenção devem ser definidos pela empresa.</p></details></div></footer>
    <a className={'partner-sticky' + (formVisible || selectorOpen || galleryOpen || menuOpen ? ' sticky-hidden' : '')} href={partnerHref(currentBrand)}><span>{currentBrand ? 'Gostou de ' + currentBrand.name + '?' : 'Sua próxima grande marca começa aqui.'}</span><strong>Seja parceiro <ArrowUpRight size={18} /></strong></a>

    {selectorOpen && <Modal label="Escolha uma marca para ver sua galeria" onClose={() => setSelectorOpen(false)} className="brand-selector"><p className="eyebrow">GALERIA COMPLETA</p><h2>Qual marca você<br />quer conhecer?</h2><p>Escolha uma marca e explore a sua galeria.</p><BrandGrid onChoose={() => setSelectorOpen(false)} /></Modal>}

  </div>;
}
