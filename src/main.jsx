import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { services } from './data/services'
import { portfolioItems } from './data/portfolio'
import './styles.css'

const COPY = {
  kk: {
    nav: ['Басты', 'Қызметтер', 'Портфолио', 'Қалай жұмыс істейміз', 'Байланыс'],
    eyebrow: 'ЦИФРЛЫҚ БІЛІМ СТУДИЯСЫ',
    heroTitle: 'Сабаққа қызығушылық',
    heroAccent: 'оятып, білімге жол ашамыз.',
    heroText: 'Мұғалімдерге уақыт үнемдейтін көрнекі презентациялар, интерактивті тапсырмалар және толық сабақ жинақтары жасаймыз.',
    primary: 'Жобаға тапсырыс беру',
    secondary: 'Жұмыстарды қарау',
    servicesTitle: 'Біздің жұмыстың пішіні',
    servicesText: 'Тақырып, пән және мұғалімнің мақсатына қарай сандық оқу материалын ойлап шығарамыз.',
    details: 'Толығырақ',
    portfolioTitle: 'Портфолио',
    portfolioText: 'Төмендегі материалдар OyanLab мүмкіндігін көрсететін демонстрациялық үлгілер.',
    openDemo: 'Үлгіні ашу',
    processTitle: 'Үш қадаммен',
    process: [
      ['01', 'Тапсырма', 'Пәнді, тақырыпты, тілді және қалаған форматты айтадысыз.'],
      ['02', 'Жобалау', 'Құрылымды, стилін және мазмұн жоспарын келісеміз.'],
      ['03', 'Нәтиже', 'Мәтіндер мен форматтауды тексеріп, дайын материалды береміз.'],
    ],
    contactTitle: 'Сабаққа арналған идея бар ма?',
    contactText: 'Тапсырма туралы жазып, қажетті формат пен мерзімді келісейік.',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    orderData: 'Тапсырыс үшін',
    orderHint: 'Пән · Тақырып · Тіл · Қажетті формат',
    footer: 'Цифрлық білімнің жаңа форматы.',
    close: 'Жабу',
  },
  ru: {
    nav: ['Главная', 'Услуги', 'Портфолио', 'Как мы работаем', 'Контакты'],
    eyebrow: 'ЦИФРОВАЯ ОБРАЗОВАТЕЛЬНАЯ СТУДИЯ',
    heroTitle: 'Делаем уроки',
    heroAccent: 'интереснее и подготовку проще.',
    heroText: 'Создаём для учителей наглядные презентации, интерактивные задания и готовые комплекты учебных материалов.',
    primary: 'Заказать проект',
    secondary: 'Посмотреть работы',
    servicesTitle: 'Формат нашей работы',
    servicesText: 'Разрабатываем цифровые учебные материалы под предмет, тему и цель конкретного урока.',
    details: 'Подробнее',
    portfolioTitle: 'Портфолио',
    portfolioText: 'Примеры демонстрируют возможности OyanLab и не являются описанием выполненных заказов.',
    openDemo: 'Открыть пример',
    processTitle: 'Три шага',
    process: [
      ['01', 'Задача', 'Вы сообщаете предмет, тему, язык и нужный формат.'],
      ['02', 'Проектирование', 'Согласовываем структуру, стиль и план содержания.'],
      ['03', 'Результат', 'Проверяем текст и форматирование, затем передаём готовый материал.'],
    ],
    contactTitle: 'Есть идея для урока?',
    contactText: 'Напишите о задаче — обсудим формат и сроки.',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    orderData: 'Для заказа',
    orderHint: 'Предмет · Тема · Язык · Нужный формат',
    footer: 'Новая форма цифрового образования.',
    close: 'Закрыть',
  },
}

const sectionIds = ['home', 'services', 'portfolio', 'process', 'contact']

function BrandMark({ compact = false }) {
  return (
    <a className={compact ? 'brand compact' : 'brand'} href="#home" aria-label="OyanLab">
      <span className="brand-dot" aria-hidden="true" />
      <span>OyanLab</span>
    </a>
  )
}

