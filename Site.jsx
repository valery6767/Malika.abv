'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { site, prices, filters, photos, src, hero, aboutPhoto, instagramPhotos } from '../lib/config';

const nav = [['#top', 'Главная'], ['#portfolio', 'Портфолио'], ['#about', 'Обо мне'], ['#services', 'Услуги'], ['#contacts', 'Контакты']];

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function Site() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [note, setNote] = useState('');
  const touch = useRef(0);

  const shown = photos.filter((p) => filter === 'all' || p.cat === filter);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, step]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) { setNote('Пожалуйста, укажи имя и способ связи.'); return; }
    if (site.formEndpoint) {
      try {
        const r = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) });
        if (!r.ok) throw new Error();
        setNote('Спасибо! Сообщение отправлено, я скоро отвечу.');
        setForm({ name: '', contact: '', message: '' });
      } catch { setNote('Не получилось отправить. Напиши мне в Telegram.'); }
      return;
    }
    const text = `Здравствуйте! Меня зовут ${form.name}. Связь: ${form.contact}.${form.message ? '\n' + form.message : ''}`;
    window.open(`${site.telegram}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setNote('Открываю Telegram. Нажми «Отправить» в чате.');
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <header className="header">
        <a href="#top" className="logo">{site.name}</a>
        <nav className="nav">{nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-dark head-cta">Записаться</a>
        <button className="burger" aria-label="Меню" aria-expanded={menu} onClick={() => setMenu(!menu)}><span /><span /></button>
      </header>
      <div className={`drawer ${menu ? 'open' : ''}`} onClick={() => setMenu(false)}>
        {nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Записаться</a>
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero-img">
            <Image src={src(hero.file)} alt={hero.alt} width={hero.w} height={hero.h} priority sizes="(max-width:800px) 100vw, 50vw" />
          </div>
          <div className="hero-text">
            <p className="eyebrow fade" style={{ animationDelay: '.1s' }}>{site.name}</p>
            <h1 className="fade" style={{ animationDelay: '.25s' }}>{site.heroTitle}</h1>
            <p className="lead fade" style={{ animationDelay: '.45s' }}>{site.heroText}</p>
            <div className="row fade" style={{ animationDelay: '.65s' }}>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Записаться</a>
              <a href="#portfolio" className="btn btn-line">Смотреть портфолио</a>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section">
          <Reveal><h2 className="big">Portfolio</h2></Reveal>
          <Reveal><div className="filters">{filters.map((f) => (
            <button key={f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}</div></Reveal>
          <div className="masonry">
            {shown.map((p, i) => (
              <button key={p.file} className="tile" onClick={() => setOpen(i)} aria-label={`Открыть: ${p.alt}`}>
                <Image src={src(p.file)} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:700px) 50vw, (max-width:1100px) 33vw, 28vw" loading={i < 4 ? 'eager' : 'lazy'} />
              </button>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <Reveal className="about-img"><Image src={src(aboutPhoto.file)} alt={aboutPhoto.alt} width={aboutPhoto.w} height={aboutPhoto.h} sizes="(max-width:800px) 90vw, 40vw" loading="lazy" /></Reveal>
          <Reveal className="about-text" delay={120}>
            <p className="eyebrow">{site.name}</p>
            <h2 className="big sm">{site.aboutTitle}</h2>
            <p className="lead">{site.about}</p>
          </Reveal>
        </section>

        <section id="services" className="section">
          <Reveal><h2 className="big">Услуги</h2></Reveal>
          <div className="cards">
            {prices.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className={`card ${p.featured ? 'feat' : ''}`}>
                <p className="eyebrow">{p.time}</p>
                <h3>{p.name}</h3>
                <p className="card-text">{p.text}</p>
                <p className="price">{p.price}</p>
                <a href={site.telegram} target="_blank" rel="noopener noreferrer" className={`btn ${p.featured ? 'btn-light' : 'btn-line'}`}>Записаться</a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section center">
          <Reveal><h2 className="big">Instagram</h2></Reveal>
          <div className="ig">{instagramPhotos.map((p) => (
            <a key={p.file} href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Открыть Instagram">
              <Image src={src(p.file)} alt={p.alt} width={600} height={600} sizes="(max-width:700px) 33vw, 16vw" loading="lazy" />
            </a>
          ))}</div>
          <a className="handle" href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a>
        </section>

        <section id="contacts" className="section contacts">
          <Reveal>
            <h2 className="big sm">Контакты и запись</h2>
            <p className="lead">Быстрее всего отвечаю в Telegram. Напиши, и мы подберём дату и формат съёмки.</p>
            <div className="row">
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Написать в Telegram</a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-line">Instagram</a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form onSubmit={submit} noValidate>
              <label>Имя<input value={form.name} onChange={set('name')} autoComplete="name" /></label>
              <label>Способ связи (Telegram или телефон)<input value={form.contact} onChange={set('contact')} /></label>
              <label>Сообщение<textarea rows={4} value={form.message} onChange={set('message')} /></label>
              <p className="note" role="status">{note}</p>
              <button type="submit" className="btn btn-dark">Отправить</button>
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} {site.name}</span><span>malika-abv.photo</span></footer>

      {open !== null && shown[open] && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setOpen(null)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); }}>
          <button className="lb-x" aria-label="Закрыть" onClick={() => setOpen(null)}>×</button>
          <button className="lb-n prev" aria-label="Назад" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          <Image key={shown[open].file} src={src(shown[open].file)} alt={shown[open].alt} width={shown[open].w} height={shown[open].h} sizes="100vw" priority onClick={(e) => e.stopPropagation()} />
          <button className="lb-n next" aria-label="Вперёд" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
        </div>
      )}
    </>
  );
}
