import { brandGalleries } from './data/brand-gallery';

export const SITE_URL = 'https://showroom-low-profile-dreams.netlify.app';
export function routePath(input: string) {
  const path = input.split(/[?#]/)[0].replace(/\/+$/, '');
  return path || '/';
}
export function resolvePage(input: string) {
  const path = routePath(input);
  if (path === '/') return { kind: 'home' as const };
  if (path === '/marcas') return { kind: 'brands' as const };
  if (path === '/sobre-nos') return { kind: 'about' as const };
  if (path === '/seja-parceiro') return { kind: 'partner' as const };
  const brand = brandGalleries.find(item => path === '/marcas/' + item.slug);
  if (brand) return { kind: 'brand' as const, brand };
  return { kind: 'notfound' as const };
}
export function getPageMeta(input: string) {
  const page = resolvePage(input);
  const suffix = ' | Lowprofile & Dreams';
  const titles = {
    home: 'Lowprofile & Dreams — Representação de moda no Espírito Santo',
    brands: 'Nossas marcas' + suffix,
    about: 'Sobre nós' + suffix,
    partner: 'Seja um lojista parceiro' + suffix,
    notfound: 'Página não encontrada' + suffix,
  };
  const description = page.kind === 'brand'
    ? `Conheça ${page.brand.name} na Lowprofile & Dreams. Explore a galeria da marca e fale com nossa equipe comercial no Espírito Santo.`
    : 'Há mais de 23 anos conectando grandes marcas aos melhores lojistas do Espírito Santo. Conheça nosso portfólio e seja um lojista parceiro.';
  const path = routePath(input);
  return {
    title: page.kind === 'brand' ? page.brand.name + ' — Galeria' + suffix : titles[page.kind],
    description,
    canonical: SITE_URL + (path === '/' ? '/' : path + '/'),
    noindex: page.kind === 'notfound',
  };
}
export const staticPaths = ['/', '/marcas/', '/sobre-nos/', '/seja-parceiro/', ...brandGalleries.map(brand => `/marcas/${brand.slug}/`), '/404/'];