function App() {
  const [lang, setLang] = useState('kk')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState(null)
  const menuButtonRef = useRef(null)
  const demoTriggerRef = useRef(null)
  const modalRef = useRef(null)
  const closeModalRef = useRef(null)
  const t = COPY[lang]
  const dataLang = lang === 'kk' ? 'kz' : 'ru'

  useEffect(() => {
    const origin = window.location.origin
    const canonicalUrl = `${origin}${window.location.pathname}`
    const title = lang === 'kk'
      ? 'OyanLab — цифрлық білім студиясы'
      : 'OyanLab — цифровая образовательная студия'
    const description = lang === 'kk'
      ? 'OyanLab — мұғалімдерге арналған презентациялар, интерактивті тапсырмалар, бейнематериалдар және сабақ жинақтары.'
      : 'OyanLab — презентации, интерактивные задания, видеоматериалы и комплекты учебных материалов для учителей.'

    document.documentElement.lang = lang
    document.title = title

    const metadata = {
      description,
      'og:title': title,
      'og:description': description,
      'og:locale': lang === 'kk' ? 'kk_KZ' : 'ru_RU',
      'og:url': canonicalUrl,
      'og:image': `${origin}/og-cover.png`,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': `${origin}/og-cover.png`,
    }

    Object.entries(metadata).forEach(([key, value]) => {
      const selector = key.startsWith('og:')
        ? `meta[property="${key}"]`
        : key.startsWith('twitter:')
          ? `meta[name="${key}"]`
          : `meta[name="${key}"]`
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        if (key.startsWith('og:')) element.setAttribute('property', key)
        else element.setAttribute('name', key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [lang])

  useEffect(() => {
    if (!menuOpen) return

    function handleMenuKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleMenuKeyDown)
    return () => document.removeEventListener('keydown', handleMenuKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!activeDemo) return

    closeModalRef.current?.focus()

    function handleModalKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveDemo(null)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return

      const focusable = [...modalRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hidden)

      if (!focusable.length) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleModalKeyDown)
    return () => document.removeEventListener('keydown', handleModalKeyDown)
  }, [activeDemo])

  function closeModal() {
    setActiveDemo(null)
  }

  useEffect(() => {
    if (activeDemo) return
    if (demoTriggerRef.current) {
      demoTriggerRef.current.focus()
      demoTriggerRef.current = null
    }
  }, [activeDemo])

  function switchLang(nextLang) {
    setLang(nextLang)
  }

  return (
    <>
      <header className="topbar">
        <BrandMark />
        <nav id="main-navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label={lang === 'kk' ? 'Негізгі навигация' : 'Основная навигация'}>
          {t.nav.map((label, index) => (
            <a
              key={sectionIds[index]}
              href={`#${sectionIds[index]}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Выбор языка">
            <button className={lang === 'kk' ? 'active' : ''} aria-pressed={lang === 'kk'} onClick={() => switchLang('kk')}>ҚАЗ</button>
            <button className={lang === 'ru' ? 'active' : ''} aria-pressed={lang === 'ru'} onClick={() => switchLang('ru')}>РУС</button>
          </div>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span />{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">{t.primary}<span>↗</span></a>
              <a className="button ghost" href="#portfolio">{t.secondary}</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="OyanLab geometric brand mark">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="awakening-mark"><i /></div>
            <div className="visual-label">DIGITAL<br />EDUCATION</div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading">
            <p className="eyebrow"><span />{lang === 'kk' ? 'Қызметтер' : 'Услуги'}</p>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesText}</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className={`service-card ${service.icon}`} key={service.id}>
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <div className={`service-icon ${service.icon}`} aria-hidden="true" />
                </div>
                <h3>{service[dataLang].title}</h3>
                <p>{service[dataLang].description}</p>
                <a href="#contact" className="text-link">{t.details}<span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio section" id="portfolio">
          <div className="section-heading portfolio-heading">
            <div>
              <p className="eyebrow"><span />{lang === 'kk' ? 'Жұмыс мысалдары' : 'Примеры работ'}</p>
              <h2>{t.portfolioTitle}</h2>
            </div>
            <p>{t.portfolioText}</p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <article className={`portfolio-card ${item.accent}`} key={item.id}>
                <div className={`portfolio-preview ${item.type}`}>
                  <span className="demo-tag">{item[dataLang].label}</span>
                  {item.type === 'presentation' && (
                    <div className="presentation-preview">
                      <strong>CIRCULATORY<br />SYSTEM</strong>
                      <div className="organ-circle" />
                    </div>
                  )}
                  {item.type === 'interactive' && (
                    <div className="quiz-preview">
                      <span>Астрономия · 1/5</span>
                      <strong>{lang === 'kk' ? 'Күн жүйесінің ең үлкен планетасы?' : 'Самая большая планета Солнечной системы?'}</strong>
                      <div><i />Юпитер / Jupiter</div>
                    </div>
                  )}
                  {item.type === 'kit' && (
                    <div className="kit-preview">
                      <div>PDF</div><div>QUIZ</div><div>VIDEO</div>
                    </div>
                  )}
                </div>
                <div className="portfolio-meta">
                  <h3>{item[dataLang].title}</h3>
                  <button type="button" onClick={(event) => {
                    demoTriggerRef.current = event.currentTarget
                    setActiveDemo(item)
                  }}>{t.openDemo}<span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="process">
          <div className="section-heading">
            <p className="eyebrow"><span />{lang === 'kk' ? 'Процесс' : 'Процесс'}</p>
            <h2>{t.processTitle}</h2>
          </div>
          <div className="process-grid">
            {t.process.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-panel">
            <div>
              <p className="eyebrow"><span />{lang === 'kk' ? 'Байланыс' : 'Контакт'}</p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
            </div>
            <div className="contact-actions">
              <a className="contact-link" href="https://www.instagram.com/oyanlab.kz" target="_blank" rel="noreferrer">
                <span>01</span><strong>{t.instagram}</strong><i>↗</i>
              </a>
              <a className="contact-link" href="https://wa.me/77009513609" target="_blank" rel="noreferrer">
                <span>02</span><strong>{t.whatsapp}</strong><i>↗</i>
              </a>
              <div className="order-summary">
                <small>{t.orderData}</small>
                <p>{t.orderHint}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <BrandMark compact />
        <p>{t.footer}</p>
        <a href="#home">↑</a>
      </footer>

      {activeDemo && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveDemo(null)}>
          <div ref={modalRef} className="demo-modal" role="dialog" aria-modal="true" aria-label={activeDemo[dataLang].title} onMouseDown={(event) => event.stopPropagation()}>
            <button ref={closeModalRef} className="modal-close" type="button" onClick={closeModal}>{t.close} ×</button>
            <p className="eyebrow"><span />{activeDemo[dataLang].label}</p>
            <h2>{activeDemo[dataLang].title}</h2>
            {activeDemo.type === 'interactive' ? (
              <MiniQuiz lang={lang} />
            ) : (
              <div className={`demo-placeholder ${activeDemo.type}`}>
                <strong>{lang === 'kk' ? 'Демонстрация дайындалуда' : 'Демонстрация в разработке'}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function MiniQuiz({ lang }) {
  const [answer, setAnswer] = useState(null)
  const options = lang === 'kk'
    ? ['Марс', 'Юпитер', 'Сатурн']
    : ['Марс', 'Юпитер', 'Сатурн']
  return (
    <div className="mini-quiz">
      <p>{lang === 'kk' ? 'Күн жүйесінің ең үлкен планетасы?' : 'Самая большая планета Солнечной системы?'}</p>
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={answer === option ? (option === 'Юпитер' ? 'correct' : 'wrong') : ''}
          onClick={() => setAnswer(option)}
        >
          {option}
        </button>
      ))}
      {answer && (
        <strong>{answer === 'Юпитер'
          ? (lang === 'kk' ? 'Дұрыс жауап!' : 'Правильный ответ!')
          : (lang === 'kk' ? 'Тағы ойлан' : 'Попробуйте ещё раз')}</strong>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
