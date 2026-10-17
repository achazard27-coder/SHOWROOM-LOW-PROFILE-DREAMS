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
  gd('1HJpk7uYqlKFePZS9FIXBSgTuZQo7GQp5', 'Araras Animale', 'Araras e peças'),
  gd('1LrCzOKkkCbHphWLH6tQrJ88fup3s1GO0', 'Ambiente Animale', 'Ambiente da marca'),
  gd('1bxehZKm_o6kTxCGJsPr_HupKyKSlCB4y', 'Composições Animale', 'Composições da coleção'),
  gd('1TXa2CPfXRwJxRXNi1ldgyyE9hGZqeVKL', 'Peças Animale', 'Peças exclusivas'),
  gd('1AcYa2GhEWBGyjjnKIG0dcS5B2HnLYWMc', 'Animale no showroom', 'Nova temporada'),
  gd('1Vb5vLpe9UTn0bz3I5Rg_C-dhnn4E1lBW', 'Detalhes Animale', 'Detalhes da coleção'),
  gd('1Er1DFOHAKgUd0JKX7mHEUk2aaQOJ0zqB', 'Look Animale', 'Look completo'),
  gd('1PhzU3FSzCg9AmVntHj0aQBtJvthW-NHi', 'Essenciais Animale', 'Essenciais da marca'),
  gd('1vo3ER9DIHlCAS0ZJzNl-4WVG86nIi6ZD', 'Universo Animale', 'Universo Animale'),
  gd('1-Dz49601xY7I_8lniQmtoIJ-lIDLMuTb', 'Coleção atual Animale', 'Coleção atual'),
  gd('1jKxkMyU3sENbkgZFLpMD8IVx23Xt8SZF', 'Acessórios Animale', 'Acessórios'),
  gd('1wvAzuhwtR34kpC1ksGEIETQHujONNobc', 'Destaques Animale', 'Destaques da coleção'),
  gd('1ODFKKgXz4eEYSCnGLPCZUwLKPNfY2ETL', 'Peças principais Animale', 'Peças principais'),
  gd('1xg_bSRoC4jbgItRFBVaO7Q5s6iZfjYn7', 'Toda a coleção Animale', 'Toda a coleção'),
];

const nv: BrandGalleryPhoto[] = [
  gd('1-Ma-tRDl0deOaHhVmGgzLA9_c2Bj__kb', 'Espaço Nati Vozza', 'Espaço Nati Vozza'),
  gd('1qVrFdnK3VUgFrtuP8KRT-bSGgh5wZIAW', 'Coleção Nati Vozza', 'Coleção feminina'),
  gd('1sTu3R4XKQHSZjqLCCMnaIKyjGDqOGviL', 'Peças Nati Vozza', 'Peças NV'),
  gd('1CJpN3uKoKirvdezaee6x8wlG2Mn_OIv_', 'Composições elegantes NV', 'Composições elegantes'),
  gd('13W1s6r3Ba73M86mFpj2fGGXU8EwWzL5u', 'Ambiente NV', 'Ambiente da marca'),
  gd('1TqbMLfsNWhCbfIIGJ_mNeoVYABdrDnvX', 'Nova coleção NV', 'Nova coleção'),
  gd('1MXaBZE06V2QV_1LzB5cQ65FqSkE4wlN6', 'Destaque Nati Vozza', 'Destaque Nati Vozza'),
  gd('1D7qlO0Uozo3uQJXiHm7ML1mMFKkJ07bz', 'Looks exclusivos NV', 'Looks exclusivos'),
  gd('1zc-TDP3bA5E1z_iT70zTv9i2nmCr3zri', 'Curadoria Nati Vozza', 'Curadoria NV'),
  gd('1hGotI31pgNGmx8hc6NhuKz9WBYfjbCFu', 'Peças de destaque NV', 'Peças de destaque'),
  gd('1Zlo8CF6oNKh0zzOdTVXVZCeVZ26-g90k', 'Acessórios Nati Vozza', 'Acessórios NV'),
  gd('1GGcbvNxGEvYe0fFGxpoInJWaoWsgxrVI', 'Detalhes da coleção NV', 'Detalhes da coleção'),
  gd('1rpswqAY2Xl1W5lOMETDI8lEu0o_nO5xY', 'Nati Vozza no showroom', 'Nati Vozza completa'),
];

