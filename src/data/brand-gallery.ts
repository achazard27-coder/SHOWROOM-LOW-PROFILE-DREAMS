import { allPhotos } from './gallery';
import { brands } from './brands';
import { publicProductPhotos } from './public-products';

export type BrandGalleryPhoto = { url: string; alt: string; label: string; title?: string; sourceUrl?: string; sourceName?: string; kind?: 'showroom' | 'product' };
export type BrandGallery = { slug: string; name: string; logo: string; caption?: string; photos: BrandGalleryPhoto[] };

const gd = (id: string, alt: string, label: string): BrandGalleryPhoto => ({
  url: `https://lh3.googleusercontent.com/d/${id}`,
  alt: `${alt} — showroom Low Profile + Dreams`,
  label,
  kind: 'showroom',
});
const local = (name: string, alt: string, label: string): BrandGalleryPhoto => ({url: `/showroom/${name}.webp`, alt, label});

const animale: BrandGalleryPhoto[] = [
  gd('1F5RKAdVBa5PFTz3INDXuCKvDPiPfsukS', 'Coleções Animale', 'Coleções em destaque'),
  gd('1AcYa2GhEWBGyjjnKIG0dcS5B2HnLYWMc', 'Animale no showroom', 'Nova temporada'),
  gd('1vo3ER9DIHlCAS0ZJzNl-4WVG86nIi6ZD', 'Universo Animale', 'Universo Animale'),
];

const nv: BrandGalleryPhoto[] = [
  gd('1-Ma-tRDl0deOaHhVmGgzLA9_c2Bj__kb', 'Espaço Nati Vozza', 'Espaço Nati Vozza'),
  gd('1TqbMLfsNWhCbfIIGJ_mNeoVYABdrDnvX', 'Nova coleção NV', 'Nova coleção'),
];

const farm: BrandGalleryPhoto[] = [
  gd('1mLyKJKiKtkV6nwFIvAlSOxQN45j8Xm3B', 'Universo FARM', 'Universo FARM'),
  gd('1bswSxuTHCRzy2J6l0VCU6IudD4qXa1ge', 'Moda praia FARM', 'Moda praia FARM'),
  gd('1ZIQ79xyXMBSGhCfXKGOlpb4YUKlxKxZu', 'Praia e sol FARM', 'Praia e sol'),
  gd('19Mi1xe9reC0qHUFWx7ivnpclnHF_ShmL', 'Coleção praia FARM', 'Coleção praia'),
];

const fabula: BrandGalleryPhoto[] = [
  gd('1sCbESvDU9ac6TxwdfszCKVI2EhK_Wic8', 'Coleção Fábula & Bento', 'Coleção infantil'),
  gd('1C3dH-gFlwwngm2VagZLNxvJH98wSkEG7', 'Roupas infantis Fábula', 'Roupas infantis'),
];

const etc: BrandGalleryPhoto[] = [
  gd('1JUdHkIXFY5Qho-XRzSlAuwPO05cKG7pu', 'Espaço ETC', 'Espaço ETC'),
];

const osklen: BrandGalleryPhoto[] = [
  {
    url: 'https://zansdbambqukamkxvwos.supabase.co/storage/v1/object/public/lowprofile.dreams/Untitled%20folder/df698a22-24cc-44fb-b947-0fe5ed47ced0.jpeg',
    alt: 'Exposição Osklen — showroom Low Profile + Dreams', label: 'Espaço Osklen', kind: 'showroom',
  },
  {
    url: 'https://zansdbambqukamkxvwos.supabase.co/storage/v1/object/public/lowprofile.dreams/Untitled%20folder/ff544ac9-082d-43f0-aacf-422712adc17d.jpeg',
    alt: 'Araras e acessórios Osklen — showroom Low Profile + Dreams', label: 'Peças e acessórios', kind: 'showroom',
  },
];

const assignments: Record<string, BrandGalleryPhoto[]> = {
  ANIMALE: animale, 'NATI VOZZA': nv, FARM: farm, 'FÁBULA & BENTO': fabula, ETC: etc, OSKLEN: osklen,
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
