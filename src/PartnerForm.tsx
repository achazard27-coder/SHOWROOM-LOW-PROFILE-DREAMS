import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import { brandGalleries } from './data/brand-gallery';

function formatCnpj(input: string) {
  const n = input.replace(/\D/g, '').slice(0, 14);
  return n.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
}

function validCnpj(input: string) {
  const v = input.replace(/\D/g, '');
  if (v.length !== 14 || /^(\d)\1{13}$/.test(v)) return false;
  const calc = (length: number) => {
    let pos = length - 7, sum = 0;
    for (let i = length; i >= 1; i--) {
      sum += Number(v[length - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  return calc(12) === Number(v[12]) && calc(13) === Number(v[13]);
}

function formatPhone(input: string) {
  const n = input.replace(/\D/g, '').slice(0, 11);
  if (n.length <= 2) return n ? '(' + n : '';
  if (n.length <= 6) return '(' + n.slice(0, 2) + ') ' + n.slice(2);
  const split = n.length === 11 ? 7 : 6;
  return '(' + n.slice(0, 2) + ') ' + n.slice(2, split) + '-' + n.slice(split);
}


export default function PartnerForm({ brandName }: { brandName?: string }) {
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState(brandName || 'Conhecer o portfólio');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formNotice, setFormNotice] = useState('');
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!validCnpj(cnpj)) {
      setStatus('error');
      setFormNotice('Confira o CNPJ informado.');
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10 && digits.length !== 11) {
      setStatus('error');
      setFormNotice('Informe um telefone com DDD válido.');
      return;
    }
    if (!data.get('consentimento')) {
      setStatus('error');
      setFormNotice('Precisamos da autorização para entrar em contato.');
      return;
    }
    setStatus('sending');
    setFormNotice('Enviando cadastro...');
    try {
      const body = new URLSearchParams();
      body.set('form-name', 'lojistas');
      for (const [key, value] of data.entries()) body.set(key, String(value));
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (!response.ok) throw new Error('Erro de recebimento');
      setStatus('success');
      setFormNotice('Cadastro enviado. Nossa equipe entrará em contato.');
      form.reset();
      setCnpj('');
      setPhone('');
    } catch {
      setStatus('error');
      setFormNotice('Não foi possível enviar. Tente novamente ou escreva para low.dreams@hotmail.com.');
    }
  }

  return (
        <section id="contato" className="section-shell contact-section" aria-labelledby="contact-title">
          <div className="contact-info">
            <p className="eyebrow">04 / NOVOS PARCEIROS</p>
            <h2 id="contact-title">Vamos conversar<span className="period">.</span></h2>
            <p>Cadastre-se e conheça nosso portfólio de marcas, descubra novas oportunidades para sua loja e conte com uma equipe que entende de moda e do mercado capixaba.</p>
            <div className="contact-location"><MapPin size={19} strokeWidth={1.5} /><span>Vila Velha, Espírito Santo</span></div>
          </div>
          <form className="lead-form" name="lojistas" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="lojistas"/>
            <label className="honeypot" aria-hidden="true">Não preencher<input name="bot-field" tabIndex={-1} autoComplete="off"/></label>
            <div className="form-head"><span>CADASTRO DE LOJISTA</span><span>01 / 01</span></div>
            <label> Cidade / UF <span>*</span>
              <input name="cidade" required maxLength={90} autoComplete="address-level2" placeholder="Ex.: Vitória / ES" />
            </label>
            <label> Nome da loja <span>*</span>
              <input name="loja" required maxLength={120} autoComplete="organization" placeholder="Nome da sua loja" />
            </label>
            <label> Marcas já trabalhadas <span>*</span>
              <textarea name="marcas" required maxLength={500} rows={2} placeholder="Quais marcas sua loja trabalha?" />
            </label>
            <div className="two-fields">
              <label> CNPJ <span>*</span>
                <input name="cnpj" inputMode="numeric" autoComplete="off" required value={cnpj} onChange={(e) => setCnpj(formatCnpj(e.target.value))} placeholder="00.000.000/0000-00" />
              </label>
              <label> WhatsApp <span>*</span>
                <input name="contato" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(27) 99999-9999" />
              </label>
            </div>
            <label>Marca de interesse
              <select name="interesse" value={interest} onChange={e => setInterest(e.target.value)}>
                <option value="Conhecer o portfólio">Conhecer o portfólio completo</option>
                {brandGalleries.map(brand => <option key={brand.slug} value={brand.name}>{brand.name}</option>)}
              </select>
            </label>
            <label className="form-consent">
              <input type="checkbox" name="consentimento" value="sim" required />
              <span>Autorizo o contato comercial da Low Profile + Dreams usando os dados informados. <a href="#privacidade">Privacidade</a>.</span>
            </label>
            <button type="submit" disabled={status === 'sending' || status === 'success'} className="form-submit">
              {status === 'success' ? 'Cadastro enviado' : status === 'sending' ? 'Enviando...' : 'Enviar cadastro'}
              {status === 'success' ? <Check size={18} /> : <ArrowUpRight size={18} />}
            </button>
            {formNotice && <p role="status" aria-live="polite" className={'form-notice ' + (status === 'error' ? 'notice-error' : '')}>{formNotice}</p>}
          </form>
        </section>
  );
}