const farm: BrandGalleryPhoto[] = [
  gd('1mLyKJKiKtkV6nwFIvAlSOxQN45j8Xm3B', 'Universo FARM', 'Universo FARM'),
  gd('18oJx6SDPtZwiBo6VlJGXO0jJhd1zaPqY', 'Coleção FARM', 'Coleção em destaque'),
  gd('1tFF-INomB55XlIVEMETIeeJ_8ukp0Csm', 'Peças coloridas FARM', 'Peças coloridas'),
  gd('15knP-Rjt31yJ5JlR-eQoKGcMksgQm2FS', 'Detalhes FARM', 'Detalhes FARM'),
  gd('1QRhO1KOS0SzZJIqkhyUgkr1sR_Ny8OhB', 'Atmosfera FARM', 'Atmosfera da marca'),
  gd('1lO_oMalxAee38KhGbUIjdKRU0fWt7brn', 'Nova temporada FARM', 'Nova temporada'),
  gd('1BiS8tU6wLqH3yRvpuHNvma9AzHbtcVJA', 'Peças em destaque FARM', 'Peças em destaque'),
  gd('1w05RLyO_6Nof_AVs6e5OiWATyJ5sRztX', 'Look FARM', 'Look FARM'),
  gd('1lTrgnyWlp4RDqAOj-tb003--MXN9ez3c', 'Tudo FARM', 'Tudo FARM'),
  gd('1q61ENCkRH1597dEhXWYMxvvFIOExzKRl', 'FARM no showroom', 'A coleção completa'),
  // Moda praia (pasta Praia do Drive)
  gd('1bswSxuTHCRzy2J6l0VCU6IudD4qXa1ge', 'Moda praia FARM', 'Moda praia FARM'),
  gd('1Ctm9NxelMxKM4NmqTjv_8ucoQkUADqOQ', 'Verão FARM', 'Verão FARM'),
  gd('1ZIQ79xyXMBSGhCfXKGOlpb4YUKlxKxZu', 'Praia e sol FARM', 'Praia e sol'),
  gd('1BjAwuAjzATRW6Iq6FhK5mpb9tjOO-b7N', 'Essenciais de verão FARM', 'Essenciais de verão'),
  gd('19Mi1xe9reC0qHUFWx7ivnpclnHF_ShmL', 'Coleção praia FARM', 'Coleção praia'),
  gd('1-BTkrrRTY-lgytgAhJH8lYvob2P-B-fI', 'Beach collection FARM', 'Beach collection'),
];

const fabula: BrandGalleryPhoto[] = [
  gd('1sCbESvDU9ac6TxwdfszCKVI2EhK_Wic8', 'Coleção Fábula & Bento', 'Coleção infantil'),
  gd('1CGMDtj-3W9CtFwNt2uUp-Nvabdbha37t', 'Peças Fábula', 'Peças Fábula'),
  gd('1BCNScK_9fRXbMvSONKVmQEdGGG29SpeR', 'Ambiente Fábula & Bento', 'Ambiente da marca'),
  gd('1jGXaWDcL8vjynu4SStaRoI6eh4uSs5-G', 'Detalhe infantil Fábula', 'Detalhe infantil'),
  gd('1HGf88szWs_trpEfjC2f9mphCYzz_YiSi', 'Universo Fábula', 'Universo Fábula'),
  gd('1C3dH-gFlwwngm2VagZLNxvJH98wSkEG7', 'Roupas infantis Fábula', 'Roupas infantis'),
  gd('1Kk5p-XosG2MLuaQbETHNL3JvXSx7uRXb', 'Fábula em detalhes', 'Fábula em detalhes'),
  gd('1k5vY1l-h6yswgz4EU7MABkTKpPq6Bt2w', 'Nova coleção Fábula', 'Nova coleção'),
  gd('16t5yP2xR2C2SU9bVIukTnauF-peBeUKN', 'Peças especiais Fábula', 'Peças especiais'),
  gd('1Yz8B0dQDrK7d_szc4D85Pogs8MCHyzCP', 'Composições infantis Fábula', 'Composições infantis'),
  gd('17gTzzfzsgR1ioXkwR7rMwwLFs25CfTLM', 'Nova Fábula', 'Nova Fábula'),
  gd('1BcpboJvDWdumv_GW0CXF1N1WMqd8sqir', 'Criatividade infantil Fábula', 'Criatividade infantil'),
  gd('1fZjT-r9odEqxAugE0mPyf4zOJzxkNmB-', 'Fábula & Bento completa', 'Fábula & Bento completa'),
];

const etc: BrandGalleryPhoto[] = [
  gd('1JUdHkIXFY5Qho-XRzSlAuwPO05cKG7pu', 'Espaço ETC', 'Espaço ETC'),
  gd('14gcpoIjS9Mu8HMG-s3skfkLGH0gDTkzz', 'Coleção ETC', 'Coleção ETC'),
  gd('1LxTP16Y8BOOHbxawTmhxojYba_HXtkHs', 'Peças ETC', 'Peças ETC'),
  gd('1hhJ8zq_GC2RvC7ODmwZsuOSOYzLudx5T', 'Ambiente ETC', 'Ambiente ETC'),
  gd('1OgtQS88eCovFNKvwybB1qF2wNd_NUhPF', 'Destaque ETC', 'Destaque ETC'),
  gd('1QQ4fTeQ8gheBbos65iG1pHQSNcuY492x', 'ETC no showroom', 'ETC no showroom'),
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
