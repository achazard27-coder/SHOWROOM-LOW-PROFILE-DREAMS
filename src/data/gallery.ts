export type SpaceId = 'dreams' | 'low' | 'casa';
export type GalleryPhoto = { url: string; alt: string; label: string };
export type Space = { id: SpaceId; title: string; kicker: string; photos: GalleryPhoto[] };
const base = 'https://zansdbambqukamkxvwos.supabase.co/storage/v1/object/public/lowprofile.dreams/Untitled%20folder/';
const photo = (name: string, alt: string): GalleryPhoto => ({url: base + encodeURIComponent(name), alt, label: 'Low Profile + Dreams'});
export const allPhotos: GalleryPhoto[] = [
  photo("df698a22-24cc-44fb-b947-0fe5ed47ced0.jpeg", "Exposição Osklen no showroom Low Profile + Dreams"),
  photo("ff544ac9-082d-43f0-aacf-422712adc17d.jpeg", "Araras e acessórios das coleções do showroom"),
  photo("WhatsApp Image 2026-10-14 at 22.14.46.jpeg", "Ambiente com peças estampadas e decoração colorida"),
  photo("WhatsApp Image 2026-10-14 at 22.14.48.jpeg", "Espaço NV com coleções e área de estar"),
  photo("WhatsApp Image 2026-10-14 at 22.14.49.jpeg", "Ambiente de moda com araras e sofá central"),
  photo("WhatsApp Image 2026-10-14 at 22.14.51 (1).jpeg", "Coleções em araras no ambiente de paredes escuras"),
  photo("WhatsApp Image 2026-10-14 at 22.14.52 (1).jpeg", "Balcão de acessórios e araras do showroom"),
  photo("WhatsApp Image 2026-10-14 at 22.14.52.jpeg", "Vitrine de vestidos e acessórios"),
  photo("WhatsApp Image 2026-10-14 at 22.14.53.jpeg", "Ambiente com divisória vazada e coleções"),
  photo("WhatsApp Image 2026-10-14 at 22.14.54.jpeg", "Exposição de peças estampadas no showroom"),
  photo("WhatsApp Image 2026-10-14 at 22.14.55.jpeg", "Moda praia e acessórios em ambiente tropical"),
  photo("WhatsApp Image 2026-10-14 at 22.14.56.jpeg", "Detalhes de decoração com pranchas e poltronas"),
 ];
// Group by visible subject; room names have not been assigned to unconfirmed photos.
export const realPhotos: Record<SpaceId, GalleryPhoto[]> = {
 dreams: [4,3,6,0,8].map(i => allPhotos[i]),
 low: [2,9,1,5,10].map(i => allPhotos[i]),
 casa: [11,7,10,8].map(i => allPhotos[i])
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
