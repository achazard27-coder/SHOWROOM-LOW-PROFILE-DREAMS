export type Brand = { name: string; domain?: string; logo?: string; small?: boolean };

// Only genuine marks are allowed in public/logos. The Google favicon endpoint
// below is a live, brand-owned web icon reference, never a recreated logo.
export const brands: Brand[] = [
  { name: 'ANIMALE', domain: 'animale.com.br', logo: 'https://cdn.brandfetch.io/idygPGzAYW/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1781797240189' },
  { name: 'NATI VOZZA', domain: 'bynv.com.br', small: true },
  { name: 'FARM', domain: 'farmrio.com.br', logo: 'https://cdn.brandfetch.io/id2qDb4Zvp/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1772916176016' },
  { name: 'FÁBULA & BENTO', small: true },
  { name: 'FOXTON', domain: 'foxtonbrasil.com.br', logo: 'https://cdn.brandfetch.io/idD0HOtRXB/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1740142384463' },
  { name: 'ETC' },
  { name: 'MELISSA', domain: 'melissa.com.br' },
  { name: 'OSKLEN', domain: 'osklen.com.br', logo: 'https://cdn.brandfetch.io/idd-n1_oy4/w/820/h/101/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1781838522776' },
  { name: 'TOMMY HILFIGER', domain: 'tommy.com', small: true, logo: 'https://cdn.brandfetch.io/idXzJSRLEO/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668076772443' },
  { name: 'CARLOTA COSTA', domain: 'carlotacosta.com.br', small: true },
  { name: 'PANŌ', small: false },
  { name: 'INSIDER', domain: 'insiderstore.com.br', logo: 'https://cdn.brandfetch.io/idne6Ik71f/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1780630914840' }
];

// Use an official SVG or 512px+ PNG supplied/approved by the brand for each
// logo field. External favicons are only a provisional gallery treatment.
