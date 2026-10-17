export type SpaceId = 'dreams' | 'low' | 'casa';
export type GalleryPhoto = { url: string; alt: string; label: string };
export type Space = { id: SpaceId; title: string; kicker: string; photos: GalleryPhoto[] };
const gd = (id: string, alt: string): GalleryPhoto => ({
  url: `https://lh3.googleusercontent.com/d/${id}`, alt, label: 'Low Profile + Dreams'
});
export const allPhotos: GalleryPhoto[] = [
  // 0 Animale
  gd('1F5RKAdVBa5PFTz3INDXuCKvDPiPfsukS', 'Coleções Animale no showroom Low Profile + Dreams'),
  // 1 Animale
  gd('1AcYa2GhEWBGyjjnKIG0dcS5B2HnLYWMc', 'Ambiente Animale — showroom Low Profile + Dreams'),
  // 2 Animale
  gd('1vo3ER9DIHlCAS0ZJzNl-4WVG86nIi6ZD', 'Peças Animale em exposição'),
  // 3 Nati Vozza
  gd('1-Ma-tRDl0deOaHhVmGgzLA9_c2Bj__kb', 'Espaço Nati Vozza no showroom Low Profile + Dreams'),
  // 4 Nati Vozza
  gd('1TqbMLfsNWhCbfIIGJ_mNeoVYABdrDnvX', 'Coleção Nati Vozza em destaque'),
  // 5 FARM
  gd('1mLyKJKiKtkV6nwFIvAlSOxQN45j8Xm3B', 'Universo FARM no showroom Low Profile + Dreams'),
  // 6 FARM praia
  gd('1bswSxuTHCRzy2J6l0VCU6IudD4qXa1ge', 'Moda praia — coleção FARM'),
  // 7 Fábula
  gd('1sCbESvDU9ac6TxwdfszCKVI2EhK_Wic8', 'Coleções Fábula & Bento no showroom'),
  // 8 Fábula
  gd('1C3dH-gFlwwngm2VagZLNxvJH98wSkEG7', 'Peças infantis Fábula — detalhes'),
  // 9 ETC
  gd('1JUdHkIXFY5Qho-XRzSlAuwPO05cKG7pu', 'Espaço ETC no showroom Low Profile + Dreams'),
  // 10 praia verão
  gd('1ZIQ79xyXMBSGhCfXKGOlpb4YUKlxKxZu', 'Verão no showroom — moda praia'),
  // 11 praia verão
  gd('19Mi1xe9reC0qHUFWx7ivnpclnHF_ShmL', 'Coleção verão — Low Profile + Dreams'),
];
export const realPhotos: Record<SpaceId, GalleryPhoto[]> = {
  dreams: [0,3,5,7,9].map(i => allPhotos[i]),
  low: [1,4,6,8,10].map(i => allPhotos[i]),
  casa: [2,11,0,5].map(i => allPhotos[i]),
};
export const galleryUsesRealPhotos = true;
export const spaces: Space[] = [
  {id:'dreams',title:'Ambientes',kicker:'Nosso showroom',photos:realPhotos.dreams},
  {id:'low',title:'Coleções',kicker:'Nossa curadoria',photos:realPhotos.low},
  {id:'casa',title:'Detalhes',kicker:'Nosso universo',photos:realPhotos.casa}
];
export function imageUrl(url: string, width: number) {
  return import.meta.env.DEV ? url : '/.netlify/images?url=' + encodeURIComponent(url) + '&w=' + width + '&fm=webp&q=82';
}
export function imageSet(url: string) {
  return [480, 800, 1200, 1600].map(w => imageUrl(url, w) + ' ' + w + 'w').join(', ');
}
