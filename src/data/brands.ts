export type Brand = { name: string; domain?: string; logo?: string; small?: boolean };

// Only genuine marks are allowed in public/logos. The Google favicon endpoint
// below is a live, brand-owned web icon reference, never a recreated logo.
export const brands: Brand[] = [
  { name: 'ANIMALE', domain: 'animale.com.br' },
  { name: 'NATI VOZZA', domain: 'nativozza.com.br', small: true },
  { name: 'FARM', domain: 'farmrio.com.br' },
  { name: 'FÁBULA & BENTO', domain: 'afabula.com.br', small: true },
  { name: 'FOXTON', domain: 'foxtonbrasil.com.br' },
  { name: 'ETC', domain: 'farmrio.com.br' },
  { name: 'MELISSA', domain: 'melissa.com.br' },
  { name: 'OSKLEN', domain: 'osklen.com.br' },
  { name: 'TOMMY HILFIGER', domain: 'br.tommy.com', small: true },
  { name: 'CARLOTA COSTA', domain: 'carlotacosta.com.br', small: true },
  { name: 'PANŌ', small: false },
  { name: 'INSIDER', domain: 'insiderstore.com.br' }
];

// Use an official SVG or 512px+ PNG supplied/approved by the brand for each
// logo field. External favicons are only a provisional gallery treatment.
