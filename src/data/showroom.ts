import type { Slide } from '@/components/ui/polaroid-line-carousel';
import { imageUrl } from './gallery';
// Photos bundled until the authenticated Supabase upload is completed.
const base = '/showroom/';
export const showroomSlides: Slide[] = [
  {image:imageUrl(base + "3fbc55a3-aa45-4b99-8551-6a4eb2fde02c.webp", 900), title:"Coleções em destaque", caption:"Peças, estampas e acessórios no showroom.", alt:"Coleções em destaque — Peças, estampas e acessórios no showroom."},
  {image:imageUrl(base + "7be2e38f-7462-46bf-9f94-4cf87a46282b.webp", 900), title:"Curadoria de perto", caption:"Explore as coleções em uma visita presencial.", alt:"Curadoria de perto — Explore as coleções em uma visita presencial."},
  {image:imageUrl(base + "94180584-b2b6-49bc-9537-78c49ee0b647.webp", 900), title:"Novas possibilidades", caption:"Conheça as peças para a seleção da sua loja.", alt:"Novas possibilidades — Conheça as peças para a seleção da sua loja."},
  {image:imageUrl(base + "b1f8a6fc-040f-41dc-a9b0-9a5aea485a71.webp", 900), title:"Universo Animale", caption:"Vestidos e acessórios em exposição.", alt:"Universo Animale — Vestidos e acessórios em exposição."},
  {image:imageUrl(base + "b6b82827-a931-48fd-a474-d031326301b7.webp", 900), title:"Texturas e detalhes", caption:"Veja os acabamentos e as composições de perto.", alt:"Texturas e detalhes — Veja os acabamentos e as composições de perto."},
  {image:imageUrl(base + "c023ab83-9cfa-496d-becd-50c8c1436a26.webp", 900), title:"Moda em cada canto", caption:"Um olhar sobre os detalhes do nosso espaço.", alt:"Moda em cada canto — Um olhar sobre os detalhes do nosso espaço."},
  {image:imageUrl(base + "cc39c435-8cb4-4e0d-ad90-32613e071138.webp", 900), title:"Um espaço para descobrir", caption:"Ambientes que aproximam marcas e lojistas.", alt:"Um espaço para descobrir — Ambientes que aproximam marcas e lojistas."},
  {image:imageUrl(base + "d1ed0677-b90f-494a-9b30-237c67df893a.webp", 900), title:"Seu próximo encontro", caption:"Agende sua visita ao showroom.", alt:"Seu próximo encontro — Agende sua visita ao showroom."},
];
