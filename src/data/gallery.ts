export type SpaceId = 'dreams' | 'low' | 'casa';

export type GalleryPhoto = {
  url: string;
  alt: string;
  label: string;
};

export type Space = {
  id: SpaceId;
  title: string;
  kicker: string;
  photos: GalleryPhoto[];
};

const stock = (id: string, width = 1400) =>
  'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=85';

export const fallbackPhotos: Record<SpaceId, GalleryPhoto[]> = {
  dreams: [
    { url: stock('photo-1441986300917-64674bd600d8'), alt: 'Imagem ilustrativa de loja de moda com araras', label: 'Visão do espaço' },
    { url: stock('photo-1497366858526-0766cadbe8fa'), alt: 'Imagem ilustrativa de arquitetura contemporânea', label: 'Arquitetura' },
    { url: stock('photo-1483985988355-763728e1935b'), alt: 'Imagem ilustrativa de curadoria de moda', label: 'Coleções' }
  ],
  low: [
    { url: stock('photo-1497366811353-6870744d04b2'), alt: 'Imagem ilustrativa de ambiente arquitetônico', label: 'Visão do espaço' },
    { url: stock('photo-1441986300917-64674bd600d8'), alt: 'Imagem ilustrativa de espaço com roupas', label: 'Ambientes' },
    { url: stock('photo-1469334031218-e382a71b716b'), alt: 'Imagem ilustrativa de editorial de moda', label: 'Detalhes' }
  ],
  casa: [
    { url: stock('photo-1497366858526-0766cadbe8fa'), alt: 'Imagem ilustrativa de showroom', label: 'Visão do espaço' },
    { url: stock('photo-1497366811353-6870744d04b2'), alt: 'Imagem ilustrativa de espaço moderno', label: 'Arquitetura' },
    { url: stock('photo-1483985988355-763728e1935b'), alt: 'Imagem ilustrativa de moda', label: 'Coleções' }
  ]
};

// IMPORTANT: The administrative Supabase dashboard URL is NOT an image URL.
// Populate the arrays below ONLY with public object URLs approved for display.
// Example:
// dreams: [{url:'https://<project>.supabase.co/storage/v1/object/public/lowprofile.dreams/Untitled%20folder/foto-01.jpg',alt:'Interior do espaço Dreams',label:'Dreams'}]
export const realPhotos: Record<SpaceId, GalleryPhoto[]> = {
  dreams: [],
  low: [],
  casa: []
};

export const galleryUsesRealPhotos = Object.values(realPhotos).some((items) => items.length > 0);

export const spaces: Space[] = [
  { id: 'dreams', title: 'Dreams', kicker: 'Espaço 01', photos: realPhotos.dreams.length ? realPhotos.dreams : fallbackPhotos.dreams },
  { id: 'low', title: 'Low Profile', kicker: 'Espaço 02', photos: realPhotos.low.length ? realPhotos.low : fallbackPhotos.low },
  { id: 'casa', title: 'Casa Black', kicker: 'Espaço 03', photos: realPhotos.casa.length ? realPhotos.casa : fallbackPhotos.casa }
];
