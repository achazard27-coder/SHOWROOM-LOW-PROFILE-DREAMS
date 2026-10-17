import { allPhotos } from './gallery';
import { brands } from './brands';
import { publicProductPhotos } from './public-products';

export type BrandGalleryPhoto = { url: string; alt: string; label: string; title?: string; sourceUrl?: string; sourceName?: string; kind?: 'showroom' | 'product' };
export type BrandGallery = { slug: string; name: string; logo: string; caption?: string; photos: BrandGalleryPhoto[] };
const original = (index: number, brand: string, label: string): BrandGalleryPhoto => ({
  url: allPhotos[index].url, alt: `${label} — ${brand}, showroom Low Profile + Dreams`, label,
});
const local = (name: string, alt: string, label: string): BrandGalleryPhoto => ({url: `/showroom/${name}.webp`, alt, label});
const animal = [original(5, 'Animale', 'Coleções Animale'), original(6, 'Animale', 'Araras e acessórios'), original(7, 'Animale', 'Vestidos em exposição')];
const nv = [original(3, 'NV', 'Espaço NV'), original(4, 'NV', 'Coleções e área de estar')];
const farm = [
  original(9, 'FARM', 'Coleções em destaque'), original(10, 'FARM', 'Moda praia e acessórios'), original(11, 'FARM', 'Universo FARM'), original(8, 'FARM', 'Detalhes do espaço'),
  local('c023ab83-9cfa-496d-becd-50c8c1436a26', 'Exposição FARM no showroom Low Profile + Dreams', 'Peças e composições'),
  local('d1ed0677-b90f-494a-9b30-237c67df893a', 'Coleções FARM no showroom Low Profile + Dreams', 'Um olhar sobre as coleções'),
];
const fabula = [original(2, 'Fábula & Bento', 'Coleções infantis')];
const osklen = [original(0, 'Osklen', 'Espaço Osklen'), original(1, 'Osklen', 'Peças e acessórios Osklen')];
// Only photos with visible brand signage or confirmed continuity of the same
// photographed room are assigned. Unidentified images remain in the home gallery.
const assignments: Record<string, BrandGalleryPhoto[]> = {
  ANIMALE: animal, 'NATI VOZZA': nv, FARM: farm, 'FÁBULA & BENTO': fabula, OSKLEN: osklen,
};
const slugs: Record<string, string> = {
  ANIMALE:'animale', 'NATI VOZZA':'nati-vozza', FARM:'farm', 'FÁBULA & BENTO':'fabula-bento',
  FOXTON:'foxton', ETC:'etc', MELISSA:'melissa', OSKLEN:'osklen', 'TOMMY HILFIGER':'tommy-hilfiger',
  'CARLOTA COSTA':'carlota-costa', 'PANŌ':'pano', INSIDER:'insider',
};
export const brandGalleries: BrandGallery[] = brands.map(brand => ({...brand, slug:slugs[brand.name], photos:[...(assignments[brand.name] || []), ...(publicProductPhotos[slugs[brand.name]] || [])]}));
export const homeGalleryPhotos: BrandGalleryPhoto[] = [
  ...allPhotos,
  local('7be2e38f-7462-46bf-9f94-4cf87a46282b', 'Araras de peças no showroom Low Profile + Dreams', 'Curadoria de perto'),
  local('94180584-b2b6-49bc-9537-78c49ee0b647', 'Coleções no showroom Low Profile + Dreams', 'Novas possibilidades'),
  local('b6b82827-a931-48fd-a474-d031326301b7', 'Composições e manequins no showroom Low Profile + Dreams', 'Texturas e detalhes'),
  local('c023ab83-9cfa-496d-becd-50c8c1436a26', 'Exposição com bicicleta e coleções no showroom', 'Moda em cada canto'),
  local('d1ed0677-b90f-494a-9b30-237c67df893a', 'Coleções e decoração do showroom Low Profile + Dreams', 'Seu próximo encontro'),
];
