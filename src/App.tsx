import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Instagram, MapPin, Menu, X } from 'lucide-react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { brands, type Brand } from './data/brands';
import { spaces, realPhotos, galleryUsesRealPhotos, type SpaceId } from './data/gallery';

function formatCnpj(input: string) {
  const n = input.replace(/\D/g, '').slice(0, 14);
  return n.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
}

function validCnpj(input: string) {
  const v = input.replace(/\D/g, '');
  if (v.length !== 14 || /^(\d)\1{13}$/.test(v)) return false;
  const calc = (length: number) => {
    let pos = length - 7, sum = 0;
    for (let i = length; i >= 1; i--) {
      sum += Number(v[length - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  return calc(12) === Number(v[12]) && calc(13) === Number(v[13]);
}

function formatPhone(input: string) {
  const n = input.replace(/\D/g, '').slice(0, 11);
  if (n.length <= 2) return n ? '(' + n : '';
  if (n.length <= 6) return '(' + n.slice(0, 2) + ') ' + n.slice(2);
  const split = n.length === 11 ? 7 : 6;
  return '(' + n.slice(0, 2) + ') ' + n.slice(2, split) + '-' + n.slice(split);
}

function BrandCard({ brand }: { brand: Brand }) {
  const [broken, setBroken] = useState(false);
  const src = brand.logo || (brand.domain
    ? 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(brand.domain) + '&sz=256'
    : '');

  return (
    <div className="brand-card" aria-label={brand.name}>
      {src && !broken && <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} />}
      <span className={brand.small ? 'brand-name small' : 'brand-name'}>{brand.name}</span>
    </div>
  );
}

function App() {
  const [activeSpace, setActiveSpace] = useState<SpaceId>('dreams');
  const [activePhoto, setActivePhoto] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formNotice, setFormNotice] = useState('');

  const currentSpace = spaces.find((s) => s.id === activeSpace) ?? spaces[0];
  const photos = currentSpace.photos;
  const currentImage = photos[activePhoto] ?? photos[0];
  const illustrative = realPhotos[activeSpace].length === 0;

  function setSpace(id: SpaceId) {
    setActiveSpace(id);
    setActivePhoto(0);
  }

  function movePhoto(offset: number) {
    setActivePhoto((p) => (p + offset + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowRight') movePhoto(1);
      if (e.key === 'ArrowLeft') movePhoto(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen, photos.length]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!validCnpj(cnpj)) {
      setStatus('error');
      setFormNotice('Confira o CNPJ informado.');
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10 && digits.length !== 11) {
      setStatus('error');
      setFormNotice('Informe um telefone com DDD válido.');
      return;
    }
    if (!data.get('consentimento')) {
      setStatus('error');
      setFormNotice('Precisamos da autorização para entrar em contato.');
      return;
    }
    setStatus('sending');
    setFormNotice('Enviando cadastro...');
    try {
      const body = new URLSearchParams();
      body.set('form-name', 'lojistas');
      for (const [key, value] of data.entries()) body.set(key, String(value));
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (!response.ok) throw new Error('Erro de recebimento');
      setStatus('success');
      setFormNotice('Cadastro enviado. Nossa equipe entrará em contato.');
      form.reset();
      setCnpj('');
      setPhone('');
    } catch {
      setStatus('error');
      setFormNotice('Não foi possível enviar. Tente novamente ou escreva para low.dreams@hotmail.com.');
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-shell">
          <a href="#inicio" aria-label="Low Profile + Dreams - início" className="logo-lockup" onClick={() => setMenuOpen(false)}>
            <img src="/logo-lp.png" alt="LOW PROFILE + DREAMS" />
          </a>
          <nav className="desktop-links" aria-label="Navegação principal">
            <a href="#espacos">Espaços</a>
            <a href="#marcas">Marcas</a>
            <a href="#sobre">O showroom</a>
          </nav>
          <a className="header-contact" href="#contato">Seja um parceiro <ArrowUpRight size={15} strokeWidth={1.65} /></a>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        {menuOpen && <nav className="mobile-links" aria-label="Navegação mobile">
          {[['Espaços', '#espacos'], ['Marcas', '#marcas'], ['O showroom', '#sobre'], ['Seja um parceiro', '#contato']].map(([name, href]) =>
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{name}<ArrowUpRight size={18} /></a>
          )}
        </nav>}
      </header>

      <main id="main">
        <section id="inicio" className="hero">
          <img className="hero-photo" src={spaces[0].photos[0].url} alt={spaces[0].photos[0].alt} />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="eyebrow white">LOW PROFILE + DREAMS <span className="dash" /> VILA VELHA / ES</span>
            <h1>Referência de<br />moda no estado <em>ES.</em></h1>
            <p>Uma vitrine de marcas, espaços e conexões para lojistas.</p>
            <a className="hero-button" href="#espacos">Conheça o showroom <ArrowUpRight size={18} /></a>
          </div>
          <div className="hero-footnote">
            <span>{galleryUsesRealPhotos ? 'LOW PROFILE + DREAMS / GALERIA' : 'WIREFRAME · FOTOS ILUSTRATIVAS'}</span>
            <a href="#espacos" aria-label="Explorar os espaços"><span>EXPLORAR</span><ArrowDown size={15} /></a>
          </div>
        </section>

        <section id="espacos" className="section-shell spaces-section">
          <div className="section-head">
            <p className="eyebrow">01 / GALERIA</p>
            <div className="section-heading-row">
              <h2>Nossos espaços<span className="period">.</span></h2>
              <p>Explore os ambientes onde as marcas encontram novos parceiros.</p>
            </div>
          </div>

          <div className="space-tabs" role="tablist" aria-label="Escolha um espaço">
            {spaces.map((space, index) =>
              <button key={space.id} type="button" role="tab" aria-selected={activeSpace === space.id} onClick={() => setSpace(space.id)} className={'space-tab ' + (activeSpace === space.id ? 'selected' : '')}>
                <span className="tab-number">{String(index + 1).padStart(2, '0')}</span> {space.title}
                <ArrowUpRight size={16} />
              </button>
            )}
          </div>

          <div className="gallery-photos">
            <button type="button" className="gallery-main" onClick={() => { setActivePhoto(0); setModalOpen(true); }} aria-label={'Ampliar imagem principal de ' + currentSpace.title}>
              <img src={photos[0].url} alt={photos[0].alt} />
              <span className="photo-label">{currentSpace.title} <ArrowUpRight size={18} /></span>
            </button>
            <div className="gallery-side">
              {photos.slice(1, 3).map((photo, i) =>
                <button type="button" className="gallery-secondary" key={photo.url + i} onClick={() => { setActivePhoto(i + 1); setModalOpen(true); }} aria-label={'Ampliar imagem ' + (i + 2)}>
                  <img src={photo.url} alt={photo.alt} loading="lazy" />
                  <span className="image-number">0{i + 2} / 03</span>
                </button>
              )}
            </div>
          </div>
          <div className="gallery-bottom">
            <span>{currentSpace.kicker} / {currentSpace.title}</span>
            <span>{illustrative ? 'IMAGENS DE BANCO — NÃO RETRATAM O SHOWROOM REAL' : 'FOTOGRAFIAS DO SHOWROOM'}</span>
            <button type="button" onClick={() => { setActivePhoto(0); setModalOpen(true); }}>Ver galeria completa <ArrowUpRight size={17} /></button>
          </div>
        </section>

        <section id="sobre" className="feature-section">
          <div className="feature-photo">
            <img src={spaces[1].photos[0].url} alt={spaces[1].photos[0].alt} loading="lazy" />
          </div>
          <div className="feature-content">
            <p className="eyebrow">02 / SHOWROOM</p>
            <h2>A moda ganha<br /><em>espaço.</em></h2>
            <p>Conheça de perto nossas coleções e o universo de cada marca.</p>
            <a href="#contato" className="text-arrow">Agende sua visita <ArrowUpRight size={19} /></a>
            {!realPhotos.low.length && <span className="feature-disclaimer">IMAGEM ILUSTRATIVA</span>}
          </div>
        </section>

        <section id="marcas" className="brands-section">
          <div className="section-shell brands-inner">
            <div className="section-head brands-head">
              <p className="eyebrow">03 / CURADORIA</p>
              <div className="section-heading-row">
                <h2>Nossas marcas<span className="period">.</span></h2>
                <p>Uma seleção de marcas com diferentes estilos e identidades.</p>
              </div>
            </div>
          </div>
          <InfiniteSlider gap={18} duration={40} durationOnHover={130} className="brand-marquee">
            {brands.map((brand) => <BrandCard key={brand.name} brand={brand} />)}
          </InfiniteSlider>
          <div className="section-shell brands-bottom">
            <span>PORTFÓLIO SUJEITO À DISPONIBILIDADE COMERCIAL</span>
            <a href="#contato">Quero conhecer as marcas <ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="invite-section">
          <p className="eyebrow white">LOW PROFILE + DREAMS</p>
          <h2>Seu próximo encontro<br />com a moda começa aqui.</h2>
          <a href="#contato">Seja um parceiro <ArrowUpRight size={20} /></a>
        </section>

        <section id="contato" className="section-shell contact-section">
          <div className="contact-info">
            <p className="eyebrow">04 / NOVOS PARCEIROS</p>
            <h2>Vamos conversar<span className="period">.</span></h2>
            <p>Preencha seus dados. Nossa equipe entrará em contato com sua loja.</p>
            <div className="contact-location"><MapPin size={19} strokeWidth={1.5} /><span>Vila Velha, Espírito Santo</span></div>
          </div>
          <form className="lead-form" name="lojistas" onSubmit={handleSubmit}>
            <div className="form-head"><span>CADASTRO DE LOJISTA</span><span>01 / 01</span></div>
            <label> Cidade / UF <span>*</span>
              <input name="cidade" required maxLength={90} autoComplete="address-level2" placeholder="Ex.: Vitória / ES" />
            </label>
            <label> Nome da loja <span>*</span>
              <input name="loja" required maxLength={120} autoComplete="organization" placeholder="Nome da sua loja" />
            </label>
            <label> Marcas já trabalhadas <span>*</span>
              <textarea name="marcas" required maxLength={500} rows={2} placeholder="Quais marcas sua loja trabalha?" />
            </label>
            <div className="two-fields">
              <label> CNPJ <span>*</span>
                <input name="cnpj" inputMode="numeric" autoComplete="off" required value={cnpj} onChange={(e) => setCnpj(formatCnpj(e.target.value))} placeholder="00.000.000/0000-00" />
              </label>
              <label> WhatsApp <span>*</span>
                <input name="contato" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(27) 99999-9999" />
              </label>
            </div>
            <input type="hidden" name="interesse" value="Visita ao showroom" />
            <label className="form-consent">
              <input type="checkbox" name="consentimento" value="sim" required />
              <span>Autorizo o contato comercial da Low Profile + Dreams usando os dados informados. <a href="#privacidade">Privacidade</a>.</span>
            </label>
            <button type="submit" disabled={status === 'sending' || status === 'success'} className="form-submit">
              {status === 'success' ? 'Cadastro enviado' : status === 'sending' ? 'Enviando...' : 'Quero conhecer o showroom'}
              {status === 'success' ? <Check size={18} /> : <ArrowUpRight size={18} />}
            </button>
            {formNotice && <p role="status" aria-live="polite" className={'form-notice ' + (status === 'error' ? 'notice-error' : '')}>{formNotice}</p>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell">
          <div className="footer-upper">
            <div><img src="/logo-lp.png" alt="Low Profile + Dreams" /><p>Representação de moda. Espírito Santo.</p></div>
            <div className="footer-links"><a href="#espacos">Espaços <ArrowUpRight size={14} /></a><a href="#marcas">Marcas <ArrowUpRight size={14} /></a><a href="#contato">Contato <ArrowUpRight size={14} /></a></div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} LOW PROFILE + DREAMS</span>
            <span>VILA VELHA / ES</span>
            <a href="https://www.instagram.com/" aria-label="Instagram (destino provisório)" title="Instagram oficial a confirmar"><Instagram size={18} /></a>
          </div>
          <details id="privacidade" className="privacy-info">
            <summary>Privacidade e dados</summary>
            <p>As informações deste cadastro são destinadas exclusivamente ao contato comercial com lojistas. A política definitiva, o canal do titular e os prazos de retenção devem ser definidos pela empresa.</p>
          </details>
        </div>
      </footer>
      <a className="mobile-sticky" href="#contato">Seja um parceiro <ArrowUpRight size={18} /></a>

      {modalOpen && <div className="lightbox" role="dialog" aria-modal="true" aria-label={'Galeria ' + currentSpace.title}>
        <button type="button" className="lightbox-close" onClick={() => setModalOpen(false)} aria-label="Fechar galeria"><X size={25} /></button>
        <button type="button" className="lightbox-prev" onClick={() => movePhoto(-1)} aria-label="Imagem anterior"><ArrowLeft size={23} /></button>
        <figure><img src={currentImage.url} alt={currentImage.alt} /><figcaption>{currentSpace.title} / {String(activePhoto + 1).padStart(2, '0')} de {String(photos.length).padStart(2, '0')}{illustrative && ' · Imagem ilustrativa'}</figcaption></figure>
        <button type="button" className="lightbox-next" onClick={() => movePhoto(1)} aria-label="Próxima imagem"><ArrowRight size={23} /></button>
      </div>}
    </>
  );
}
export default App;
